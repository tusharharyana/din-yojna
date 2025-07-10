import AsyncStorage from "@react-native-async-storage/async-storage";

const PROJECTS_KEY = "DINYOJNA_PROJECTS";

export const saveProjects = async (projects) => {
  try {
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Error saving projects:", e);
  }
};

export const loadProjects = async () => {
  try {
    const data = await AsyncStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading projects:", e);
    return [];
  }
};
