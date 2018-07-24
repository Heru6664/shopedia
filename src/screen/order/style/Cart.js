import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f0f1",
    paddingBottom: 15
  },
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
    borderTopWidth: 0.5,
    borderTopColor: "grey",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5
  },
  vInc: {
    flexDirection: "row",
    width: "50%",
    marginRight: 0
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
    height: 80,
    backgroundColor: "white"
  },
  vw: {
    width: 280
  },
  amount: {
    textAlign: "right"
  },
  checkoutBtn: {
    backgroundColor: "#f85420",
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
