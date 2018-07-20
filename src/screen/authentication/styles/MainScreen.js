import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  left: {
    flexDirection: "row"
  },
  buttonHeadRight: {
    color: "white"
  },
  menuContainer: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "white",
    width: "100%",
    width: 50
  },
  searchContainer: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "white",
    width: "100%",
    width: 230
  },
  loadingContainer: {
    alignItems: "center"
  },
  footerContent: {},
  header: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#42b549",
    borderBottomWidth: 0
  },
  iconHead: {
    color: "#000"
  },
  headMI: {
    backgroundColor: "#e67e22"
  }
});

export default styles;
