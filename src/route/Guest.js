import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";

import Sidebar from "../assets/components/Sidebar";
import MainScreen from "../screen/authentication/MainScreen";
import Login from "../screen/authentication/Login";
import ProductDesc from "../screen/app/ProductDesc";
import Cart from "../screen/order/Cart";
import Order from "../screen/order/Index";

const navigation = createStackNavigator(
  {
    MainScreen: MainScreen,
    Login: Login,
    Cart: Cart,
    Order: Order,
    ProductDesc: ProductDesc
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
