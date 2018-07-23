import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Header,
  Title,
  Icon,
  View
} from "native-base";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import _ from "lodash";

import Loading from "../../assets/components/Loading";
import { loginAuth } from "../../actions/auth";
import styles from "./styles/Login";

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 2;
stylesheet.textboxView.normal.borderBottomColor = "#42b549";
stylesheet.textboxView.error.borderBottomColor = "#42b549";
stylesheet.textboxView.error.borderBottomWidth = 2;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;

var Form = t.form.Form;

var validateEmail = s => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(s);
};

var Email = t.refinement(t.String, s => validateEmail(s));
Email.getValidationErrorMessage = s => {
  if (!s) {
    return "Email should not be empty!";
  }
  if (!validateEmail(s)) {
    return "Incorrect email format";
  }
};

var data = t.struct({
  email: Email,
  password: t.String
});

var options = {
  stylesheet: stylesheet,
  fields: {
    email: {
      label: "EMAIL",
      autoCapitalize: "none"
    },
    password: {
      label: "PASSWORD",
      error: "Password should not be empty!",
      autoCapitalize: "none",
      secureTextEntry: true
    }
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeValue = value => {
    a = {};
    this.setState({
      ...this.state,
      ...value
    });
  };

  _onPressButton = () => {
    var value = this.refs.form.getValue();
    if (value === null) return;

    this.props.loginAuth(this.state);
  };

  componentWillMount() {
    console.log("style:  ", stylesheet.textboxView.normal);
  }

  render() {
    return (
      <Container>
        <Header
          style={styles.header}
          borderBottomWidth={2}
          borderBottomColor="#d0d0d0"
        >
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon type="Ionicons" name="ios-arrow-back" />
              <Body>
                <Title>Login</Title>
              </Body>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Text style={{ color: "#42b549" }}>Signup</Text>
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Form
            type={data}
            value={this.state}
            options={options}
            ref="form"
            onChange={value => this.onChangeValue(value)}
          />
          <Left />
          <Body />
          <View style={styles.forgotPass}>
            <Button transparent>
              <Text style={{ color: "#42b549" }}>Forgot Password?</Text>
            </Button>
          </View>
          <Button style={styles.button} onPress={this._onPressButton}>
            {this.props.isLoadingLogin ? (
              <Content>
                <Left />
                <Body>
                  <Loading style={styles.animation} />
                </Body>
                <Right />
              </Content>
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoadingLogin: auth.isLoadingLogin
});

const mapDispatchToProps = dispatch => ({
  loginAuth: user => dispatch(loginAuth(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
