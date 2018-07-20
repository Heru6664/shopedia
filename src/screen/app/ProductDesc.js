import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
  Thumbnail,
  H2
} from "native-base";
import StarRating from "react-native-star-rating";
import { Image, TouchableOpacity } from "react-native";
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

          <Card>
            <CardItem>
              <Text>Description:</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.detail.description}</Text>
            </CardItem>
            <CardItem>
              <Button transparent>
                <Text> Show More</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Seller</Text>
            </CardItem>
            <CardItem bordered>
              <Thumbnail source={{ uri: this.props.detail.seller.sellerImg }} />
              <Text style={styles.seller}>
                {this.props.detail.seller.sellerName}
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Positive Feedback</Text>
                <H2 style={{ padding: 10 }}>
                  {this.props.detail.seller.positiveFeedback}%
                </H2>
              </Left>
              <Body />
              <Right>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={20}
                  fullStarColor="#FFD700"
                  halfStarColor="#FFD700"
                  rating={this.props.detail.seller.sellerRating}
                />
              </Right>
            </CardItem>
            <CardItem bordered>
              <TouchableOpacity>
                <Text>view seller</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <Card>
            <TouchableOpacity>
              <CardItem header bordered>
                <Left>
                  <Text>Customer Review</Text>
                </Left>
                <Body />
                <Right>
                  <Button transparent>
                    <Icon type="Entypo" name="chevron-thin-right" />
                  </Button>
                </Right>
              </CardItem>
            </TouchableOpacity>
            <CardItem header>
              <Text>{this.props.detail.feedback.costumer} </Text>
            </CardItem>
            <CardItem bordered>
              <Text>{this.props.detail.feedback.comment}</Text>
            </CardItem>
          </Card>
          <TouchableOpacity>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Text>Product Q & A</Text>
                </Left>
                <Body />
                <Right>
                  <Button transparent>
                    <Icon type="Entypo" name="chevron-thin-right" />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
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
