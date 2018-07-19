import React from "react";
import App from "./src";
import { store } from "./src/store/index";
import { Provider } from "react-redux";

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
