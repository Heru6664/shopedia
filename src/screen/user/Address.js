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
import { TouchableOpacity, FlatList } from "react-native";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/Address";
import { getAddress } from "../../actions/editAddress";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAddress = item => {
    this.props.getAddress(item);
    this.props.navigation.navigate("EditAddress");
  };

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
          <FlatList
            data={this.props.address}
            renderItem={({ item }) => (
              <Card>
                <CardItem style={styles.bodyCard}>
                  <Text style={styles.title}>{item.addressAs}</Text>
                  <Text>{item.receiverName}</Text>
                  <Text>{item.address}</Text>
                  <Text>{item.city}</Text>
                  <Text>{item.receiverPhone}</Text>
                </CardItem>
                <CardItem>
                  <Left />
                  <Left />
                  <Left>
                    <TouchableOpacity onPress={() => this.getAddress(item)}>
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
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  address: Object.keys(auth.user.address).map(key => ({
    id: key,
    ...auth.user.address[key]
  }))
});

const mapDispatchToProps = dispatch => ({
  getAddress: data => dispatch(getAddress(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
