import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  greenBg: {
    backgroundColor: "green",
  },
  orangeBg: {
    backgroundColor: "orange",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
