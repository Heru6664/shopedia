import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  List,
  View,
  Text,
  ListItem,
  H3,
  Icon,
  Left
} from "native-base";
import { Image } from "react-native";
import styles from "./styles/Sidebar";

// -- product by category -- //
const routes = [
  {
    type: "Ionicons",
    iconName: "ios-phone-portrait",
    name: "Electronics",
    route: "Electronics"
  },
  {
    type: "Ionicons",
    iconName: "ios-shirt",
    name: "Fashion & Lifestyle",
    route: "Fashions"
  },
  {
    type: "MaterialCommunityIcons",
    iconName: "sofa",
    name: "Home & Living",
    route: "HomeLiving"
  },
  {
    type: "Entypo",
    iconName: "tools",
    name: "Daily Needs",
    route: "DailyNeed"
  },
  {
    type: "Ionicons",
    iconName: "ios-car",
    name: "Motors & Accessories",
    route: "Accessories"
  },
  {
    type: "Ionicons",
    iconName: "ios-book",
    name: "Books, Media & Music",
    route: "Media"
  }
];
// -- end product by category -- //

// -- config menu -- //
const configGuest = [
  { name: "Setting", route: "Setting" },
  { name: "Login", route: "Login" }
];
const routesConfig = [
  { name: "Wishlist", route: "Wishlist" },
  { name: "Cart", route: "Cart" },
  { name: "Setting", route: "Setting" }
];
// -- end config menu -- //

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handlePress } = this.props;
    return (
      <Container>
        <Content style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={require("../images/logo.png")}
              style={{
                width: "100%",
                height: 113,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          </View>
          <View style={styles.categoryContainer}>
            <H3>Shop By Category</H3>
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <View>
                    <ListItem button onPress={() => handlePress(data.route)}>
                      <Left>
                        <Icon
                          style={styles.content}
                          type={data.type}
                          name={data.iconName}
                        />
                      </Left>
                      <Left style={styles.cText}>
                        <Text style={styles.text}>{data.name}</Text>
                      </Left>
                    </ListItem>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <List
              dataArray={this.props.isLogin ? routesConfig : configGuest}
              renderRow={data => {
                return (
                  <View>
                    <ListItem button onPress={() => handlePress(data.route)}>
                      <Text style={styles.content}>{data.name}</Text>
                    </ListItem>
                  </View>
                );
              }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin
});

export default connect(mapStateToProps)(Sidebar);
