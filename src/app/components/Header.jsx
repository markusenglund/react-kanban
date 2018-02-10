import React, { Component } from "react";
import { Link } from "react-router-dom";
import trelloLogo from "../../assets/images/trello-logo.png";

class Header extends Component {
  render = () => (
    <header style={{ background: "#026aa7", padding: 5 }}>
      <Link to="/">
        <img src={trelloLogo} alt="Trello logo" />
      </Link>
    </header>
  );
}

export default Header;
