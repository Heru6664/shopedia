import { ADD_WISHLIST_ITEM } from "../actions/constant/wishlist";

const initialState = {
  wishlist: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    default:
      return state;
  }
};
