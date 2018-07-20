import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import app from "../reducers/index";

const store = createStore(app, composeWithDevTools(applyMiddleware(thunk)));

export { store };
