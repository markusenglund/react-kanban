// @flow
import * as React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import Board from "./Board/Board";
import LandingPage from "./LandingPage";
import "./App.scss";

type Props = {
  user: { _id: string, name: string, imageUrl: string }
};

const App = ({ user }: Props) => {
  if (user) {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/b/:boardId" component={Board} />
      </>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );
};

const mapStateToProps = state => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(App));
