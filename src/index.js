import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/Index";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //middle ware code
    if (typeof action !== "function") console.log("ACTION_TYPE=", action.type);
    next(action);
  };

const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store);
ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
