import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white"
  },
  viewProfile: {
    flexDirection: "row"
  },
  profilePhoto: {
    marginRight: 20
  },
  bodyName: {
    alignItems: "flex-start"
  },
  name: {
    fontWeight: "bold",
    marginBottom: 10
  },
  btnEdit: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 0.3
  },
  btnTxt: {
    color: "grey"
  },
  foll: {
    marginVertical: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  border: {
    borderRightWidth: 0.3,
    borderRightColor: "grey"
  },
  titleData: {
    fontWeight: "bold"
  }
});

export default styles;
