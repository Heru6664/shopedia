import { combineReducers } from "redux";

import auth from "./auth";
import product from "./product";

const app = combineReducers({
  auth,
  product
});

export default app;
