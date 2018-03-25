import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import FaTwitter from "react-icons/lib/fa/twitter";
import FaUserSecret from "react-icons/lib/fa/user-secret";
import googleLogo from "../../../assets/images/google-logo.svg";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
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
        <title>Sign in | React Kanban</title>
      </Helmet>
      <div className="landing-page-info-wrapper">
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <img
              src={kanbanLogo}
              alt="React Kanban logo"
              className="landing-page-logo"
            />
            &nbsp;
            <h1>React Kanban</h1>
          </div>
          <h2 className="landing-page-description">
            An open source kanban application built with React and Redux
          </h2>
          <div className="signin-buttons">
            <div>
              <a href="/auth/twitter" className="signin-button twitter-button">
                <FaTwitter className="logo-icon" /> &nbsp;Sign in with Twitter
              </a>
            </div>
            <div>
              <a href="/auth/google" className="signin-button google-button">
                <img
                  className="google-logo"
                  src={googleLogo}
                  alt="google logo"
                />
                &nbsp;Sign in with Google
              </a>
            </div>
            <div className="guest-button-wrapper">
              <button
                onClick={this.enterAsGuest}
                className="signin-button guest-button"
              >
                <FaUserSecret className="logo-icon" /> &nbsp;Enter as guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(LandingPage);
