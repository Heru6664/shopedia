import accounting from "accounting";
import {
  Badge,
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Text,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { FlatList } from "react-native";
import Collapsible from "react-native-collapsible";
import { connect } from "react-redux";
import { getInvoice } from "../../actions/invoice";
import { addPaymentMethod } from "../../actions/order";
import Loading from "../../assets/components/Loading";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { days, months } from "./Constant/Result";

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      method: true,
      banks: true,
      retail: true
    };
  }
  componentWillMount() {
    this.props
      .getInvoice(this.props.invoice.id)
      .then(() => console.log("get success"))
      .catch(e => console.log(e));
  }
  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  expandMethod = () => {
    this.setState({ method: !this.state.method });
  };
  expandBanks = () => {
    this.setState({ banks: !this.state.banks });
  };
  expandRetail = () => {
    this.setState({ retail: !this.state.retail });
  };
  bankMethod = item => {
    this.props.addPaymentMethod(item.bank_code);
    this.props.navigation.navigate("Instruction");
  };
  retailMethod = item => {
    this.props.addPaymentMethod(item.retail_outlet_name);
    this.props.navigation.navigate("AlfaInstruction");
  };
  render() {
    const {
      external_id,
      status,
      amount,
      payer_email,
      description,
      available_banks,
      available_retail_outlets
    } = this.props.invoice;
    const date = new Date(this.props.invoice.expiry_date);

    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let dates = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return (
      <Content>
        {this.props.loading ? (
          <Loading style={{ width: 50, height: 50 }} />
        ) : (
          <View>
            <View>
              <ListItem onPress={() => this.toggleExpanded()}>
                <Left>
                  <Text>{description}</Text>
                </Left>
                <Badge warning>
                  <Text>{status}</Text>
                </Badge>
              </ListItem>
            </View>
            <Collapsible collapsed={this.state.collapsed}>
              <View>
                <Text>
                  (Pay before {days[dates]} , {dates} {months[month]} {year},{" "}
                  {hours}:{mins})
                </Text>
                <Text>External Id : {external_id}</Text>
                <Text>
                  Total Amount :{" "}
                  {accounting.formatMoney(amount, "IDR ", ",", ".")}
                </Text>
                <Text>Payer Email : {payer_email}</Text>
                <View>
                  <ListItem onPress={() => this.expandMethod()}>
                    <Left>
                      <Text>Select Payment Method</Text>
                    </Left>
                  </ListItem>
                </View>
                <Collapsible collapsed={this.state.method}>
                  <View>
                    <ListItem onPress={() => this.expandBanks()}>
                      <Text>Bank Transfer</Text>
                    </ListItem>
                    <Collapsible collapsed={this.state.banks}>
                      <FlatList
                        data={available_banks}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View>
                            <ListItem onPress={() => this.bankMethod(item)}>
                              <Text>{item.bank_code}</Text>
                            </ListItem>
                          </View>
                        )}
                      />
                    </Collapsible>
                    <ListItem onPress={() => this.expandRetail()}>
                      <Text>Retail Outlet</Text>
                    </ListItem>
                    <Collapsible collapsed={this.state.retail}>
                      <FlatList
                        data={available_retail_outlets}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View>
                            <ListItem onPress={() => this.retailMethod(item)}>
                              <Text>{item.retail_outlet_name}</Text>
                            </ListItem>
                          </View>
                        )}
                      />
                    </Collapsible>
                  </View>
                </Collapsible>
              </View>
            </Collapsible>
          </View>
        )}
      </Content>
    );
  }
}

class Settled extends Component {
  render() {
    return (
      <Content>
        <Left>
          <Icon name="check" type="EvilIcons" />
          <Text>Thank you</Text>
          <Text>Your payment has been success</Text>
        </Left>
        <Right>
          <Badge success>
            <Text>{this.props.invoice.status}</Text>
          </Badge>
        </Right>
        <View>
          <Text>Review</Text>
          <ListItem>
            <Text>Total amount : </Text>
            <Text>
              {accounting.formatMoney(
                this.props.invoice.amount,
                "IDR ",
                ",",
                "."
              )}
            </Text>
          </ListItem>
          <ListItem>
            <Text>Paid amount</Text>
            <Text>{this.props.invoice.paid_amount}</Text>
          </ListItem>
          <ListItem>
            <Text>Name to: </Text>
            <Text>{this.props.user}</Text>
          </ListItem>
          <ListItem>
            <Text>Description : </Text>
            <Text>{this.props.invoice.description}</Text>
          </ListItem>
        </View>
      </Content>
    );
  }
}

class Bill extends Component {
  render() {
    const checkStatus = this.props.invoice.status;
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Invoice</Title>
          </Body>
          <Right />
        </Header>
        {checkStatus === "PENDING" ? (
          <Pending {...this.props} />
        ) : checkStatus === "SETTLED" ? (
          <Settled {...this.props} />
        ) : checkStatus === "EXPIRED" ? (
          console.log("EXpired")
        ) : (
          console.log("empty")
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ invoice, auth }) => ({
  invoice: invoice.invoice,
  user: auth.user.fullname,
  loading: invoice.loading
});

const mapDispatchToProps = dispatch => ({
  getInvoice: info => dispatch(getInvoice(info)),
  addPaymentMethod: method => dispatch(addPaymentMethod(method))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bill);
