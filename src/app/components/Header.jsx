import React, { Component } from "react";
import trelloLogo from "../../assets/images/trello-logo.png";

class Header extends Component {
  render = () => (
    <header style={{ background: "#026aa7", padding: 5 }}>
      <img src={trelloLogo} alt="Trello logo" />
    </header>
  );
}

export default Header;
