import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class ShoppingList extends Component {
  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Shopping List</Title>
            </Button>
          </Left>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>{Object.keys(this.props.invoice).length}</Text>
                <Text>Payment Status</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ invoice }) => ({
  invoice: invoice.invoice
});

export default connect(mapStateToProps)(ShoppingList);
