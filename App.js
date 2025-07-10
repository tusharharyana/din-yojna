import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProjectsScreen from "./screens/ProjectsScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Projects">
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
