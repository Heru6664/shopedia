import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "column"
  },
  buttonDisActive: {
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    width: "100%",
    height: 100,
    borderRadius: 0
  },
  buttonActive: {
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    backgroundColor: "#f7fcf6",
    width: "100%",
    borderRadius: 0,
    height: 100
  },
  containerList: {
    width: "25%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    padding: 0
  },
  renderList: {
    backgroundColor: "#f7fcf6",
    width: "75%",
    height: "100%",
    marginLeft: "25%",
    position: "absolute",
    padding: 10
  },
  itemContainer: {
    flexDirection: "column"
  },
  th: {
    width: "50%"
  },
  img: {
    width: 100,
    height: 100
  }
});

export default styles;
