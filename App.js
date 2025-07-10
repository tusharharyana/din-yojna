import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProjectsScreen from "./screens/ProjectsScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LogoTitle from "./components/LogoTitle";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#ffffff' },
        }}>
          <Stack.Screen name="Projects" component={ProjectsScreen} />
          <Stack.Screen
            name="ProjectDetails"
            component={ProjectDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
