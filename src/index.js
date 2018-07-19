import React, { Component } from "react";
import { Container, Text, Content } from "native-base";
import { connect } from "react-redux";

class App extends Component {
  render() {
    if (this.props.isLogin) {
      return (
        <Container>
          <Content>
            <Text> login </Text>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            <Text> not login </Text>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin
});

export default connect(mapStateToProps)(App);
