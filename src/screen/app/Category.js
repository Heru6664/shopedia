import accounting from "accounting";
import {
  Button,
  Card,
  CardItem,
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
import { FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import { connect } from "react-redux";
import { getDetail } from "../../actions/detail";
import { fetchProduct } from "../../actions/product";
import Loading from "../../assets/components/Loading";
import { DefaultStatusBar } from "../../assets/components/StatusBar";
import { routes } from "./Constant/Category";
import styles from "./styles/Category";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: routes,
      categories: ""
    };
  }
  handlePress = route => {
    this.setState({ categories: route }, () => {
      this.getProduct();
    });
  };

  pressProduct = item => {
    this.props.getDetail(item);
    this.props.navigation.navigate("ProductDesc");
  };

  componentDidMount() {
    this.props.fetchProduct();
  }
  renderMenu = (item, index) => (
    <View>
      <FooterTab style={styles.listTab}>
        <Button
          onPress={() => this.actionBtn(item, index)}
          active={item.active}
          style={item.active ? styles.buttonActive : styles.buttonDisActive}
        >
          <Icon type={item.type} name={item.icon} />
          <Text>{item.name}</Text>
        </Button>
      </FooterTab>
    </View>
  );

  renderCategory = item => {
    return (
      <TouchableOpacity
        onPress={() => this.pressProduct(item)}
        style={styles.th}
      >
        <Card>
          <CardItem>
            <Text>{item.name}</Text>
          </CardItem>
          <CardItem>
            <Image style={styles.img} source={{ uri: item.img }} />
          </CardItem>
          <CardItem style={styles.itemContainer}>
            <Text>{accounting.formatMoney(item.price, "IDR ", ",", ".")}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={15}
              fullStarColor="#FFD700"
              halfStarColor="#FFD700"
              rating={item.rating}
            />
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  getProduct = () => {
    const category = this.state.categories;
    const data = this.props.getProduct.filter(item => {
      return item.category === category;
    });

    console.log("data:", data);

    return (
      <FlatList
        data={data}
        renderItem={({ item }) => this.renderCategory(item)}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  actionBtn = (item, index) => {
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
    this.handlePress(item.cat);
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
            {this.props.isLoading ? <Loading /> : this.getProduct()}
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  getProduct: product.product,
  isLoading: product.loading
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: product => dispatch(fetchProduct(product)),
  getDetail: item => dispatch(getDetail(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
