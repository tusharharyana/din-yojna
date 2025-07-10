import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const ProjectDetailsScreen = ({ route }) => {
  const { project, updateProject } = route.params;
  const [tasks, setTasks] = useState(project.tasks);
  const [newTask, setNewTask] = useState("");

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

  const renderTask = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
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
      <Text style={styles.heading}>{project.title}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  greenBg: {
    backgroundColor: "green",
  },
  orangeBg: {
    backgroundColor: "orange",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
  },
  completed: {
    backgroundColor: "#d4f8c4",
    borderLeftColor: "green",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 16,
  },
  taskDeleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  taskDeleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProjectDetailsScreen;
