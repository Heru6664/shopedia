import { ADD_WISHLIST_ITEM } from "./constant/wishlist";
import { updateLike } from "./detail";
import { updateProductLike } from "./product";

const addItemToWishlist = item => ({
  type: ADD_WISHLIST_ITEM,
  payload: item
});

export const addWishlist = data => dispatch => {
  dispatch(addItemToWishlist(data));
  dispatch(updateLike(data));
  dispatch(updateProductLike(data));
};
