// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Home from "./Home";
import Board from "./Board/Board";
import LandingPage from "./LandingPage";
import "./App.scss";

const App = ({ user }) => {
  if (user) {
    return (
      <>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/b/:boardId" component={Board} />
      </>
    );
  }
  return (
    <>
      <Route path="/" component={LandingPage} />
      <Redirect to="/" />
    </>
  );
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(App);
