import { ADD_ITEM_TO_CART } from "../actions/constant/cart";

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

    default:
      return state;
  }
};
