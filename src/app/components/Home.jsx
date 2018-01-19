import React, { Component } from "react";
import { Helmet } from "react-helmet";
import gandalfGif from "../assets/gandalf.gif";

class Home extends Component {
  render = () => (
    <div>
      <Helmet>
        <title>Helmet homepage</title>
        <meta name="description" content="It's the homepage hallelujah" />
      </Helmet>
      <img src={gandalfGif} alt="laughing gandalf" />
    </div>
  );
}

export default Home;
