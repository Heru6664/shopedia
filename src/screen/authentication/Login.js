import React, { Component } from "react";
import Animation from "lottie-react-native";
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import { loginAuth } from "../../actions/auth";
import styles from "./styles/Login";

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

  componentWillMount() {
    this.initAnimation();
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

  initAnimation() {
    if (!this.animation) {
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
      this.animation.play();
    }
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Form
            type={data}
            value={this.state}
            options={options}
            ref="form"
            onChange={value => this.onChangeValue(value)}
          />
          <Button style={styles.button} onPress={this._onPressButton} bordered>
            {this.props.isLoadingLogin ? (
              <Content>
                <Left />
                <Body>
                  <Animation
                    ref={animation => {
                      this.animation = animation;
                    }}
                    style={styles.animation}
                    loop
                    source={require("../../assets/images/lottie/data.json")}
                  />
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
