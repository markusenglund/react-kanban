import React, { Component } from "react";
import { Link } from "react-router-dom";
import trelloLogo from "../../assets/images/trello-logo.png";

class Header extends Component {
  render = () => (
    <header>
      <Link to="/">
        <img src={trelloLogo} alt="Trello logo" />
      </Link>
      <a href="/auth/signout">Sign out</a>
    </header>
  );
}

export default Header;
