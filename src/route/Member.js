import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";

import Sidebar from "../components/Sidebar";
import MainScreen from "../screen/authentication/MainScreen";
import Login from "../screen/authentication/Login";
import Profile from "../screen/app/Profile";

const navigation = createStackNavigator(
  {
    MainScreen: MainScreen,
    Login: Login,
    Profile: Profile
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
