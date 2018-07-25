import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Footer
} from "native-base";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/Checkout";

class Checkout extends Component {
  render() {
    return (
      <Container>
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
          <Card style={styles.cardChange}>
            <CardItem
              button
              onPress={() => this.props.navigation.navigate("Review")}
              style={styles.changeBtn}
            >
              <Text>Change Payment Method</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={styles.contentMethod}>
              <Left>
                <Text>{this.props.order.paymentMethod}</Text>
              </Left>
              <Right>{/* <Text>this.props.order</Text> */}</Right>
            </CardItem>
            <CardItem>
              <Card>
                <CardItem style={styles.card}>
                  <Text>
                    payments can also be made through other retail outlets with
                    different service charges
                  </Text>
                </CardItem>
              </Card>
            </CardItem>
          </Card>
        </Content>
        <Footer style={styles.footer}>
          <Button style={styles.payButton}>
            <Text>Pay</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  order
});

export default connect(mapStateToProps)(Checkout);
