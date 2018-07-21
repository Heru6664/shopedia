import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  View,
  Right,
  Badge
} from "native-base";
import styles from "./styles/MainScreen";
import {
  FlatList,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import DashboardContent from "../../assets/components/DashboardContent";
import { fetchProduct } from "../../actions/product";
import { getDetail } from "../../actions/detail";
import Loading from "../../assets/components/Loading";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[statusBar.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <View style={statusBar.appBar} />
  </View>
);

class MainScreen extends Component {
  componentDidMount() {
    this.props.fetchProduct();
  }

  pressProduct = item => {
    this.props.getDetail(item);
    this.props.navigation.navigate("ProductDesc");
  };

  render() {
    return (
      <Container>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header style={styles.header}>
          <Left style={styles.left}>
            <View style={styles.menuContainer}>
              <Button
                onPress={() => this.props.navigation.openDrawer()}
                transparent
              >
                <Icon name="ios-menu" type="Ionicons" />
              </Button>
            </View>
            <View style={styles.searchContainer}>
              <Button transparent>
                <Icon name="search" type="EvilIcons" />
              </Button>
            </View>
          </Left>
          <Body />
          <Right>
            <View style={{ flexDirection: "row", marginRight: -10, right: 0 }}>
              <TouchableOpacity style={styles.gridICont}>
                <Icon style={styles.iGrid} name="grid" type="SimpleLineIcons" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonHeadRightContainer}>
                <Icon
                  style={styles.buttonHeadRight}
                  type="EvilIcons"
                  name="cart"
                />
                {this.props.cartLength === 0 ? null : (
                  <Badge style={styles.badge} danger>
                    <Text>{this.props.cartLength}</Text>
                  </Badge>
                )}
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
        <Content>
          <Text style={{ color: "red", fontSize: 30 }}>Flash Sale!</Text>
          <View style={styles.loadingContainer}>
            {this.props.loading ? (
              <Loading style={{ width: 45, height: 45 }} />
            ) : null}
          </View>
          <FlatList
            data={this.props.content}
            renderItem={({ item }) => (
              <DashboardContent pressProduct={this.pressProduct} item={item} />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
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
    backgroundColor: "#0a8f09",
    height: APPBAR_HEIGHT
  }
});
const mapStateToProps = ({ auth, product, cart }) => {
  return {
    cartLength: cart.cart.length,
    auth,
    content: product.product,
    loading: product.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProduct: product => dispatch(fetchProduct(product)),
  getDetail: detail => dispatch(getDetail(detail))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
