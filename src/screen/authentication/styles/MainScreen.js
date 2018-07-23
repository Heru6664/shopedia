import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  left: {
    flexDirection: "row"
  },
  buttonHeadRightContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonRightContainer: {
    flexDirection: "row",
    marginRight: -10,
    right: 0
  },
  gridICont: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  iGrid: {
    fontSize: 23,
    color: "white"
  },
  buttonHeadRight: {
    color: "white",
    fontSize: 30
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
  badge: {
    position: "absolute",
    right: 5,
    top: 0,
    width: 20,
    height: 22,
    paddingLeft: 3
  },
  swiperContainer: {
    height: 150
  },
  promoImage: {
    width: "100%",
    height: "100%"
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
  tabStyle: {
    backgroundColor: "#42b549"
  },
  textStyles: {
    color: "#fff"
  },
  activeTabStyle: {
    backgroundColor: "#42b549"
  },
  activeTextStyle: {
    color: "#fff",
    fontWeight: "normal"
  },
  iconHead: {
    color: "#000"
  },
  headMI: {
    backgroundColor: "#e67e22"
  }
});

export default styles;
