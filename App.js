import React from "react";
import App from "./src";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/index";

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
