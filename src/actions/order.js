import {
  ADD_SHOPPING_ITEM,
  ADD_ITEM_PRICE,
  ADD_SELLER_NOTE,
  ADD_PAYMENT_METHOD
} from "./constant/order";

export const addShoppingItem = item => ({
  type: ADD_SHOPPING_ITEM,
  payload: item
});

export const addItemPrice = price => ({
  type: ADD_ITEM_PRICE,
  payload: price
});

export const addSellerNote = note => ({
  type: ADD_SELLER_NOTE,
  payload: note
});

export const addPaymentMethod = method => ({
  type: ADD_PAYMENT_METHOD,
  payload: method
});
