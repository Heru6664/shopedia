import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  View,
  Thumbnail,
  Body,
  Text,
  CardItem,
  Card
} from "native-base";
import { TouchableOpacity } from "react-native";
import styles from "./style/Profile";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class Profile extends Component {
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
            </Button>
          </Left>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <View style={styles.viewProfile}>
                <TouchableOpacity>
                  <Thumbnail
                    style={styles.profilePhoto}
                    large
                    source={require("../../assets/images/tokopedia/defaultProfile.png")}
                  />
                </TouchableOpacity>
                <Body style={styles.bodyName}>
                  <Text style={styles.name}>
                    {this.Capitalize(this.props.user.first_name) +
                      " " +
                      this.Capitalize(this.props.user.last_name)}
                  </Text>
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate("EditProfile")
                    }
                    style={styles.btnEdit}
                  >
                    <Icon
                      style={styles.btnTxt}
                      name="ios-settings"
                      type="Ionicons"
                    />
                    <Text style={styles.btnTxt}>Edit Profile</Text>
                  </Button>
                </Body>
              </View>
            </CardItem>
            <CardItem>
              <View style={styles.viewProfile}>
                <View style={[styles.foll, styles.border]}>
                  <TouchableOpacity style={styles.touchAct}>
                    <Text>0</Text>
                    <Text>Following</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.foll}>
                  <TouchableOpacity style={styles.touchAct}>
                    <Text>0</Text>
                    <Text>Favorite Store</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={styles.titleData}>Data Profile</Text>
            </CardItem>
            <CardItem>
              <Text note>This info can only be seen by you</Text>
            </CardItem>
            <View>
              <View style={styles.item}>
                <CardItem style={styles.head}>
                  <Text note>Phone Number</Text>
                </CardItem>
                <CardItem>
                  <Text>{this.props.user.phone}</Text>
                </CardItem>
              </View>
              <View style={styles.item}>
                <CardItem style={styles.head}>
                  <Text note>Email</Text>
                </CardItem>
                <CardItem>
                  <Text>{this.props.user.email}</Text>
                </CardItem>
              </View>
              <View style={styles.item}>
                <CardItem style={styles.head}>
                  <Text note>Gender</Text>
                </CardItem>
                <CardItem>
                  <Text>{this.props.user.gender}</Text>
                </CardItem>
              </View>
              <View style={styles.item}>
                <CardItem style={styles.head}>
                  <Text note>Birth Date</Text>
                </CardItem>
                <CardItem>
                  <Text>{this.props.user.birthdate}</Text>
                </CardItem>
              </View>
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

export default connect(mapStateToProps)(Profile);
