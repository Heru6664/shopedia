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
import {
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { remvFromCart, incTotal, decTotal } from "../../actions/cart";
import styles from "./style/Cart";
import {
  addItemPrice,
  addShoppingItem,
  addSellerNote
} from "../../actions/order";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[statusBar.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <View style={statusBar.appBar} />
  </View>
);

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
      message: ""
    };
  }

  handleDelete = id => {
    this.props.delete(id);
  };

  componentWillMount() {
    let amount = this.calculateTotalVal();
    this.props.addItemPrice(amount);
  }

  componentDidUpdate(prev) {
    if (prev.props !== this.props) {
      let amount = this.calculateTotalVal();
      this.props.addItemPrice(amount);
    }
  }

  calculateTotalVal = () => {
    let val = 0;
    this.props.cart.cart.forEach(data => {
      for (let a = 0; a < data.total; a++) {
        val += parseFloat(data.price);
      }
    });
    return val;
  };

  handleCheckout = () => {
    this.props.addSellerNote(this.state.message);
    this.props.addShoppingItem(this.props.cart.cart);
    this.props.navigation.navigate("Review");
  };

  onChangeVal = value => {
    this.setState({
      message: value
    });
  };

  renderItem = item => (
    <Card>
      <CardItem>
        <TouchableOpacity>
          <Text>Seller: {item.seller.sellerName}</Text>
        </TouchableOpacity>
        <CardItem>
          <Right>
            <Button onPress={() => this.handleDelete(item.id)} transparent>
              <Text>Delete</Text>
              <Icon type="EvilIcons" name="trash" />
            </Button>
          </Right>
        </CardItem>
      </CardItem>
      <TouchableOpacity style={styles.contentProd}>
        <CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.img }} />
              <Body>
                <Text>{item.name}</Text>
                <Text note>$ {item.price}</Text>
              </Body>
            </Left>
          </CardItem>
        </CardItem>
        <CardItem>
          <View style={styles.vInc} />
          <View style={styles.vInc}>
            <Left>
              <Button onPress={() => this.props.decTotal(item)} transparent>
                <Icon name="minus" type="EvilIcons" />
              </Button>
            </Left>
            <Body>
              <Text>{item.total}</Text>
            </Body>
            <Right>
              <Button onPress={() => this.props.incTotal(item)} transparent>
                <Icon name="plus" type="EvilIcons" />
              </Button>
            </Right>
          </View>
        </CardItem>
      </TouchableOpacity>
      <CardItem>
        <Text note>Message for seller (optional)</Text>
      </CardItem>
      <CardItem>
        <TextInput
          value={this.state.message}
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "#058c06",
            fontSize: 16
          }}
          onChangeText={val => this.onChangeVal(val)}
        />
      </CardItem>
    </Card>
  );
  render() {
    return (
      <Container>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Cart</Title>
            </Button>
          </Left>
        </Header>
        {this.props.cartLength === 0 ? (
          <EmptyCart navigation={this.props.navigation} />
        ) : (
          <Container>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <Content>
                <FlatList
                  data={this.props.cart.cart}
                  renderItem={({ item }) => this.renderItem(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
              </Content>
            </KeyboardAvoidingView>
            <Footer style={styles.footer}>
              <FooterTab style={styles.footerTabContainer}>
                <View style={styles.vw}>
                  <CardItem>
                    <Text note>Total Amount:</Text>
                  </CardItem>
                  <CardItem>
                    <Text>$ {this.props.amount}</Text>
                  </CardItem>
                </View>
                <Right>
                  <Button
                    onPress={() => this.handleCheckout()}
                    style={styles.checkoutBtn}
                  >
                    <Text>Checkout</Text>
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

const mapStateToProps = ({ cart, order }) => ({
  cart,
  amount: order.amount,
  cartLength: cart.cart.length
});

const mapDispatchToProps = dispatch => ({
  delete: item => dispatch(remvFromCart(item)),
  incTotal: totalUp => dispatch(incTotal(totalUp)),
  decTotal: totalDwn => dispatch(decTotal(totalDwn)),
  addItemPrice: price => dispatch(addItemPrice(price)),
  addSellerNote: note => dispatch(addSellerNote(note)),
  addShoppingItem: item => dispatch(addShoppingItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
