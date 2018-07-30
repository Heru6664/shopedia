import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white"
  },
  content: {
    padding: 15,
    backgroundColor: "#e7e7e7"
  },
  cardImage: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%"
  },
  profileImage: {
    width: "65%",
    height: 200
  },
  headCard: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.5
  },
  textHead: {
    fontWeight: "bold"
  },
  head: {
    marginBottom: -11
  },
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.2)"
  },
  inputBirthdate: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    width: "100%",
    fontSize: 16,
    padding: 5
  },
  color: {
    color: "#058c06"
  },
  btnSave: {
    backgroundColor: "#3eb346",
    width: "100%",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 25
  }
});

export default styles;
