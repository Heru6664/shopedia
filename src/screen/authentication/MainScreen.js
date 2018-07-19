import React, { Component } from "react";
import { Container, Content, Text, Header, Title } from "native-base";

class MainScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header>
          <Title>asd</Title>
        </Header>
        <Content>
          <Text> wellcomes </Text>
        </Content>
      </Container>
    );
  }
}

export default MainScreen;
