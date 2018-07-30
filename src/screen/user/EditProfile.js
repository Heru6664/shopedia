import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Card,
  Text,
  View,
  CardItem,
  Right
} from "native-base";
import { Image, TouchableOpacity, TextInput } from "react-native";
import { MKRadioButton } from "react-native-material-kit";

import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/EditProfile";
import { updateProfile } from "../../actions/editProfile";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.radioGroup = new MKRadioButton.Group();
    this.state = {
      fullname: props.user.fullname,
      birthdate: props.user.birthdate,
      email: props.user.email,
      phone: props.user.phone,
      isMale: false,
      gender: "",
      password: props.user.password,
      address: props.user.address
    };
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header style={styles.header}>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Left>
                <Text>Profile Settings</Text>
              </Left>
            </Button>
          </Left>
        </Header>
        <Content style={styles.content}>
          <Card style={styles.cardImage}>
            <TouchableOpacity>
              <CardItem style={styles.image}>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/images/tokopedia/defaultProfile.png")}
                />
              </CardItem>
            </TouchableOpacity>
          </Card>
          <Card>
            <CardItem style={styles.headCard}>
              <Text style={styles.textHead}>Update Profile</Text>
            </CardItem>
            <View>
              <CardItem style={styles.head}>
                <Text note>Name</Text>
              </CardItem>
              <CardItem>
                <TextInput
                  style={styles.inputBirthdate}
                  value={this.Capitalize(this.props.user.fullname)}
                  onChangeText={val => this.setState({ fullname: val })}
                />
              </CardItem>
            </View>
            <View>
              <CardItem style={styles.head}>
                <Text note>Birthdate</Text>
              </CardItem>
              <CardItem>
                <TextInput
                  style={styles.inputBirthdate}
                  value={this.props.user.birthdate}
                  onChangeText={val => this.setState({ birthdate: val })}
                />
              </CardItem>
            </View>
            <View>
              <CardItem style={styles.head}>
                <Text note>Gender</Text>
              </CardItem>
              <CardItem>
                <MKRadioButton
                  onCheckedChange={t => this.setState({ isMale: t.checked })}
                  checked={this.props.user.gender === "male"}
                  group={this.radioGroup}
                />
                <Text>Male</Text>
                <MKRadioButton
                  onCheckedChange={t => this.setState({ isMale: !t.checked })}
                  checked={this.props.user.gender === "female"}
                  group={this.radioGroup}
                />
                <Text>Female</Text>
              </CardItem>
            </View>
          </Card>
          <Card>
            <CardItem style={styles.headCard}>
              <Text>Edit Contact</Text>
            </CardItem>
            <View>
              <CardItem style={styles.head}>
                <Text note>Email</Text>
              </CardItem>
              <CardItem>
                <TextInput
                  style={styles.inputBirthdate}
                  value={this.props.user.email}
                  onChangeText={val => this.setState({ email: val })}
                />
              </CardItem>
            </View>
            <View>
              <CardItem style={styles.head}>
                <Text note>Phone</Text>
              </CardItem>
              <CardItem>
                <TextInput
                  style={styles.inputBirthdate}
                  value={this.props.user.phone}
                  onChangeText={val => this.setState({ phone: val })}
                />
              </CardItem>
            </View>
          </Card>
          <Button
            onPress={() => this.props.updateProfile(this.state)}
            style={styles.btnSave}
          >
            <Text>Save</Text>
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
  updateProfile: data => dispatch(updateProfile(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
