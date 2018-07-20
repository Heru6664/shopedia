import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Spinner
} from "native-base";
import styles from "./styles/MainScreen";
import { FlatList } from "react-native";
import DashboardContent from "../../components/DashboardContent";
import { fetchProduct } from "../../actions/product";

class MainScreen extends Component {
  componentDidMount() {
    this.props.fetchProduct();
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              onPress={() => this.props.navigation.openDrawer()}
              transparent
            >
              <Icon name="ios-menu" type="Ionicons" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content>
          <Text style={{ color: "red", fontSize: 30 }}>Flash Sale!</Text>
          {this.props.loading ? <Spinner /> : null}
          <FlatList
            data={this.props.content}
            renderItem={({ item }) => <DashboardContent item={item} />}
            numColumns={2}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, product }) => {
  return {
    auth,
    content: product.product.products,
    loading: product.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProduct: product => dispatch(fetchProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
