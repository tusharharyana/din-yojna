import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const TaskItem = ({ task, onToggle, onDelete, onRename }) => {
  const renderRightActions = () => (
    <TouchableOpacity
      onPress={() => onDelete(task.id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        onLongPress={() => onRename(task.id, task.title)}
      >
        <View style={[styles.taskItem, task.completed && styles.completed]}>
          <View style={styles.taskTopRow}>
            <Text style={styles.meta}>
              Added: {new Date(task.createdAt).toLocaleString()}
            </Text>
            {task.completed && task.completedAt && (
              <Text style={styles.meta}>
                Done: {new Date(task.completedAt).toLocaleString()}
              </Text>
            )}
          </View>
          <View style={styles.taskBottomRow}>
            <Text
              style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted,
              ]}
            >
              {task.title}
            </Text>
            {task.completed && (
              <AntDesign
                name="checkcircle"
                size={20}
                color="green"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
  },
  completed: {
    backgroundColor: "#d4f8c4",
    borderLeftColor: "green",
  },
  taskTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  taskBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  meta: {
    fontSize: 12,
    color: "#666",
  },
});

export default TaskItem;
