import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  CardItem,
  Thumbnail,
  Text,
  H2,
  Footer,
  FooterTab,
  View
} from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { remvFromCart } from "../../actions/cart";
import styles from "./style/Cart";

class EmptyCart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.iconContainer}>
        <Icon style={styles.icon} type="EvilIcons" name="cart" />
        <Text>Your cart is empty :(</Text>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate("MainScreen")}
        >
          <Text style={styles.buttonText}>Buy something now!</Text>
        </Button>
      </View>
    );
  }
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 1
    };
  }

  handleDelete = id => {
    this.props.delete(id);
  };

  renderItem = item => (
    <Card>
      <TouchableOpacity>
        <CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.img }} />
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.category}</Text>
              </Body>
            </Left>
            <Right>
              <H2>$ {item.price}</H2>
            </Right>
          </CardItem>
        </CardItem>
      </TouchableOpacity>
      <CardItem>
        <Button transparent>
          <Icon name="minus" type="Entypo" />
        </Button>
        <Text>{item.total}</Text>
        <Button transparent>
          <Icon name="add" />
        </Button>
        <Right>
          <Button onPress={() => this.handleDelete(item.id)} transparent>
            <Text>Delete</Text>
            <Icon type="EvilIcons" name="trash" />
          </Button>
        </Right>
      </CardItem>
    </Card>
  );

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right />
        </Header>
        {this.props.cartLength === 0 ? (
          <EmptyCart navigation={this.props.navigation} />
        ) : (
          <Container>
            <Content>
              <FlatList
                data={this.props.cart.cart}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </Content>
            <Footer>
              <FooterTab>
                <View>
                  <CardItem>
                    <Text>Total Amount:</Text>
                    <Body />
                    <Right>
                      <Text style={styles.amount}>
                        {/* $ {this.calculateTotalVal()} */}
                      </Text>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Text>Total Discount:</Text>
                    <Body />
                    <Right>
                      <Text style={styles.amount}>0</Text>
                    </Right>
                  </CardItem>
                </View>
                <Right>
                  <Button danger bordered>
                    <Text>Next</Text>
                  </Button>
                </Right>
              </FooterTab>
            </Footer>
          </Container>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cart,
  cartLength: cart.cart.length
});

const mapDispatchToProps = dispatch => ({
  delete: item => dispatch(remvFromCart(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
