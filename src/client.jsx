import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import reducers from "./app/reducers/reducers";
import persistMiddleware from "./persistMiddleware";
import App from "./app/components/App";

const preloadedState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk, persistMiddleware))
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
