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
import { remvFromCart, incTotal, decTotal } from "../../actions/cart";
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
  calculateTotalVal = () => {
    let val = 0;
    this.props.cart.cart.forEach(data => {
      for (let a = 0; a < data.total; a++) {
        val += parseFloat(data.price);
      }
    });
    return val;
  };
  renderItem = item => (
    <Card>
      <TouchableOpacity style={styles.contentProd}>
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
        <Button onPress={() => this.props.decTotal(item)} transparent>
          <Icon name="minus" type="Entypo" />
        </Button>
        <Text>{item.total}</Text>
        <Button onPress={() => this.props.incTotal(item)} transparent>
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
        {this.props.cartLength === 0 ? (
          <EmptyCart navigation={this.props.navigation} />
        ) : (
          <Container>
            <Content style={styles.container}>
              <FlatList
                data={this.props.cart.cart}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </Content>
            <Footer style={styles.footer}>
              <FooterTab style={styles.footerTabContainer}>
                <View style={styles.vw}>
                  <CardItem>
                    <Text>Total Amount:</Text>
                    <Body />
                    <Right>
                      <Text style={styles.amount}>
                        $ {this.calculateTotalVal()}
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
  delete: item => dispatch(remvFromCart(item)),
  incTotal: totalUp => dispatch(incTotal(totalUp)),
  decTotal: totalDwn => dispatch(decTotal(totalDwn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
