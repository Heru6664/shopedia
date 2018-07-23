import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: "8%",
    paddingHorizontal: "5%",
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "#fff"
  },
  forgotPass: {
    width: "100%",
    textAlign: "right"
  },
  item: {
    marginVertical: "2%"
  },
  button: {
    width: "100%",
    borderRadius: 5,
    borderColor: "#34495e",
    backgroundColor: "#42b549",
    justifyContent: "center",
    alignItems: "center"
  },
  animation: {
    width: 30,
    height: 30
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  orLine: {
    borderColor: "#a48bf1",
    borderWidth: 0.5,
    flex: 0.3
  },
  orText: {
    textAlign: "center",
    padding: 10
  },
  orButton: {
    width: "100%",
    justifyContent: "center",
    marginVertical: "2%"
  },
  text: {
    color: "#fff",
    width: "100%",
    textAlign: "center"
  },
  footerContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 30,
    left: 10,
    right: 10
  },
  signUp: {
    textAlign: "center",
    textDecorationLine: "underline"
  }
});

export default styles;
