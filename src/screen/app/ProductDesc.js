import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
  Thumbnail,
  H2,
  Footer,
  FooterTab,
  Badge,
  View
} from "native-base";
import StarRating from "react-native-star-rating";
import { Image, TouchableOpacity } from "react-native";
import styles from "./styles/ProductDesc";
import { addWishlist } from "../../actions/wishlist";
import { addItemCart } from "../../actions/cart";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class ProductDesc extends Component {
  state = {
    like: false
  };

  render() {
    return (
      <Container style={styles.container}>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Product Detail</Title>
            </Button>
          </Left>
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.headerProduct}>
              <Body>
                <Text>{this.props.detail.name}</Text>
              </Body>
            </CardItem>
            <CardItem style={styles.containerImg} cardBody>
              <Image
                resizeMode="contain"
                source={{ uri: this.props.detail.img }}
                style={styles.imageCard}
              />
            </CardItem>
            <CardItem>
              <Text>{this.props.detail.name}</Text>
            </CardItem>
            <CardItem>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={20}
                fullStarColor="#FFD700"
                halfStarColor="#FFD700"
                rating={this.props.detail.rating}
              />
            </CardItem>
            <CardItem>
              <Text>$ {this.props.detail.price}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Text>Description:</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.detail.description}</Text>
            </CardItem>
            <CardItem>
              <Button transparent>
                <Text> Show More</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Seller</Text>
            </CardItem>
            <CardItem>
              <Thumbnail source={{ uri: this.props.detail.seller.sellerImg }} />
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.seller}>
                  {this.props.detail.seller.sellerName}
                </Text>

                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={20}
                  fullStarColor="#FFD700"
                  halfStarColor="#FFD700"
                  rating={this.props.detail.seller.sellerRating}
                />
              </View>
            </CardItem>
            <CardItem>
              <Left>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="location" type="EvilIcons" />
                  <Text style={{ fontSize: 14 }}>
                    {this.props.detail.seller.sellerPlace}
                  </Text>
                </View>
              </Left>
              <Body />
              <View style={{ flexDirection: "row", padding: 2 }}>
                <Button bordered style={{ width: 100, borderColor: "grey" }}>
                  <Text style={{ fontSize: 14, color: "black" }}>
                    Chat Seller
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: "#3eb246",
                    width: 110,
                    right: 0,
                    marginLeft: 12,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon name="plus" type="Entypo" />
                  <Text style={{ fontSize: 14, marginLeft: -20 }}>
                    Favorite
                  </Text>
                </Button>
              </View>
            </CardItem>
            <CardItem bordered>
              <TouchableOpacity>
                <Text>view seller</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <Card>
            <TouchableOpacity>
              <CardItem header bordered>
                <Left>
                  <Text>Customer Review</Text>
                </Left>
                <Body />
                <Right>
                  <Button transparent>
                    <Icon type="Entypo" name="chevron-thin-right" />
                  </Button>
                </Right>
              </CardItem>
            </TouchableOpacity>
            <CardItem header>
              <Text>{this.props.detail.feedback.costumer} </Text>
            </CardItem>
            <CardItem bordered>
              <Text>{this.props.detail.feedback.comment}</Text>
            </CardItem>
          </Card>
          <TouchableOpacity>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Text>Product Q & A</Text>
                </Left>
                <Body />
                <Right>
                  <Button transparent>
                    <Icon type="Entypo" name="chevron-thin-right" />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
        <Footer>
          <FooterTab>
            <View style={styles.leftIcon}>
              {this.props.isLogin ? (
                <Button
                  onPress={() => this.props.addWishlist(this.props.detail)}
                  transparent
                >
                  {this.props.detail.like ? (
                    <Icon style={styles.ion} type="Ionicons" name="ios-heart" />
                  ) : (
                    <Icon
                      style={styles.ion}
                      type="SimpleLineIcons"
                      name="heart"
                    />
                  )}
                </Button>
              ) : (
                <Button
                  onPress={() => this.props.navigation.navigate("Login")}
                  transparent
                >
                  {this.props.detail.like ? (
                    <Icon style={styles.ion} type="Ionicons" name="ios-heart" />
                  ) : (
                    <Icon
                      style={styles.ion}
                      type="SimpleLineIcons"
                      name="heart"
                    />
                  )}
                </Button>
              )}
            </View>
            <View style={styles.leftIcon}>
              <Button
                onPress={() => this.props.navigation.navigate("Cart")}
                badge
                vertical
                transparent
              >
                <Icon style={styles.ion} type="EvilIcons" name="cart" />
                {this.props.cartLength === 0 ? null : (
                  <Badge style={styles.badge} danger>
                    <Text>{this.props.cartLength}</Text>
                  </Badge>
                )}
              </Button>
            </View>
            <Button
              onPress={() => this.props.addToCart(this.props.detail)}
              style={styles.leftTab}
              transparent
            >
              <Text style={styles.text}>Add to cart</Text>
            </Button>
            <Button on style={styles.rightTab} transparent>
              <Text style={styles.text}>Buy Now</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ detail, cart, auth }) => ({
  isLogin: auth.isLogin,
  detail: detail.detailProduct,
  cartLength: cart.cart.length
});

const mapDispatchToProps = dispatch => ({
  addWishlist: item => dispatch(addWishlist(item)),
  addToCart: itemCart => dispatch(addItemCart(itemCart))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDesc);
