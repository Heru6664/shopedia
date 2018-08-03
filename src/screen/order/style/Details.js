import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold"
  },
  address: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey"
  },
  chgAddress: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  price: {
    color: "#058c06"
  },
  selectCourier: {
    backgroundColor: "#3eb346"
  },
  card: {
    marginBottom: 20,
    marginTop: 20
  },
  footerContent: {
    paddingHorizontal: 12
  },
  payButton: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f85420",
    borderRadius: 0,
    marginRight: 15
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 60,
    height: 60
  },
  animation: {
    width: 50,
    height: 50
  }
});

export default styles;
