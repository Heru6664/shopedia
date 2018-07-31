import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text
} from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../assets/components/Loading";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/AddAddress";
import { addAddress } from "../../actions/addAddress";

class AddAddress extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      addressAs: "",
      city: "",
      detailLocation: "",
      receiverName: "",
      receiverPhone: "",
      zipCode: ""
    };
  }
  saveChange = () => {
    this.props
      .addAddress(this.state)
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
            </Button>
          </Left>
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Text note>
                Save Address as (e.g : Home Address, Office Address, etc )
              </Text>
            </CardItem>
            <CardItem>
              <Input
                style={styles.textInput}
                onChangeText={val =>
                  this.setState({
                    addressAs: val
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>Receiver's Name</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      receiverName: val
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
                      address: val
                    })
                  }
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>City</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      city: val
                    })
                  }
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>ZIP Code</Label>
                <Input
                  onChangeText={val =>
                    this.setState({
                      zipCode: val
                    })
                  }
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
                      receiverPhone: val
                    })
                  }
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
  user: auth.user
});

const mapDispatchToProps = dispatch => ({
  addAddress: data => dispatch(addAddress(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddress);
