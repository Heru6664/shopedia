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
  Card,
  ListItem
} from "native-base";
import { TouchableOpacity, FlatList } from "react-native";
import styles from "./style/Profile";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class Profile extends Component {
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderData = item => {
    console.log("item:", item)(
      <View>
        <ListItem>
          <Text note>Phone Number</Text>
          <Text>{item.phone}</Text>
        </ListItem>
        <ListItem>
          <Text note>Email</Text>
          <Text>{item.email}</Text>
        </ListItem>
        <ListItem>
          <Text note>Gender</Text>
          <Text>{item.gender}</Text>
        </ListItem>
        <ListItem>
          <Text note>Birth Date</Text>
          <Text>{item.birthdate}</Text>
        </ListItem>
      </View>
    );
  };

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
                <Thumbnail
                  style={styles.profilePhoto}
                  large
                  source={require("../../assets/images/tokopedia/defaultProfile.png")}
                />
                <Body style={styles.bodyName}>
                  <Text style={styles.name}>
                    {this.Capitalize(this.props.user.first_name) +
                      " " +
                      this.Capitalize(this.props.user.last_name)}
                  </Text>
                  <Button style={styles.btnEdit}>
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
                  <TouchableOpacity>
                    <Text>0</Text>
                    <Text>Following</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.foll}>
                  <TouchableOpacity>
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

            <CardItem>
              <FlatList
                data={this.props.user}
                renderItem={({ item }) => this.renderData(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardItem>
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
