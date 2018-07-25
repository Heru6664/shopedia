import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Icon,
  Button,
  Body,
  Title,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Text
} from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "./styles/Whislist";
import { DefaultStatusBar } from "../../assets/components/StatusBar";

class Wishlist extends Component {
  componentWillMount() {
    console.log("props: ", this.props);
  }
  renderLiked = item => (
    <TouchableOpacity>
      <Card>
        <CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.img }} />

              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.category}</Text>
              </Body>
            </Left>
            <Right />
          </CardItem>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );

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
          <Body>
            <Title>My Wishlist</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <FlatList
            data={this.props.wishlist}
            renderItem={({ item }) => this.renderLiked(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ wishlist }) => ({
  wishlist: wishlist.wishlist
});

export default connect(mapStateToProps)(Wishlist);
