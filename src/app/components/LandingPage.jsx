// @flow
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class LandingPage extends Component<{}> {
  render = () => {
    return (
      <div className="landing-page">
        <Helmet>
          <title>Landing page | Trello</title>
        </Helmet>
        <div className="landing-page-text">
          <h1>OpenBoard</h1>
          <h2>Tagline about how it&#39;s open source and great etc etc.</h2>
        </div>
      </div>
    );
  };
}

export default LandingPage;
