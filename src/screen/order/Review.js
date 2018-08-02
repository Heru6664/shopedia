import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  H3,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Text,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addPaymentMethod } from "../../actions/order";
import { bank, store } from "./Constant/Review";
import styles from "./style/Review";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class Review extends Component {
  choosedMethod = item => {
    this.props.addPaymentMethod(item);
    this.props.navigation.navigate("Checkout");
  };
  render() {
    return (
      <Container style={styles.container}>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Tokopedia</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Card style={styles.cardPrice}>
                <CardItem>
                  <Left>
                    <H3>$ {this.props.order.amount}</H3>
                  </Left>
                  <Right>
                    <Button
                      onPress={() => this.props.navigation.navigate("Cart")}
                      transparent
                    >
                      <Text>Show Details</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </CardItem>
            <CardItem>
              <Text>Select payment method</Text>
            </CardItem>
            <TouchableOpacity>
              <CardItem>
                <Text>TokoCash</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Icon name="account-balance-wallet" type="MaterialIcons" />
                  <Left>
                    <Text>TokoCash</Text>
                    <Text note>$ 0</Text>
                  </Left>
                </Left>
                <Right>
                  <Icon name="chevron-right" type="Entypo" />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>

          <Card>
            <CardItem>
              <Text>Bank Transfer (Manual Verification)</Text>
            </CardItem>
            <CardItem>
              <FlatList
                data={bank}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <ListItem
                      button
                      onPress={() => this.choosedMethod(item)}
                      style={styles.text}
                    >
                      <Left>
                        <Text>{item.name}</Text>
                      </Left>
                      <Right>
                        <Icon name="chevron-right" type="Entypo" />
                      </Right>
                    </ListItem>
                  </View>
                )}
              />
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Text>Retail</Text>
            </CardItem>
            <CardItem>
              <FlatList
                data={store}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <ListItem
                      button
                      onPress={() => this.choosedMethod(item)}
                      style={styles.text}
                    >
                      <Left>
                        <Text>{item.name}</Text>
                      </Left>
                      <Right>
                        <Icon name="chevron-right" type="Entypo" />
                      </Right>
                    </ListItem>
                  </View>
                )}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  order
});

const mapDispatchToProps = dispatch => ({
  addPaymentMethod: data => dispatch(addPaymentMethod(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
