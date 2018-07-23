import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: "25%"
  },
  icon: {
    fontSize: 200,
    color: "rgba(0,0,0, 0.5)"
  },
  contentProd: {
    marginHorizontal: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5
  },
  button: {
    marginTop: "5%",
    borderColor: "rgba(0,0,0, 0.5)",
    borderWidth: 2,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    color: "#000"
  },
  footerTabContainer: {
    padding: 10,
    flexDirection: "row"
  },
  footer: {
    height: 100,
    backgroundColor: "white"
  },
  vw: {
    width: 280
  },
  amount: {
    textAlign: "right"
  }
});

export default styles;
