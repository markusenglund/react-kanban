import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import App from "../app/components/App";
import reducers from "../app/reducers/reducers";

export default function renderPage(req, res) {
  const store = createStore(
    combineReducers(reducers),
    req.initialState,
    applyMiddleware(thunk)
  );
  const context = {};

  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const preloadedState = store.getState();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="An open source kanban application created with React and Redux. ">
        <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="stylesheet" href="/static/bundle.css">
        ${helmet.title.toString()}
      </head>
      <body>
        <div id="app">${appString}</div>
      </body>
      <script>
        window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
      </script>
      <script src="/static/bundle.js"></script>
    </html>
  `;
  res.send(html);
}
