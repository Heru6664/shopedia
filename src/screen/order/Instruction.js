import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  Text,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { FlatList, Linking } from "react-native";
import { connect } from "react-redux";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import Banks from "./Constant/Instruction";

class Instruction extends Component {
  render() {
    const dataBank = Banks[this.props.method];
    const method = Object.keys(dataBank).map(key => key);

    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header hasTabs>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>{this.props.method} Bank Transfer</Title>
            </Button>
          </Left>
        </Header>
        <Content>
          <FlatList
            data={method}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
                <FlatList
                  data={dataBank[item]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ListItem>
                      <Left>
                        <Text>{item.step}</Text>
                        <Body>
                          <Text>
                            {item.val}
                            <Text
                              onPress={() => {
                                Linking.openURL(item.link);
                              }}
                            >
                              {item.link}
                            </Text>
                          </Text>
                        </Body>
                      </Left>
                    </ListItem>
                  )}
                />
              </View>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ order, invoice }) => ({
  method: order.paymentMethod,
  invoice
});

export default connect(mapStateToProps)(Instruction);
