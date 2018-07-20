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
  Spinner,
  View
} from "native-base";
import styles from "./styles/MainScreen";
import { FlatList } from "react-native";
import DashboardContent from "../../assets/components/DashboardContent";
import { fetchProduct } from "../../actions/product";
import { getDetail } from "../../actions/detail";
import Loading from "../../assets/components/Loading";

class MainScreen extends Component {
  componentDidMount() {
    this.props.fetchProduct();
  }

  pressProduct = item => {
    this.props.getDetail(item);
    this.props.navigation.navigate("ProductDesc");
  };

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
          <View style={styles.loadingContainer}>
            {this.props.loading ? (
              <Loading style={{ width: 45, height: 45 }} />
            ) : null}
          </View>
          <FlatList
            data={this.props.content}
            renderItem={({ item }) => (
              <DashboardContent pressProduct={this.pressProduct} item={item} />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, product }) => {
  return {
    auth,
    content: product.product,
    loading: product.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProduct: product => dispatch(fetchProduct(product)),
  getDetail: detail => dispatch(getDetail(detail))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
