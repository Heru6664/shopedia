import { combineReducers } from "redux";

import auth from "./auth";
import product from "./product";
import detail from "./detail";
import wishlist from "./wishlist";

const app = combineReducers({
  auth,
  product,
  detail,
  wishlist
});

export default app;
