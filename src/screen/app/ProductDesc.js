import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Icon,
  Title,
  Content,
  Card,
  CardItem,
  Text
} from "native-base";
import StarRating from "react-native-star-rating";
import { Image } from "react-native";
import styles from "./styles/ProductDesc";

class ProductDesc extends Component {
  state = {
    like: false
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="arrow-back" />
              <Title>Product Detail</Title>
            </Button>
          </Left>
        </Header>
        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.headerProduct}>
              <Body>
                <Text>{this.props.detail.name}</Text>
              </Body>
            </CardItem>
            <CardItem style={styles.containerImg} cardBody>
              <Image
                resizeMode="contain"
                source={{ uri: this.props.detail.img }}
                style={styles.imageCard}
              />
            </CardItem>
            <CardItem>
              <Text>{this.props.detail.name}</Text>
            </CardItem>
            <CardItem>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={20}
                fullStarColor="#FFD700"
                halfStarColor="#FFD700"
                rating={this.props.detail.rating}
              />
            </CardItem>
            <CardItem>
              <Text>$ {this.props.detail.price}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ detail }) => ({
  detail: detail.detailProduct
});

// const mapDispatchToProps = dispatch => ({

// })

export default connect(mapStateToProps)(ProductDesc);
