import { combineReducers } from "redux";

import auth from "./auth";
import product from "./product";
import detail from "./detail";

const app = combineReducers({
  auth,
  product,
  detail
});

export default app;
