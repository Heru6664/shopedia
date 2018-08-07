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
  View,
  CardItem
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
import styles from "./style/Bill";

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
  CCmethod = () => {
    this.props.addPaymentMethod("Credit Card");
    this.props.navigation.navigate("CCInstruction");
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
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    return (
      <Content style={{ padding: 10 }}>
        {this.props.loading ? (
          <Loading style={styles.loading} />
        ) : (
          <View>
            <ListItem
              style={styles.headerItem}
              onPress={() => this.toggleExpanded()}
            >
              <Left>
                <Text style={styles.header}>{description}</Text>
              </Left>
              <Badge warning>
                <Text>{status}</Text>
              </Badge>
            </ListItem>
            <Collapsible collapsed={this.state.collapsed}>
              <View style={styles.contentItem}>
                <ListItem>
                  <Text style={styles.contentText}>
                    (Pay before {days[day]} , {dates} {months[month]} {year},{" "}
                    {hours}:{mins})
                  </Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.contentText}>
                    External Id : {external_id}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.contentText}>
                    Total Amount :{" "}
                    {accounting.formatMoney(amount, "IDR ", ",", ".")}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.contentText}>
                    Payer Email : {payer_email}
                  </Text>
                </ListItem>
                <ListItem />
                <View>
                  <ListItem
                    style={styles.headerMethod}
                    onPress={() => this.expandMethod()}
                  >
                    <Left>
                      <Text style={styles.contentText}>
                        Select Payment Method
                      </Text>
                    </Left>
                    <Right>
                      {this.state.method ? (
                        <Icon
                          style={styles.contentText}
                          name="ios-arrow-down"
                          type="Ionicons"
                        />
                      ) : (
                        <Icon
                          style={styles.contentText}
                          name="ios-arrow-up"
                          type="Ionicons"
                        />
                      )}
                    </Right>
                  </ListItem>
                </View>
                <Collapsible collapsed={this.state.method}>
                  <View style={styles.childContent}>
                    <ListItem
                      style={styles.headerChild}
                      onPress={() => this.expandBanks()}
                    >
                      <Left>
                        <Text style={styles.contentText}>Bank Transfer</Text>
                      </Left>
                      <Right>
                        {this.state.banks ? (
                          <Icon
                            style={styles.contentText}
                            name="ios-arrow-down"
                            type="Ionicons"
                          />
                        ) : (
                          <Icon
                            style={styles.contentText}
                            name="ios-arrow-up"
                            type="Ionicons"
                          />
                        )}
                      </Right>
                    </ListItem>
                    <Collapsible collapsed={this.state.banks}>
                      <FlatList
                        data={available_banks}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View style={{ marginLeft: 25 }}>
                            <ListItem onPress={() => this.bankMethod(item)}>
                              <Left>
                                <Text style={styles.contentText}>
                                  {item.bank_code}
                                </Text>
                              </Left>
                              <Right>
                                <Icon
                                  style={styles.contentText}
                                  name="chevron-right"
                                  type="EvilIcons"
                                />
                              </Right>
                            </ListItem>
                          </View>
                        )}
                      />
                    </Collapsible>
                    <ListItem
                      style={styles.headerChild}
                      onPress={() => this.expandRetail()}
                    >
                      <Left>
                        <Text style={styles.contentText}>Retail Outlet</Text>
                      </Left>
                      <Right>
                        {this.state.retail ? (
                          <Icon
                            style={styles.contentText}
                            name="ios-arrow-down"
                            type="Ionicons"
                          />
                        ) : (
                          <Icon
                            style={styles.contentText}
                            name="ios-arrow-up"
                            type="Ionicons"
                          />
                        )}
                      </Right>
                    </ListItem>
                    <Collapsible collapsed={this.state.retail}>
                      <FlatList
                        data={available_retail_outlets}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View style={{ marginLeft: 25 }}>
                            <ListItem onPress={() => this.retailMethod(item)}>
                              <Left>
                                <Text style={styles.contentText}>
                                  {item.retail_outlet_name}
                                </Text>
                              </Left>
                              <Right>
                                <Icon
                                  style={styles.contentText}
                                  name="chevron-right"
                                  type="EvilIcons"
                                />
                              </Right>
                            </ListItem>
                          </View>
                        )}
                      />
                    </Collapsible>
                    <ListItem
                      onPress={() => this.CCmethod()}
                      style={styles.headerChild}
                    >
                      <Left>
                        <Text style={styles.contentText}>Credit Card</Text>
                      </Left>
                      <Right>
                        <Icon
                          style={styles.contentText}
                          name="chevron-right"
                          type="Entypo"
                        />
                      </Right>
                    </ListItem>
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
        <View style={styles.head}>
          <Icon style={styles.icon} name="check" type="EvilIcons" />
          <Text style={styles.contentHead}>Your payment has been success</Text>
          <Text style={styles.contentHead}>Thank you</Text>
        </View>
        <View>
          <CardItem header>
            <Text>Review</Text>
            <Right>
              <Badge success>
                <Text>{this.props.invoice.status}</Text>
              </Badge>
            </Right>
          </CardItem>
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
            <Text>Paid amount :</Text>
            <Text>
              {accounting.formatMoney(
                this.props.invoice.paid_amount,
                "IDR ",
                ",",
                "."
              )}
            </Text>
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
