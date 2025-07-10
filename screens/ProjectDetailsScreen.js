import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ProjectDetailsScreen = ({ route }) => {
  const { project } = route.params; // Passed from ProjectsScreen
  const [tasks, setTasks] = useState(project.tasks);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTask(item.id)}>
      <View style={[styles.taskItem, item.completed && styles.completed]}>
        <Text style={styles.taskText}>
          {item.title} {item.completed ? "✔️" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const status = tasks.every((t) => t.completed)
    ? "✅ Project Completed"
    : "🚧 In Progress";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{project.title}</Text>
      <Text style={styles.status}>{status}</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a task..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  completed: {
    backgroundColor: "#c9f7c3",
  },
  taskText: {
    fontSize: 16,
  },
});

export default ProjectDetailsScreen;
