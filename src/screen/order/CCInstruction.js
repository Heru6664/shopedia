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
import CheckBox from "react-native-check-box";
import ModalDropdown from "react-native-modal-dropdown";
import {
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  WebView,
  Modal,
  Dimensions,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import Loading from "../../assets/components/Loading";
import { months, years } from "./Constant/Result";
import { connect } from "react-redux";
import Xendit from "xendit-js-node";

const { height, width } = Dimensions.get("window");
const API_KEY =
  "xnd_public_development_PouFK+ol0+SmwMNpLeAYEzTFYdGq8oQuwiDh/Rpg/GTX8LGhCgRw";

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };

  window.postMessage = patchedPostMessage;
};

const injectScript = "(" + String(patchPostMessageFunction) + ")();";

class CCInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.invoice.amount,
      card_number: "",
      card_exp_month: "",
      card_exp_year: "",
      card_cvn: "",
      is_multiple_use: false,
      should_authenticate: true,
      should_use_meta: false,
      meta_json: "{}",
      isLoading: false,
      source: "",
      msg: "",
      dsWebView: false,
      creditCardToken: ""
    };
  }
  paymentForm() {
    Xendit.setPublishableKey(API_KEY);

    let tokenData = this.getTokenData();
    let fraudData = this.getFraudData();

    if (this.state.should_use_meta) {
      Xendit.card.createToken(tokenData, fraudData, this.xenditResponseHandler);
    } else {
      Xendit.card.createToken(tokenData, this.xenditResponseHandler);
    }
  }

  getTokenData() {
    return {
      amount: this.state.amount,
      card_number: this.state.card_number,
      card_exp_month: this.state.card_exp_month,
      card_exp_year: this.state.card_exp_year,
      card_cvn: this.state.card_cvn,
      is_multiple_use: this.state.is_multiple_use,
      should_authenticate: this.state.should_authenticate
    };
  }

  getFraudData() {
    return JSON.parse(this.state.meta_json);
  }

  xenditResponseHandler = (err, creditCardToken) => {
    console.log("cct: ", creditCardToken);
    if (err) {
      this.setState({ isLoading: false });
      return this.displayError(err);
    }
    this.setState({ creditCardToken: creditCardToken });
    if (
      creditCardToken.status === "APPROVED" ||
      creditCardToken.status === "VERIFIED"
    ) {
      this.displaySuccess(creditCardToken);
    } else if (creditCardToken.status === "IN_REVIEW") {
      this.setState({ source: creditCardToken.payer_authentication_url });
    } else if (creditCardToken.status === "FRAUD") {
      this.displayError(creditCardToken);
    } else if (creditCardToken.status === "FAILED") {
      this.displayError(creditCardToken);
    }

    this.setState({ isLoading: false });
    this.setState({ dsWebView: true });
  };

  displayError(err) {
    let requestData = Object.assign(
      {},
      this.getTokenData(),
      this.getFraudData()
    );

    if (this.state.should_use_meta) {
      requestData["meta_enabled"] = true;
    } else {
      requestData["meta_enabled"] = false;
    }

    Alert.alert(
      "Error: \n" +
        JSON.stringify(err, null, 4) +
        "\n\n" +
        "Request Data: \n" +
        JSON.stringify(requestData, null, 4)
    );
  }

  displaySuccess(creditCardToken) {
    var requestData = Object.assign(
      {},
      this.getTokenData(),
      this.getFraudData()
    );

    if (this.state.should_use_meta) {
      requestData["meta_enabled"] = true;
    } else {
      requestData["meta_enabled"] = false;
    }

    Alert.alert(
      "RESPONSE: \n" +
        JSON.stringify(creditCardToken, null, 4) +
        "\n\n" +
        "Request Data: \n" +
        JSON.stringify(requestData, null, 4)
    );
  }

  onMessage(event) {
    console.log(event.nativeEvent.data);
    this.setState({ dsWebView: false });
    alert(event.nativeEvent.data);
  }
  render() {
    Xendit.setPublishableKey(API_KEY);

    const {
      parentContainerStyle,
      cardDetailsContainer,
      metaDetailsContainer,
      labelText,
      labelTextSect,
      inputForm,
      smallInputForm,
      onTop
    } = styles;

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
          {/* <View
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
              <Input
                onChangeText={val => this.setState({ card_number: val })}
              />
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
                onSelect={(idx, value) =>
                  this.setState({ card_exp_month: value })
                }
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
                onSelect={(idx, value) =>
                  this.setState({ card_exp_year: value })
                }
                options={years}
              />
            </View>
          </View>
          <View>
            <Item>
              <Input
                maxLength={4}
                keyboardType={"numeric"}
                onChangeText={val => this.setState({ card_cvn: val })}
                placeholder="CVC / CVV"
              />
            </Item>
            <Text note>3 or 4 digits code behind the card</Text>
          </View>
          <Button style={{ backgroundColor: "#1ace9b" }}>
            <Text>Pay Right Now</Text>
          </Button> */}
          <View style={cardDetailsContainer}>
            {this.state.isLoading ? (
              <View style={onTop}>
                <Loading style={{ width: 50, height: 50 }} />
              </View>
            ) : (
              <Text />
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.dsWebView}
              onRequestClose={() => this.setState({ dsWebView: false })}
              hidden={true}
            >
              {this.render3dsWebView()}
            </Modal>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={labelText}>Is Multi-Use</Text>
              <Text style={labelText}>Skip Authentication</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CheckBox
                isChecked={this.state.is_multiple_use}
                onClick={() =>
                  this.setState({
                    is_multiple_use: !this.state.is_multiple_use
                  })
                }
                style={{ right: 65 }}
              />
              <CheckBox
                isChecked={
                  this.state.should_authenticate === true ? false : true
                }
                onClick={() =>
                  this.setState({
                    should_authenticate: !this.state.should_authenticate
                  })
                }
                style={{ left: 20 }}
              />
            </View>

            <Text style={labelText}>AMOUNT</Text>
            <TextInput
              value={this.props.invoice.amount.toString()}
              onChangeText={amount => this.setState({ amount })}
              placeholder={"Amount"}
              underlineColorAndroid="transparent"
              style={inputForm}
            />

            <Text style={labelText}>CARD NUMBER</Text>
            <TextInput
              value={this.state.card_number}
              onChangeText={card_number => this.setState({ card_number })}
              placeholder="Card number"
              underlineColorAndroid="transparent"
              style={inputForm}
            />

            <View style={{ flexDirection: "row" }}>
              <Text style={labelTextSect}>EXP MONTH</Text>
              <Text style={labelTextSect}>EXP YEAR</Text>
              <Text style={labelTextSect}>CVN CODE</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={this.state.card_exp_month}
                onChangeText={card_exp_month =>
                  this.setState({ card_exp_month })
                }
                placeholder="EXP Month"
                underlineColorAndroid="transparent"
                style={smallInputForm}
              />

              <TextInput
                value={this.state.card_exp_year}
                onChangeText={card_exp_year => this.setState({ card_exp_year })}
                placeholder="EXP Year"
                underlineColorAndroid="transparent"
                style={smallInputForm}
              />

              <TextInput
                value={this.state.card_cvn}
                onChangeText={card_cvn => this.setState({ card_cvn })}
                placeholder="CVN Code"
                underlineColorAndroid="transparent"
                style={smallInputForm}
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                onPress={() => {
                  this.paymentForm();
                  this.setState({ isLoading: true });
                }}
                height={130}
                width={130}
                borderRadius={100}
              >
                <Text>Pay Right Now</Text>
              </Button>
            </View>
          </View>

          <View>{this.renderMetaDetailsContainer()}</View>
        </Content>
      </Container>
    );
  }

  renderMetaDetailsContainer() {
    const { metaDetailsContainer, labelText, inputForm } = styles;

    return (
      <View style={metaDetailsContainer}>
        <Text style={labelText}>Meta Details</Text>
        <Text style={labelText}>JSON:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={this.state.meta_json}
          onChangeText={meta_json => this.setState({ meta_json })}
          style={inputForm}
          height={100}
        />

        <Text style={labelText}>Enable Meta</Text>
        <CheckBox
          isChecked={this.state.should_use_meta}
          onClick={() =>
            this.setState({ should_use_meta: !this.state.should_use_meta })
          }
        />
      </View>
    );
  }
  render3dsWebView() {
    const {
      webViewOnTop,
      cardDetailsContainer,
      modalDetailsContainer,
      cardDetailsContainer2
    } = styles;

    return (
      <View style={cardDetailsContainer}>
        <View style={modalDetailsContainer}>
          <Button
            onPress={() => this.setState({ dsWebView: false })}
            height={40}
            width={70}
            borderRadius={15}
          >
            <Text>Close</Text>
          </Button>
          <Button
            onPress={() =>
              Alert.alert(JSON.stringify(this.state.creditCardToken))
            }
            height={40}
            width={70}
            borderRadius={15}
          >
            <Text>Token</Text>
          </Button>
        </View>

        <View style={cardDetailsContainer2}>
          <WebView
            injectedJavaScript={injectScript}
            source={{ uri: this.state.source }}
            ref={webView => (this.webView = webView)}
            onMessage={this.onMessage.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#95a5a6"
  },
  cardDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 500,
    backgroundColor: "#FEFDFF"
  },
  cardDetailsContainer2: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FEFDFF"
  },
  metaDetailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FEFDFF"
  },
  modalDetailsContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FEFDFF"
  },
  labelText: {
    marginRight: 20,
    color: "#000",
    fontWeight: "bold"
  },
  labelTextSect: {
    marginRight: 30,
    color: "#000",
    fontWeight: "bold"
  },
  inputForm: {
    height: 40,
    width: 200,
    marginBottom: 19,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 7,
    color: "#000",
    borderColor: "#bdc3c7",
    backgroundColor: "#FEFDFF"
  },
  smallInputForm: {
    height: 40,
    width: 80,
    marginBottom: 19,
    marginRight: 22,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 7,
    color: "#000",
    borderColor: "#bdc3c7",
    backgroundColor: "#FEFDFF"
  },
  onTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    backgroundColor: "#7f8c8d99"
  },
  webViewOnTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    backgroundColor: "#FFF"
  }
});

const mapStateToProps = ({ order, invoice }) => ({
  invoice: invoice.invoice,
  method: order.paymentMethod
});

export default connect(mapStateToProps)(CCInstruction);
