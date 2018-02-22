import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
import "./Header.scss";

class Header extends Component {
  render = () => (
    <div className="header-wrapper">
      <header>
        <Link to="/" className="header-title">
          <img src={kanbanLogo} alt="kanban live logo" />
          &nbsp;kanban.live
        </Link>
        <UserDropdown />
      </header>
    </div>
  );
}

export default Header;
