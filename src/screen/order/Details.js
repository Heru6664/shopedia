import React, { Component } from "react";
import styles from "./style/Details";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Card,
  CardItem,
  Text,
  Thumbnail,
  View,
  Footer
} from "native-base";
import { connect } from "react-redux";
import { TouchableOpacity, FlatList } from "react-native";

class Details extends Component {
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderData = item => (
    <Card>
      <CardItem style={styles.address}>
        <Text note>
          {" "}
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
              <Text style={styles.price}>$ {item.price}</Text>
            </Body>
          </Left>
        </CardItem>
      </CardItem>
      <CardItem style={styles.address}>
        <Text>Delivery Courier</Text>
        <Right>
          <Button style={styles.selectCourier}>
            <Text>Select Courier</Text>
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Text>Sub Total</Text>
        <Right>
          <Text>$ {item.subTotal}</Text>
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
                {this.Capitalize(this.props.user.first_name) +
                  " " +
                  this.Capitalize(this.props.user.last_name)}
                <Text note> (Home Address)</Text>
              </Text>
            </CardItem>
            <CardItem style={styles.address}>
              <Text>
                {this.props.user.address == "" ? "-" : this.props.user.address}
              </Text>
            </CardItem>
            <CardItem style={styles.chgAddress}>
              <TouchableOpacity>
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
                <Text>$ {this.props.order.amount}</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Left>
            <Text>Total Bill</Text>
            <Text note>-</Text>
          </Left>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  user: auth.user.user,
  order
});

export default connect(mapStateToProps)(Details);
