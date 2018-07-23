import React, { Component } from "react";
import Cart from "./Cart";
import {
  Container,
  Content,
  View,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right
} from "native-base";
import StepIndicator from "react-native-step-indicator";
import { ViewPager } from "rn-viewpager";
import styles from "./style/Index";

const PAGES = ["Page 1", "Page 2", "Page 3"];

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: "#4aae4f",
  separatorUnFinishedColor: "#a4d4a5",
  stepIndicatorFinishedColor: "#4aae4f",
  stepIndicatorUnFinishedColor: "#a4d4a5",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 12,
  currentStepLabelColor: "#4aae4f"
};
export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Order</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.stepIndicator}>
            <StepIndicator
              stepCount={3}
              customStyles={firstIndicatorStyles}
              currentPosition={this.state.currentPage}
              labels={["Cart", "Review", "Confirm"]}
            />
          </View>
          <Cart />
        </Content>
      </Container>
    );
  }
}
