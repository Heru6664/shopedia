import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  View,
  Text,
  ListItem,
  Icon,
  Left,
  Footer,
  Button,
  Right
} from "native-base";
import { Image, FlatList, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import styles from "./styles/Sidebar";
import { logout } from "../../actions/auth";
import {
  configGuest,
  routesConfigTop,
  routesConfigBottom,
  inbox,
  order
} from "../components/Constant/Sidebar";
import { DefaultStatusBar } from "../components/StatusBar";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedInbox: true,
      collapsedOrder: true
    };
  }
  toggleExpanded = () => {
    this.setState({ collapsedInbox: !this.state.collapsedInbox });
  };
  toggleExpandedOrder = () => {
    this.setState({ collapsedOrder: !this.state.collapsedOrder });
  };
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    const { handlePress } = this.props;
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <View style={styles.header}>
          {this.props.isLogin ? (
            <View>
              <View style={styles.headerProfile}>
                <View style={styles.profilePhoto}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Profile")}
                  >
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
              <View style={styles.headMenuC}>
                <ListItem style={styles.headMenu} button>
                  <Left>
                    <Icon
                      style={styles.content}
                      name="cash-100"
                      type="MaterialCommunityIcons"
                    />
                  </Left>
                  <Left style={styles.cText}>
                    <Text style={styles.text}>Balance</Text>
                  </Left>
                </ListItem>
              </View>
              <View style={styles.headMenuC}>
                <ListItem style={styles.headMenu} button>
                  <Left>
                    <Icon
                      style={styles.content}
                      name="account-balance-wallet"
                      type="MaterialIcons"
                    />
                  </Left>
                  <Left style={styles.cText}>
                    <Text style={styles.text}>TokoCash</Text>
                  </Left>
                </ListItem>
              </View>
            </View>
          ) : (
            <View style={styles.headerProfile}>
              <Image
                source={require("../images/tokopedia/tokopedia.png")}
                style={styles.imageHeader}
              />
            </View>
          )}
        </View>
        <Content style={styles.contentContainer}>
          <View>
            <FlatList
              data={this.props.isLogin ? routesConfigTop : configGuest}
              renderItem={({ item }) => (
                <View>
                  <ListItem
                    style={styles.inbox}
                    button
                    onPress={() => handlePress(item.route)}
                  >
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
          {this.props.isLogin ? (
            <View>
              <View>
                <ListItem
                  style={styles.inbox}
                  button
                  onPress={() => this.toggleExpanded()}
                >
                  <Left>
                    <Icon
                      style={styles.content}
                      name="ios-mail-open"
                      type="Ionicons"
                    />
                  </Left>
                  <Left style={styles.cText}>
                    <Text style={styles.text}>Inbox</Text>
                  </Left>
                  <Right>
                    {this.state.collapsedInbox ? (
                      <Icon name="ios-arrow-down" type="Ionicons" />
                    ) : (
                      <Icon name="ios-arrow-up" type="Ionicons" />
                    )}
                  </Right>
                </ListItem>
              </View>
              <Collapsible collapsed={this.state.collapsedInbox}>
                <View>
                  <FlatList
                    data={inbox}
                    renderItem={({ item }) => (
                      <View>
                        <ListItem
                          style={styles.inbox}
                          button
                          onPress={() => handlePress(item.route)}
                        >
                          <Left style={styles.cText}>
                            <Text style={styles.text}>{item.name}</Text>
                          </Left>
                        </ListItem>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Collapsible>

              <View>
                <ListItem
                  style={styles.inbox}
                  button
                  onPress={() => this.toggleExpandedOrder()}
                >
                  <Left>
                    <Icon
                      style={styles.content}
                      name="ios-basket"
                      type="Ionicons"
                    />
                  </Left>
                  <Left style={styles.cText}>
                    <Text style={styles.text}>Order</Text>
                  </Left>
                  <Right>
                    {this.state.collapsedOrder ? (
                      <Icon name="ios-arrow-down" type="Ionicons" />
                    ) : (
                      <Icon name="ios-arrow-up" type="Ionicons" />
                    )}
                  </Right>
                </ListItem>
              </View>
              <Collapsible collapsed={this.state.collapsedOrder}>
                <View>
                  <FlatList
                    data={order}
                    renderItem={({ item }) => (
                      <View>
                        <ListItem
                          style={styles.inbox}
                          button
                          onPress={() => handlePress(item.route)}
                        >
                          <Left style={styles.cText}>
                            <Text style={styles.text}>{item.name}</Text>
                          </Left>
                        </ListItem>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Collapsible>
            </View>
          ) : null}

          <View>
            <FlatList
              data={this.props.isLogin ? routesConfigBottom : null}
              renderItem={({ item }) => (
                <View>
                  <ListItem
                    style={styles.inbox}
                    button
                    onPress={() => handlePress(item.route)}
                  >
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
          {this.props.isLogin ? (
            <View>
              <ListItem button onPress={() => this.props.logout()}>
                <Left>
                  <Icon
                    style={styles.content}
                    name="logout"
                    type="SimpleLineIcons"
                  />
                </Left>
                <Left style={styles.cText}>
                  <Text style={styles.text}>Logout</Text>
                </Left>
              </ListItem>
            </View>
          ) : null}
        </Content>
        {this.props.isLogin ? (
          <Footer>
            <Left>
              <ListItem button>
                <Text style={styles.text}>Open Store</Text>
              </ListItem>
            </Left>
          </Footer>
        ) : null}
      </Container>
    );
  }
}

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
