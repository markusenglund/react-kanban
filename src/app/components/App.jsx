import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import Topics from "./Topics";
import "./App.scss";

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
    <hr />
    <Route exact path="/" component={Home} />
    <Route path="/topics" component={Topics} />
  </div>
);

export default App;
