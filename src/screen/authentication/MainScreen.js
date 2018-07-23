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
  Badge,
  Tabs,
  Tab
} from "native-base";
import styles from "./styles/MainScreen";
import {
  FlatList,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import Swiper from "react-native-swiper";

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

  handleCart = () => {
    console.log("asd: ", this.props);
    this.props.navigation.navigate("Cart");
  };

  render() {
    return (
      <Container>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header hasTabs style={styles.header}>
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
            <View style={styles.buttonRightContainer}>
              <TouchableOpacity style={styles.gridICont}>
                <Icon style={styles.iGrid} name="grid" type="SimpleLineIcons" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleCart()}
                style={styles.buttonHeadRightContainer}
              >
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
        <Tabs
          tabBarUnderlineStyle={{
            borderBottomWidth: 5,
            borderBottomColor: "white"
          }}
          activeTextStyle={{ color: "white" }}
        >
          <Tab
            heading="HOME"
            tabStyle={styles.tabStyle}
            textStyle={styles.textStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={{ color: "#fff" }}
          >
            <Content>
              <View style={styles.swiperContainer}>
                <Swiper autoplay>
                  <View>
                    <Image
                      style={styles.promoImage}
                      source={require("../../assets/images/tokopedia/promo1.jpg")}
                    />
                  </View>
                  <View>
                    <Image
                      style={styles.promoImage}
                      source={require("../../assets/images/tokopedia/promo2.jpg")}
                    />
                  </View>
                  <View>
                    <Image
                      style={styles.promoImage}
                      source={require("../../assets/images/tokopedia/promo3.jpg")}
                    />
                  </View>
                  <View>
                    <Image
                      style={styles.promoImage}
                      source={require("../../assets/images/tokopedia/promo4.jpg")}
                    />
                  </View>
                  <View>
                    <Image
                      style={styles.promoImage}
                      source={require("../../assets/images/tokopedia/promo5.jpeg")}
                    />
                  </View>
                </Swiper>
              </View>
              <Text style={{ color: "red", fontSize: 30 }}>Flash Sale!</Text>
              <View style={styles.loadingContainer}>
                {this.props.loading ? (
                  <Loading style={{ width: 45, height: 45 }} />
                ) : null}
              </View>
              <FlatList
                data={this.props.content}
                renderItem={({ item }) => (
                  <DashboardContent
                    pressProduct={this.pressProduct}
                    item={item}
                  />
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
              />
            </Content>
          </Tab>
          <Tab
            heading="FEED"
            tabStyle={styles.tabStyle}
            textStyle={styles.textStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={{ color: "#fff" }}
          >
            <View>
              <Text>2</Text>
            </View>
          </Tab>
          <Tab
            heading="FAVORITES"
            tabStyle={styles.tabStyle}
            textStyle={styles.textStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={{ color: "#fff" }}
          >
            <View>
              <Text>3</Text>
            </View>
          </Tab>
          <Tab
            heading="HOT LIST"
            tabStyle={styles.tabStyle}
            textStyle={styles.textStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTextStyle}
            textStyle={{ color: "#fff" }}
          >
            <View>
              <Text>3</Text>
            </View>
          </Tab>
        </Tabs>
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
