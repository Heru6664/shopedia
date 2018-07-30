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
  Button,
  View
} from "native-base";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/Address";

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
              <Title>Address Setting</Title>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon type="Entypo" name="plus" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.bodyCard}>
              <Text style={styles.title}>
                {this.props.user.address.addressAs}
              </Text>
              <Text>{this.props.user.address.receiverName}</Text>
              <Text>{this.props.user.address.address}</Text>
              <Text>{this.props.user.address.city}</Text>
              <Text>{this.props.user.address.receiverPhone}</Text>
            </CardItem>
            <CardItem>
              <Left />
              <Left />
              <Left>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("EditAddress")}
                >
                  <Text style={styles.btn}>Edit</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <TouchableOpacity>
                  <Text style={styles.btn}>Delete</Text>
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
  user: auth.user
});

export default connect(mapStateToProps)(Address);
