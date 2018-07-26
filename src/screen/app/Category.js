import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles/Category";
import { ScrollView, FlatList, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Text,
  List,
  View,
  ListItem
} from "native-base";
import { routes } from "./Constant/Category";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

export default class Category extends Component {
  renderMenu = item => (
    <View>
      <ListItem style={{ flexDirection: "column" }}>
        <Icon type={item.type} name={item.icon} />
        <Text>{item.name}</Text>
      </ListItem>
    </View>
  );
  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="close" type="EvilIcons" />
            </Button>
          </Left>
        </Header>
        <ScrollView
          style={{
            width: "25%",
            height: "100%",
            backgroundColor: "blue",
            padding: 0
          }}
        >
          <FlatList
            data={routes}
            renderItem={({ item }) => this.renderMenu(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <ScrollView
          style={{
            backgroundColor: "white",
            width: "75%",
            height: "100%",
            marginLeft: "25%",
            marginTop: "17%",
            position: "absolute",
            padding: 10
          }}
        />
      </Container>
    );
  }
}
