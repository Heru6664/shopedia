import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Text,
  Content,
  Card,
  CardItem
} from "native-base";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { connect } from "react-redux";
import { days, months } from "./Constant/Result";

class Result extends Component {
  render() {
    const dateNow = new Date();

    const date = new Date(this.props.invoice.expiry_date);

    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let dates = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button
              onPress={() => this.props.navigation.navigate("MainScreen")}
              transparent
            >
              <Icon type="Ionicons" name="ios-arrow-back" />
              <Body>
                <Title>Tokopedia</Title>
              </Body>
            </Button>
          </Left>
        </Header>
        <Content>
          <Text>
            Please complete your payment immediately before the time runs out
          </Text>
          <Card>
            <CardItem>
              <Text>
                (Pay before {days[dates]} , {dates} {months[month]} {year},{" "}
                {hours}:{mins})
              </Text>
            </CardItem>
          </Card>
          <Text>Select payment method</Text>
          <Button onPress={() => this.props.navigation.navigate("Bill")}>
            <Text>Open Invoice</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ invoice }) => ({
  invoice: invoice.invoice
});

export default connect(mapStateToProps)(Result);
