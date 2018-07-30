import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right,
  Card,
  CardItem,
  Text,
  Item,
  Label,
  Input,
  Body
} from "native-base";
import { TextInput } from "react-native";

import { DefaultStatusBar } from "../../assets/components/StatusBar";
import Loading from "../../assets/components/Loading";
import styles from "./style/EditAddress";
import { editAddress } from "../../actions/editAddress";

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: props.user.fullname,
      birthdate: props.user.birthdate,
      email: props.user.email,
      phone: props.user.phone,
      isMale: false,
      gender: "",
      password: props.user.password,
      address: {
        address: props.userAddress.address,
        addressAs: props.userAddress.addressAs,
        city: props.userAddress.city,
        detailLocation: props.userAddress.detailLocation,
        receiverName: props.userAddress.receiverName,
        receiverPhone: props.userAddress.receiverPhone,
        zipCode: props.userAddress.zipCode
      }
    };
  }

  saveChange = () => {
    this.props
      .editAddress(this.state)
      .then(this.props.navigation.navigate("Address"));
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
          <Card>
            <CardItem>
              <Text note>
                Save Address as (e.g : Home Address, Office Address, etc )
              </Text>
            </CardItem>
            <CardItem>
              <TextInput
                style={styles.textInput}
                value={this.props.userAddress.addressAs}
                onChangeText={val =>
                  this.setState({
                    address: { ...this.state.address, addressAs: val }
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>Receiver's Name</Label>
                <Input
                  value={this.props.userAddress.receiverName}
                  onChangeText={val =>
                    this.setState({
                      address: { ...this.state.address, receiverName: val }
                    })
                  }
                />
              </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Item floatingLabel>
                <Label>Address</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      address: { ...this.state.address, address: val }
                    })
                  }
                  value={this.props.userAddress.address}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>City</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      address: { ...this.state.address, city: val }
                    })
                  }
                  value={this.props.userAddress.city}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>ZIP Code</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      address: { ...this.state.address, zipCode: val }
                    })
                  }
                  value={this.props.userAddress.zipCode}
                />
              </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Item floatingLabel>
                <Label>Receiver's Phone Number</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      address: { ...this.state.address, receiverPhone: val }
                    })
                  }
                  value={this.props.userAddress.receiverPhone}
                />
              </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>
                Choise Location <Text note>(Optional)</Text>
              </Text>
            </CardItem>
            <CardItem>
              <Text note>
                make sure the location you mark on the map matches the address
                you fill above
              </Text>
            </CardItem>
          </Card>
          <Button onPress={() => this.saveChange()} style={styles.btnSave}>
            {this.props.isLoading ? (
              <Content>
                <Left />
                <Body>
                  <Loading style={styles.animation} />
                </Body>
                <Right />
              </Content>
            ) : (
              <Text style={styles.text}>Save</Text>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  userAddress: auth.user.address,
  isLoading: auth.isLoadingLogin
});

const mapDispatchToProps = dispatch => ({
  editAddress: addr => dispatch(editAddress(addr))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAddress);
