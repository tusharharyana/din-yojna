import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancel: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  save: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  renameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 40,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#000",
  },
});
