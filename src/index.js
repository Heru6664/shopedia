import React, { Component } from "react";
import { Container, Text, Content, Button } from "native-base";
import { connect } from "react-redux";
import Member from "./route/Member";
import Guest from "./route/Guest";

class App extends Component {
  render() {
    if (this.props.isLogin) {
      return <Member />;
    } else {
      return <Guest />;
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin
});

export default connect(mapStateToProps)(App);
