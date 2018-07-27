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
  CardItem
} from "native-base";
import { Image, TouchableOpacity, TextInput } from "react-native";

import { DefaultStatusBar } from "../../assets/components/StatusBar";
import styles from "./style/EditProfile";

class EditProfile extends Component {
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
                <Text>
                  {this.Capitalize(this.props.user.first_name) +
                    " " +
                    this.Capitalize(this.props.user.last_name)}
                </Text>
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
                />
              </CardItem>
            </View>
            <View>
              <CardItem style={styles.head}>
                <Text note>Gender</Text>
              </CardItem>
              <CardItem />
            </View>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user.user
});

export default connect(mapStateToProps)(EditProfile);
