import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import gandalfGif from "../assets/gandalf.gif";

class Home extends Component {
  render = () => (
    <div>
      <Helmet>
        <title>Home | Trello</title>
      </Helmet>
      <img src={gandalfGif} alt="laughing gandalf" />
      <Link to="b/abc123">The best board</Link>
    </div>
  );
}

export default Home;
