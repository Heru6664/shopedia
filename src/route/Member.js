import React from "react";
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerActions
} from "react-navigation";
import Sidebar from "../assets/components/Sidebar";
import Category from "../screen/app/Category";
import ProductDesc from "../screen/app/ProductDesc";
import Wishlist from "../screen/app/Wishlist";
import Login from "../screen/authentication/Login";
import MainScreen from "../screen/authentication/MainScreen";
import Cart from "../screen/order/Cart";
import Checkout from "../screen/order/Checkout";
import Details from "../screen/order/Details";
import Review from "../screen/order/Review";
import AddAddress from "../screen/user/AddAddress";
import Address from "../screen/user/Address";
import EditAddress from "../screen/user/EditAddress";
import EditProfile from "../screen/user/EditProfile";
import Profile from "../screen/user/Profile";
import SettingAccount from "../screen/user/SettingAccount";

const navigation = createStackNavigator(
  {
    AddAddress: AddAddress,
    EditAddress: EditAddress,
    EditProfile: EditProfile,
    Address: Address,
    MainScreen: MainScreen,
    Login: Login,
    Profile: Profile,
    Cart: Cart,
    Wishlist: Wishlist,
    ProductDesc: ProductDesc,
    Review: Review,
    Checkout: Checkout,
    Details: Details,
    Category: Category,
    SettingAccount: SettingAccount
  },
  {
    headerMode: "none",
    initialRouteName: "Category"
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
