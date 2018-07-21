import { store } from "../store";
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "./constant/cart";

export const addItemCart = item => ({
  type: ADD_ITEM_TO_CART,
  payload: item
});

const remvItemFromCart = item => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: item
});

export const remvFromCart = item => dispatch => {
  const productID = store.getState().cart.cart;
  const index = productID.findIndex(data => item === data.id);

  dispatch(remvItemFromCart(index));
};
