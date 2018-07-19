import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, List, View, Text, ListItem } from "native-base";
import { connect } from "react-redux";

const routes = [
  { name: "Profile", route: "Profile" },
  { name: "Dashboard", route: "MainScreen" },
  { name: "Cart", route: "Cart" }
];

const routesGuest = [
  { name: "Dashboard", route: "MainScreen" },
  { name: "Login", route: "Login" }
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handlePress } = this.props;
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.isLogin ? routes : routesGuest}
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
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    color: "rgba(0,0,0, 0.5)"
  },
  footerContainer: {
    marginVertical: "2%"
  },
  logoutText: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  }
});

mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin
});

export default connect(mapStateToProps)(Sidebar);
