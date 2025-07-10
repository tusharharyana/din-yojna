import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles/detailsStyles";
import TaskItem from "../components/TaskItem";
import RenameModal from "../components/RenameModal";

const ProjectDetailsScreen = ({ route }) => {
  const { project, updateProject } = route.params;
  const [tasks, setTasks] = useState(project.tasks);
  const [newTask, setNewTask] = useState("");
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [renameTarget, setRenameTarget] = useState(null);

  const updateAndSync = (updatedTasks) => {
    setTasks(updatedTasks);
    const allDone =
      updatedTasks.length > 0 && updatedTasks.every((t) => t.completed);
    const updatedProject = {
      ...project,
      tasks: updatedTasks,
      completedAt: allDone ? new Date().toISOString() : null,
    };
    updateProject(updatedProject);
  };

  const toggleTask = (taskId) => {
    const updated = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          }
        : task
    );
    updateAndSync(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
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
    <TaskItem
      task={item}
      onToggle={toggleTask}
      onDelete={deleteTask}
      onRename={openRenameModal}
    />
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
      <View style={styles.metaBox}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Created:</Text>
          <Text style={styles.metaValue}>
            {new Date(project.createdAt).toLocaleString()}
          </Text>
        </View>

        {project.completedAt && (
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Completed:</Text>
            <Text style={styles.metaValue}>
              {new Date(project.completedAt).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
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
      <RenameModal
        visible={renameModalVisible}
        value={renameValue}
        onChange={setRenameValue}
        onClose={() => setRenameModalVisible(false)}
        onSave={handleRename}
        title="Rename"
      />
    </View>
  );
};

export default ProjectDetailsScreen;
