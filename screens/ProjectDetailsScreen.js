import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import styles from "../styles/detailsStyles";


const ProjectDetailsScreen = ({ route }) => {
  const { project, updateProject } = route.params;
  const [tasks, setTasks] = useState(project.tasks);
  const [newTask, setNewTask] = useState("");
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [renameTarget, setRenameTarget] = useState(null);

  const updateAndSync = (updatedTasks) => {
    setTasks(updatedTasks);
    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject(updatedProject);
  };

  const toggleTask = (taskId) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateAndSync(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
    };
    const updated = [...tasks, newTaskObj];
    updateAndSync(updated);
    setNewTask("");
  };

  const openRenameModal = (target, currentValue) => {
    setRenameTarget(target);
    setRenameValue(currentValue);
    setRenameModalVisible(true);
  };

  const handleRename = () => {
    if (!renameValue.trim()) return;

    if (renameTarget === "project") {
      const updatedProject = { ...project, title: renameValue.trim() };
      updateProject(updatedProject);
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === renameTarget ? { ...task, title: renameValue.trim() } : task
      );
      updateAndSync(updatedTasks);
    }

    setRenameModalVisible(false);
    setRenameValue("");
    setRenameTarget(null);
  };

  const renderTask = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        onLongPress={() => openRenameModal(item.id, item.title)}
      >
        <View style={[styles.taskItem, item.completed && styles.completed]}>
          <Text
            style={[
              styles.taskText,
              item.completed && styles.taskTextCompleted,
            ]}
          >
            {item.title}
          </Text>
          {item.completed && (
            <AntDesign name="checkcircle" size={20} color="green" />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  

  const isCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  const status = isCompleted ? "Completed" : "In Progress";

  const deleteTask = (taskId) => {
    const filtered = tasks.filter((t) => t.id !== taskId);
    updateAndSync(filtered);
  };

  const renderRightActions = (taskId) => (
    <TouchableOpacity
      onPress={() => deleteTask(taskId)}
      style={styles.taskDeleteButton}
    >
      <Text style={styles.taskDeleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => openRenameModal("project", project.title)}
      >
        <Text style={styles.heading}>{project.title}</Text>
      </TouchableOpacity>

      <View
        style={[
          styles.statusBadge,
          isCompleted ? styles.greenBg : styles.orangeBg,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks yet. Add one above! 💡</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
      {renameModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rename</Text>
            <TextInput
              style={styles.renameInput}
              value={renameValue}
              onChangeText={setRenameValue}
              placeholder="Enter new name"
              placeholderTextColor="#aaa"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setRenameModalVisible(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRename}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProjectDetailsScreen;
