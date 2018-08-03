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
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { addPaymentMethod } from "../../actions/order";

class Bill extends Component {
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
    this.props.getInvoice(this.props.invoice.id);
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
        <Content>
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
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ invoice }) => ({
  invoice: invoice.invoice
});

const mapDispatchToProps = dispatch => ({
  getInvoice: info => dispatch(getInvoice(info)),
  addPaymentMethod: method => dispatch(addPaymentMethod(method))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bill);
