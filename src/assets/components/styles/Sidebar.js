import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  content: {
    color: "rgba(0,0,0, 0.5)"
  },
  text: {
    color: "rgba(0,0,0, 0.5)"
  },
  cText: {
    position: "absolute",
    marginLeft: 50
  },
  footerContainer: {
    marginVertical: "2%"
  },
  logoutButton: {
    borderTopWidth: 0,
    marginRight: 0,
    backgroundColor: "white"
  },
  logoutText: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    padding: 10
  },
  categoryContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5
  }
});

export default styles;
