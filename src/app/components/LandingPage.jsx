import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import FaTwitter from "react-icons/lib/fa/twitter";
import FaUserSecret from "react-icons/lib/fa/user-secret";
import googleLogo from "../../assets/images/google-logo.svg";
import kanbanLogo from "../../assets/images/kanban-logo.svg";
import "./LandingPage.scss";

class LandingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  enterAsGuest = () => {
    this.props.dispatch({ type: "ENTER_AS_GUEST" });
  };

  render = () => (
    <div className="landing-page">
      <Helmet>
        <title>Sign in | kanban.live</title>
      </Helmet>
      <div className="landing-page-text">
        <div className="landing-page-heading">
          <img src={kanbanLogo} alt="kanban live logo" style={{ height: 50 }} />
          &nbsp;
          <h1>kanban.live</h1>
        </div>
        <h2>An open source kanban application built with React and Redux</h2>
        <div className="signin-buttons">
          <a href="/auth/twitter" className="signin-button twitter-button">
            <FaTwitter className="logo-icon" /> &nbsp;Sign in with Twitter
          </a>
          <a href="/auth/google" className="signin-button google-button">
            <img className="google-logo" src={googleLogo} alt="google logo" />
            &nbsp;Sign in with Google
          </a>
          <button
            onClick={this.enterAsGuest}
            className="signin-button guest-button"
          >
            <FaUserSecret className="logo-icon" /> &nbsp;Enter as guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect()(LandingPage);
