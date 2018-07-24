import React, { Component } from "react";
import {
  Container,
  Header,
  Body,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Button,
  Icon,
  Title
} from "native-base";
import { connect } from "react-redux";

class Review extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Tokopedia</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Card>
                <CardItem>
                  <Text>$ {this.props.order}</Text>
                </CardItem>
              </Card>
            </CardItem>
            <CardItem>
              <Text>Select payment method</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  order: order.item
});

export default connect(mapStateToProps)(Review);
