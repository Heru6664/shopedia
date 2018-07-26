import React, { Component } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Header,
  Icon,
  Left,
  Title,
  Body,
  Right,
  Button
} from "native-base";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Address</Title>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent>
              <Icon type="Entypo" name="plus" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Text>Home address</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.user.address}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <TouchableOpacity>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <TouchableOpacity>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user.user
});

export default connect(mapStateToProps)(Address);
