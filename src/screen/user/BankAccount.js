import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Text,
  Content,
  Card,
  CardItem,
  Item,
  Label,
  Input
} from "native-base";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

export default class BankAccount extends Component {
  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon style={styles.textHead} name="arrow-back" />
              <Text style={styles.textHead}>Bank Account</Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Item floatingLabel>
                <Label> Name</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      name: val
                    })
                  }
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label> Account Number </Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      accountNumber: val
                    })
                  }
                />
              </Item>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
