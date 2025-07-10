import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { saveProjects, loadProjects } from "../utils/storage";

const initialProjects = [
  {
    id: "1",
    title: "React Native Basics",
    tasks: [
      { id: "t1", title: "Install Expo", completed: true },
      { id: "t2", title: "Create Project", completed: false },
    ],
  },
  {
    id: "2",
    title: "Grocery Shopping",
    tasks: [
      { id: "t3", title: "Buy milk", completed: true },
      { id: "t4", title: "Buy vegetables", completed: true },
    ],
  },
];

const ProjectsScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const saved = await loadProjects();
      if (saved.length) {
        setProjects(saved);
      } else {
        setProjects(initialProjects);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const getStatus = (tasks) => {
    const done = tasks.filter((t) => t.completed).length;
    const total = tasks.length;
    return {
      summary: `${done} of ${total} done`,
      status: done === total ? "Completed" : "In Progress",
    };
  };

  const renderProject = ({ item }) => {
    const { summary, status } = getStatus(item.tasks);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("ProjectDetails", {
            project: item,
            updateProject: (updatedProject) => {
              const updatedList = projects.map((p) =>
                p.id === updatedProject.id ? updatedProject : p
              );
              setProjects(updatedList);
            },
          })
        }
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text>{summary}</Text>
        <Text
          style={[
            styles.status,
            status === "Completed" ? styles.green : styles.orange,
          ]}
        >
          {status}
        </Text>
      </TouchableOpacity>
    );
  };

  const addProject = () => {
    if (!newProjectTitle.trim()) return;

    const newProject = {
      id: Date.now().toString(),
      title: newProjectTitle.trim(),
      tasks: [],
    };

    setProjects([newProject, ...projects]);
    setNewProjectTitle("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Din Yojna</Text>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Project</Text>
            <TextInput
              style={styles.input}
              placeholder="Project name"
              value={newProjectTitle}
              onChangeText={setNewProjectTitle}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (newProjectTitle.trim()) {
                    const newProject = {
                      id: Date.now().toString(),
                      title: newProjectTitle.trim(),
                      tasks: [],
                    };
                    setProjects([newProject, ...projects]);
                    setNewProjectTitle("");
                    setIsModalVisible(false);
                  }
                }}
              >
                <Text style={styles.add}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No projects yet.
          </Text>
        }
        style={{ marginTop: 16 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="pluscircle" size={56} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    marginTop: 4,
    fontWeight: "bold",
  },
  green: {
    color: "green",
  },
  orange: {
    color: "orange",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 32,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  add: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
  cancel: {
    color: "red",
    fontSize: 16,
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});

export default ProjectsScreen;
