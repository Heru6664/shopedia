import {
  ADD_SHOPPING_ITEM,
  ADD_ITEM_PRICE,
  ADD_SELLER_NOTE
} from "../actions/constant/order";

const initialState = {
  item: [],
  amount: 0,
  note: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHOPPING_ITEM:
      return {
        ...state,
        item: action.payload
      };
    case ADD_ITEM_PRICE:
      return {
        ...state,
        amount: action.payload
      };
    case ADD_SELLER_NOTE:
      return {
        ...state,
        note: action.payload
      };
    default:
      return state;
  }
};
