import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Content,
  Input,
  Item,
  Label,
  Text,
  View
} from "native-base";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import ModalDropdown from "react-native-modal-dropdown";
import { months, years } from "./Constant/Result";
import Xendit from "xendit-js-node";

const API_KEY =
  "xnd_public_development_PouFK+ol0+SmwMNpLeAYEzTFYdGq8oQuwiDh/Rpg/GTX8LGhCgRw";

export default class CCInstruction extends Component {
  constructor() {
    super();
    this.state = {
      cardNumber: "",
      month: "",
      year: "",
      should_use_meta: false
    };
  }

  paymentForm() {
    Xendit.setPublishableKey(API_KEY);

    let tokenData = this.getTokenData();
    let fraudData = this.getFraudData();

    // if(this.state.should_use_meta){
    //   Xendit.card.createToken(tokenData, fraudData)
    // }
  }
  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Pay with {this.props.method}</Title>
            </Button>
          </Left>
        </Header>
        <Content style={{ padding: 10 }}>
          <View
            style={{
              justifyContent: "center",
              borderColor: "rgba(0,0,0,0.5",
              borderWidth: 0.5,
              borderRadius: 5
            }}
          >
            <Item floatingLabel>
              <Label>
                <Text>Card Number</Text>
              </Label>
              <Input />
            </Item>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "45%",
                borderColor: "rgba(0,0,0,0.5",
                borderWidth: 0.5,
                borderRadius: 5,
                height: 25,
                justifyContent: "center",
                marginHorizontal: 3
              }}
            >
              <ModalDropdown
                textStyle={{ fontSize: 18 }}
                defaultValue="Month"
                dropdownTextStyle={{ fontSize: 18 }}
                dropdownStyle={{
                  width: "43%",
                  height: 300,
                  borderColor: "rgba(0,0,0,0.5)",
                  borderWidth: 0.5,
                  borderRadius: 3
                }}
                onSelect={(idx, value) => this.setState({ month: value })}
                options={months}
              />
            </View>
            <View
              style={{
                width: "45%",
                borderColor: "rgba(0,0,0,0.5",
                borderRadius: 5,
                borderWidth: 1,
                justifyContent: "center",
                marginHorizontal: 3,
                height: 25
              }}
            >
              <ModalDropdown
                textStyle={{ fontSize: 18 }}
                defaultValue="Year"
                dropdownTextStyle={{ fontSize: 18 }}
                dropdownStyle={{
                  width: "43%",
                  height: 300,
                  borderColor: "rgba(0,0,0,0.5)",
                  borderWidth: 1,
                  borderRadius: 3
                }}
                onSelect={(idx, value) => this.setState({ year: value })}
                options={years}
              />
            </View>
          </View>
          <View>
            <Item>
              <Input
                maxLength={4}
                keyboardType={"numeric"}
                placeholder="CVC / CVV"
              />
              <Text note>3 or 4 digits code behind the card</Text>
            </Item>
          </View>
          <Button style={{ backgroundColor: "#1ace9b" }}>
            <Text>Pay Right Now</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
