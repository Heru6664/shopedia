import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageHeader: {
    width: "100%",
    height: 90,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  imageProfileC: {
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 2,
    alignSelf: "stretch",
    width: 100,
    height: 100
  },
  profilePhoto: {
    marginHorizontal: 10,
    marginRight: 20
  },
  userName: {},
  header: {
    marginTop: 8,
    borderBottomColor: "rgba(0,0,0, 0.5)",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  headerProfile: {
    flexDirection: "row",
    backgroundColor: "#eff4ee",
    width: "100%",
    height: 150,
    padding: 15,
    paddingTop: 30
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
  inbox: {
    borderBottomWidth: 0,
    marginVertical: 10
  },
  footerContainer: {
    marginVertical: "2%",
    backgroundColor: "#42b549"
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
