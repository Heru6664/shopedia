import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART
} from "../actions/constant/cart";

const initialState = {
  cart: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, total: 1 }]
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        cart: [
          ...state.cart.slice(0, action.payload),
          ...state.cart.slice(action.payload + 1)
        ]
      };
    default:
      return state;
  }
};
