import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home/Home";
import BoardContainer from "./Board/BoardContainer";
import LandingPage from "./LandingPage/LandingPage";
import "./App.scss";

const App = ({ user, isGuest }) => {
  if (user || isGuest) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/b/:boardId" component={BoardContainer} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );
};

App.propTypes = { user: PropTypes.object, isGuest: PropTypes.bool.isRequired };

const mapStateToProps = state => ({ user: state.user, isGuest: state.isGuest });

export default withRouter(connect(mapStateToProps)(App));
