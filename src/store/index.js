import app from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(app, composeWithDevTools(applyMiddleware(thunk)));

export { store };
