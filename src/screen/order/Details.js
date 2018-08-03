import accounting from "accounting";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modalbox";
import { connect } from "react-redux";
import { createInvoice } from "../../actions/invoice";
import Loading from "../../assets/components/Loading";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/Details";
import { clearCart } from "../../actions/cart";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      description: props.order.item.map(data => data.name),
      item: props.order
    };
  }
  componentWillMount() {}

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handlePayBtn = () => {
    this.props
      .createInvoice(this.state)
      .then(() => {
        this.props.navigation.navigate("Result");
        this.props.clearCart();
      })
      .catch(e => console.warn(e));
  };

  renderData = item => (
    <Card>
      <CardItem style={styles.address}>
        <Text note>
          Seller: <Text>{item.seller.sellerName}</Text>
        </Text>
      </CardItem>
      <CardItem style={styles.address}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.img }} />
            <Body>
              <Text>{item.name}</Text>
              <Text note> {item.total} pcs</Text>
              <Text style={styles.price}>
                {accounting.formatMoney(item.price, "IDR ", ",", ".")}
              </Text>
            </Body>
          </Left>
        </CardItem>
      </CardItem>
      <CardItem>
        <Text>Sub Total</Text>
        <Right>
          <Text>{accounting.formatMoney(item.subTotal, "IDR ", ",", ".")}</Text>
        </Right>
      </CardItem>
    </Card>
  );

  render() {
    return (
      <Container>
        <Modal
          style={styles.modal}
          swipeToClose={false}
          backdropPressToClose={false}
          swipeArea={0}
          coverScreen={true}
          position={"center"}
          isOpen={this.props.loading}
        >
          <Loading style={styles.animation} />
        </Modal>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Checkout</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Text style={styles.name}>
                {this.Capitalize(this.props.user.fullname)}
                <Text note> (Home Address)</Text>
              </Text>
            </CardItem>
            <CardItem style={styles.address}>
              <Text>
                {/* {this.props.user.address == "" ? "-" : this.props.user.address} */}
              </Text>
            </CardItem>
            <CardItem style={styles.chgAddress}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Address")}
              >
                <Text>Change Address</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <View>
            <FlatList
              data={this.props.order.item}
              renderItem={({ item }) => this.renderData(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Card style={styles.card}>
            <CardItem>
              <Text>
                Total Amount{" "}
                <Text note>({this.props.order.item.length} Product)</Text>
              </Text>
              <Right>
                <Text>
                  {accounting.formatMoney(
                    this.props.order.amount,
                    "IDR ",
                    ",",
                    "."
                  )}
                </Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Left style={styles.footerContent}>
            <Text>Total Bill</Text>
            <Text note>
              {accounting.formatMoney(
                this.props.order.amount,
                "IDR ",
                ",",
                "."
              )}
            </Text>
          </Left>
          <Right>
            <Button
              onPress={() => this.handlePayBtn()}
              style={styles.payButton}
            >
              <Text>Pay</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, order, invoice }) => ({
  user: auth.user,
  loading: invoice.loading,
  order
});

const mapDispatchToProps = dispatch => ({
  createInvoice: inv => dispatch(createInvoice(inv)),
  clearCart: item => dispatch(clearCart(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
