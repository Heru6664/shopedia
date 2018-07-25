import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import app from "../reducers/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "wishlist", "order"]
};

const pReducers = persistReducer(persistConfig, app);

const store = createStore(
  pReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
