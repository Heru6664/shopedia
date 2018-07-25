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
import { FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

import DashboardContent from "../../assets/components/DashboardContent";
import { menu } from "../authentication/Constant/MainScreen";
import { fetchProduct } from "../../actions/product";
import { getDetail } from "../../actions/detail";
import Loading from "../../assets/components/Loading";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

const { width } = Dimensions.get("window");

class MainScreen extends Component {
  componentDidMount() {
    this.props.fetchProduct();
  }

  pressProduct = item => {
    this.props.getDetail(item);
    this.props.navigation.navigate("ProductDesc");
  };

  handleCart = () => {
    this.props.navigation.navigate("Cart");
  };

  renderMenu = item => (
    <View style={{ backgroundColor: "#e7e7e7" }}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          marginHorizontal: 15,
          alignItems: "center"
        }}
        onPress={() => handlePress(item.route)}
      >
        <Icon name={item.iconName} type={item.type} />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
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
                <Icon
                  style={styles.iGrid}
                  name="qrcode-scan"
                  type="MaterialCommunityIcons"
                />
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

              <View
                style={{
                  width,
                  height: 150,
                  backgroundColor: "#e7e7e7",
                  paddingVertical: 15,

                  paddingHorizontal: 15
                }}
              >
                <FlatList
                  data={menu}
                  renderItem={({ item }) => this.renderMenu(item)}
                  numColumns={4}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              <View style={styles.loadingContainer}>
                {this.props.loading ? (
                  <Loading style={{ width: 45, height: 45 }} />
                ) : (
                  <Text style={{ color: "red", fontSize: 30 }}>
                    Flash Sale!
                  </Text>
                )}
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
            <View
              style={{
                flex: 1
              }}
            >
              <Image
                style={styles.feed}
                source={require("../../assets/images/tokopedia/feed.png")}
              />
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
