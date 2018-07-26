import React, { Component } from "react";
import styles from "./style/Profile";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  View
} from "native-base";

export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <Content>
          <View />
        </Content>
      </Container>
    );
  }
}
