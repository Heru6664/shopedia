import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";

import Sidebar from "../assets/components/Sidebar";
import MainScreen from "../screen/authentication/MainScreen";
import Login from "../screen/authentication/Login";
import Profile from "../screen/user/Profile";
import ProductDesc from "../screen/app/ProductDesc";
import Cart from "../screen/order/Cart";
import Wishlist from "../screen/app/Wishlist";
import Review from "../screen/order/Review";
import Checkout from "../screen/order/Checkout";
import Details from "../screen/order/Details";
import Category from "../screen/app/Category";

const navigation = createStackNavigator(
  {
    MainScreen: MainScreen,
    Login: Login,
    Profile: Profile,
    Cart: Cart,
    Wishlist: Wishlist,
    ProductDesc: ProductDesc,
    Review: Review,
    Checkout: Checkout,
    Details: Details,
    Category: Category
  },
  {
    headerMode: "none",
    initialRouteName: "MainScreen"
  }
);

const Root = createDrawerNavigator(
  {
    navigation: navigation
  },
  {
    contentComponent: props => {
      const navigate = route => {
        props.navigation.navigate(route);
        props.navigation.dispatch(DrawerActions.closeDrawer());
      };
      return <Sidebar handlePress={navigate} {...props} />;
    }
  }
);

export default Root;
