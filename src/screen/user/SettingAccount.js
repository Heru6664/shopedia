import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Header,
  Left,
  Button,
  Icon,
  View,
  ListItem
} from "native-base";
import { FlatList } from "react-native";

import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { item } from "./Constant/SettingAccount";
import styles from "./style/SettingAccount";

export default class SettingAccount extends Component {
  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header style={styles.header}>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon style={styles.textHead} name="arrow-back" />
              <Text style={styles.textHead}>Account Settings</Text>
            </Button>
          </Left>
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.cardHead}>
              <Text>Settings</Text>
            </CardItem>
            <CardItem style={styles.cardHead}>
              <Text>Manage your profile</Text>
            </CardItem>
          </Card>
          <View>
            <FlatList
              data={item}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(item.route)}
                >
                  <Icon name={item.iconName} type={item.iconType} />
                  <Text style={styles.text}>{item.name}</Text>
                </ListItem>
              )}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
