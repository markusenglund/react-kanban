import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import reducers from "./app/reducers/reducers";
import App from "./app/components/App";

const preloadedState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  devToolsEnhancer()
);
const render = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("app")
  );
};

render();
