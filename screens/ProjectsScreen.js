import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { saveProjects, loadProjects } from "../utils/storage";
import { Swipeable } from "react-native-gesture-handler";
import styles from "../styles/projectsStyles";

const ProjectsScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      const saved = await loadProjects();
      if (Array.isArray(saved)) {
        setProjects(saved);
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
    const isCompleted = total > 0 && done === total;
    return {
      summary: `${done} of ${total} done`,
      status: isCompleted ? "Completed" : "In Progress",
    };
  };

  const renderProject = ({ item }) => {
    const { summary, status } = getStatus(item.tasks);

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
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
          <View style={styles.cardTopRow}>
            <Text style={styles.meta}>
              Created: {new Date(item.createdAt).toLocaleString()}
            </Text>
            {item.completedAt && (
              <Text style={styles.meta}>
                Completed: {new Date(item.completedAt).toLocaleString()}
              </Text>
            )}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{summary}</Text>
          <View
            style={[
              styles.badge,
              status === "Completed" ? styles.greenBg : styles.orangeBg,
            ]}
          >
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const addProject = () => {
    if (!newProjectTitle.trim()) return;

    const newProject = {
      id: Date.now().toString(),
      title: newProjectTitle.trim(),
      tasks: [],
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    setProjects([newProject, ...projects]);
    setNewProjectTitle("");
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deleteProject(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const deleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const done = project.tasks.filter((t) => t.completed).length;
    const total = project.tasks.length;
    const isCompleted = total > 0 && done === total;

    const matchesFilter =
      filterStatus === "All" ||
      (filterStatus === "Completed" && isCompleted) ||
      (filterStatus === "In Progress" && !isCompleted);

    return matchesSearch && matchesFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aCompleted = a.tasks.length && a.tasks.every((t) => t.completed);
    const bCompleted = b.tasks.length && b.tasks.every((t) => t.completed);
    return aCompleted === bCompleted
      ? Number(b.id) - Number(a.id)
      : aCompleted
      ? 1
      : -1;
  });  

  return (
    <View style={styles.container}>
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
                  addProject();
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.add}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.searchInput}
        placeholder="Search projects..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.filterRow}>
        {["All", "Completed", "In Progress"].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilterStatus(status)}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filterStatus === status && styles.filterTextActive,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sortedProjects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No projects yet.</Text>
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

export default ProjectsScreen;
