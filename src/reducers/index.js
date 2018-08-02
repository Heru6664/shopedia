import { combineReducers } from "redux";

import auth from "./auth";
import product from "./product";
import detail from "./detail";
import wishlist from "./wishlist";
import cart from "./cart";
import order from "./order";
import invoice from "./invoice";

const app = combineReducers({
  auth,
  order,
  cart,
  product,
  invoice,
  detail,
  wishlist
});

export default app;
