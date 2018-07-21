import { combineReducers } from "redux";

import auth from "./auth";
import product from "./product";
import detail from "./detail";
import wishlist from "./wishlist";
import cart from "./cart";

const app = combineReducers({
  auth,
  cart,
  product,
  detail,
  wishlist
});

export default app;
