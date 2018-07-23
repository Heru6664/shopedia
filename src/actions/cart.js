import { store } from "../store";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  INC_TOTAL,
  DEC_TOTAL
} from "./constant/cart";

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

const incTotals = total => ({
  type: INC_TOTAL,
  payload: total
});

export const incTotal = inc => dispatch => {
  const id = store.getState().cart.cart;
  const index = id.findIndex(i => inc.id === i.id);

  dispatch(incTotals(index));
};

const decTotals = total => ({
  type: DEC_TOTAL,
  payload: total
});

export const decTotal = dec => dispatch => {
  const id = store.getState().cart.cart;
  const index = id.findIndex(i => dec.id === i.id);

  dispatch(decTotals(index));
};
