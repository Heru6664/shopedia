import React, { Component } from "react";
import {
  Container,
  Body,
  Content,
  Card,
  Header,
  CardItem,
  Text,
  Left,
  Button,
  Icon,
  Title,
  Right,
  H1,
  H3,
  View,
  ListItem
} from "native-base";
import { connect } from "react-redux";
import { FlatList, Image, Platform, StyleSheet, StatusBar } from "react-native";
import styles from "./style/Review";
import { bank, store } from "./Constant/Review";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[statusBar.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <View style={statusBar.appBar} />
  </View>
);

class Review extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
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
                    <Button transparent>
                      <Text>Show Details</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </CardItem>
            <CardItem>
              <Text>Select payment method</Text>
            </CardItem>
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
                    <ListItem style={styles.text}>
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
              <Text>Credit Card</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="credit-card" type="EvilIcons" />
                <Left>
                  <Text>Credit Card</Text>
                </Left>
              </Left>
              <Right>
                <Icon name="chevron-right" type="Entypo" />
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Store</Text>
            </CardItem>
            <CardItem>
              <FlatList
                data={store}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <ListItem style={styles.text}>
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

const mapStateToProps = ({ order }) => ({
  order
});

export default connect(mapStateToProps)(Review);
