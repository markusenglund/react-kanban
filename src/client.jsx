// Required polyfills
import "core-js/fn/array/values";
import "core-js/fn/object/values";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import reducers from "./app/reducers/reducers";
import persistMiddleware from "./app/middleware/persistMiddleware";
import App from "./app/components/App";

// Hydrate redux state received from the server
const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  composeWithDevTools(applyMiddleware(persistMiddleware))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
