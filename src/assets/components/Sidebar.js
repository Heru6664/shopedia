import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  View,
  Text,
  ListItem,
  H3,
  Icon,
  Left,
  Footer,
  Button,
  Body
} from "native-base";
import {
  Image,
  FlatList,
  Dimensions,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import styles from "./styles/Sidebar";
import { logout } from "../../actions/auth";

const { width } = Dimensions.get("window");

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[statusBar.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <View style={statusBar.appBar} />
  </View>
);

const configGuest = [
  { iconName: null, iconType: null, name: "Home", route: "MainScreen" },
  { iconName: null, iconType: null, name: "Category", route: "Category" },
  { iconName: null, iconType: null, name: "Login", route: "Login" },
  { iconName: null, iconType: null, name: "Signup", route: "Signup" }
];
const routesConfigTop = [
  { iconName: "home", iconType: "Entypo", name: "Home", route: "MainScreen" },
  {
    iconName: "grid",
    iconType: "SimpleLineIcons",
    name: "Category",
    route: "Category"
  },
  {
    iconName: "star",
    iconType: "EvilIcons",
    name: "Wishlist",
    route: "Wishlist"
  }
];

const routesConfigBottom = [
  {
    iconName: "feedback",
    iconType: "MaterialIcons",
    name: "My Feedback",
    route: "Feedback"
  },
  {
    iconName: "ios-settings",
    iconType: "Ionicons",
    name: "Settings",
    route: "Settings"
  },
  {
    iconName: "ios-contact",
    iconType: "Ionicons",
    name: "Contact Us",
    route: "Contact"
  },
  { iconName: "help-circle", iconType: "Feather", name: "Help", route: "Help" }
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    const { handlePress } = this.props;
    return (
      <Container>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <View style={styles.header}>
          {this.props.isLogin ? (
            <View style={styles.headerProfile}>
              <View style={styles.profilePhoto}>
                <TouchableOpacity>
                  <Left>
                    <Image
                      source={require("../images/tokopedia/defaultProfile.png")}
                      style={styles.imageProfileC}
                    />
                  </Left>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.userName}>
                  {this.Capitalize(this.props.user.first_name) +
                    " " +
                    this.Capitalize(this.props.user.last_name)}
                </Text>
              </View>
            </View>
          ) : (
            <Image
              source={require("../images/tokopedia/tokopedia.png")}
              style={styles.imageHeader}
            />
          )}
        </View>
        <Content style={styles.contentContainer}>
          <View>
            <FlatList
              data={this.props.isLogin ? routesConfigTop : configGuest}
              renderItem={({ item }) => (
                <View>
                  <ListItem button onPress={() => handlePress(item.route)}>
                    <Left>
                      {this.props.isLogin ? (
                        <Icon
                          style={styles.content}
                          name={item.iconName}
                          type={item.iconType}
                        />
                      ) : null}
                    </Left>
                    <Left style={styles.cText}>
                      <Text style={styles.text}>{item.name}</Text>
                    </Left>
                  </ListItem>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            <FlatList
              data={this.props.isLogin ? routesConfigBottom : null}
              renderItem={({ item }) => (
                <View>
                  <ListItem button onPress={() => handlePress(item.route)}>
                    <Left>
                      {this.props.isLogin ? (
                        <Icon
                          style={styles.content}
                          name={item.iconName}
                          type={item.iconType}
                        />
                      ) : null}
                    </Left>
                    <Left style={styles.cText}>
                      <Text style={styles.text}>{item.name}</Text>
                    </Left>
                  </ListItem>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Content>
        {this.props.isLogin ? (
          <Footer style={styles.logoutButton}>
            <Button
              style={styles.footerContainer}
              onPress={() => this.props.logout()}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </Button>
          </Footer>
        ) : null}
      </Container>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const statusBar = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: "#058c06",
    height: APPBAR_HEIGHT
  }
});
mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  user: auth.user.user
});

const mapDispatchToProps = dispatch => ({
  logout: clearUser => dispatch(logout(clearUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
