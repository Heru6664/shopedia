import { ADD_ITEM_TO_CART } from "./constant/cart";

export const addItemCart = item => ({
  type: ADD_ITEM_TO_CART,
  payload: item
});

// export const addCart = data => dispatch => {
//   dispatch(addItemCart(data));
// };
