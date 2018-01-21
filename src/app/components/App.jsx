import React from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Topics from "./Topics";
import "./App.scss";

const App = () => (
  <>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/topics" component={Topics} />
  </>
);

export default App;
