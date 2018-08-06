import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  head: {
    backgroundColor: "#42b549",
    flexDirection: "column",
    height: 100,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: "white",
    fontSize: 50
  },
  contentHead: {
    color: "white"
  },
  loading: {
    width: 50,
    height: 50
  },
  header: {
    fontWeight: "bold"
  },
  headerItem: {
    backgroundColor: "#fff6bf",
    marginLeft: 0,
    paddingLeft: 20
  },
  contentItem: {
    marginLeft: 0,
    backgroundColor: "#42b549",
    paddingRight: 15,
    paddingVertical: 15
  },
  contentText: {
    color: "white"
  },
  headerMethod: {
    backgroundColor: "#36963c",
    paddingLeft: 15
  },
  childContent: {
    marginLeft: 25
  },
  headerChild: {
    borderBottomColor: "white",
    borderBottomWidth: 1
  }
});

export default styles;
