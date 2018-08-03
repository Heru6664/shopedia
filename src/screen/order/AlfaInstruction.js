import React, { Component } from "react";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  View,
  ListItem,
  Text
} from "native-base";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { alfa } from "./Constant/AlfaInstruction";

class AlfaInstruction extends Component {
  render() {
    const alfaCode = this.props.invoice.invoice.available_retail_outlets[0]
      .payment_code;
    console.log(alfaCode);
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
        <Content>
          <Text>Your payment code:{alfaCode}</Text>
          <Text note>
            Silahkan baca petunjuk di bawah ini untuk menyelesaikan transaksi
            anda. Kami sarankan Anda untuk menyimpan halaman ini.
          </Text>
          <FlatList
            data={alfa}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ListItem>
                  <Left>
                    <Text>{item.step}</Text>
                    <Body>
                      <Text>{item.val}</Text>
                    </Body>
                  </Left>
                </ListItem>
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

export default connect(mapStateToProps)(AlfaInstruction);
