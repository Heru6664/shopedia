import {
  Button,
  Container,
  FooterTab,
  Header,
  Icon,
  Left,
  Text,
  Title,
  View
} from "native-base";
import React, { Component } from "react";
import { FlatList, ScrollView } from "react-native";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { routes } from "./Constant/Category";
import styles from "./styles/Category";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: routes
    };
  }
  renderMenu = (item, index) => (
    <View>
      <FooterTab style={styles.listTab}>
        <Button
          onPress={() => this.actionBtn(index)}
          active={item.active}
          style={item.active ? styles.buttonActive : styles.buttonDisActive}
        >
          <Icon type={item.type} name={item.icon} />
          <Text>{item.name}</Text>
        </Button>
      </FooterTab>
    </View>
  );

  actionBtn = index => {
    this.setState(
      {
        route: [
          ...this.state.route.slice(0, index),
          {
            ...this.state.route[index],
            active: !this.state.route[index].active
          },
          ...this.state.route.slice(index + 1)
        ]
      },
      () => {
        const data = this.state.route;
        const result = data.map((item, id) => {
          if (id != index) {
            item.active = false;
            return item;
          }
          return item;
        });
        this.setState({ route: result });
      }
    );
  };

  render() {
    return (
      <Container>
        <DefaultStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="close" type="EvilIcons" />
              <Title>Category</Title>
            </Button>
          </Left>
        </Header>
        <View>
          <ScrollView style={styles.containerList}>
            <FlatList
              data={this.state.route}
              renderItem={({ item, index }) => this.renderMenu(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
          <ScrollView style={styles.renderList}>
            <Text>aslkdjas</Text>
          </ScrollView>
        </View>
      </Container>
    );
  }
}
