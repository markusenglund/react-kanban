// @flow
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FaTwitter from "react-icons/lib/fa/twitter";
import "./LandingPage.scss";

class LandingPage extends Component<{}> {
  render = () => {
    return (
      <div className="landing-page">
        <Helmet>
          <title>Landing page | Trello</title>
        </Helmet>
        <div className="landing-page-text">
          <h1>OpenBoard (logo here)</h1>
          <h2>
            Tagline about what it is and how it&#39;s open source and great etc
            etc.
          </h2>
          <a href="/auth/twitter" className="signin-button">
            <FaTwitter style={{ fontSize: "30px" }} /> Sign in with Twitter
          </a>
        </div>
      </div>
    );
  };
}

export default LandingPage;
