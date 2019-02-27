import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import "./Header.scss";
import { withTranslation } from "react-i18next";

class Header extends Component {
  static propTypes = { user: PropTypes.object };

  render = () => {
    const { user } = this.props;
    const debug = process.env.NODE_ENV === "development";
    let loginBtn = null;
    if (debug) {
      loginBtn = <LoginButton user={user} />;
    }

    return (
      <header>
        <div className="header-left-side">
          <Link to="/" className="header-title">
            <img src={kanbanLogo} alt="React Kanban logo" />
            &nbsp;AmanBoard 2
          </Link>
          <div className="header-search-bar">
            <SearchBar />
          </div>
          <div className="header-notification">
            <Notification />
          </div>
        </div>
        <div className="header-right-side">
          {user ? <p> {user.name} </p> : <p> </p>}
          {loginBtn}
        </div>
      </header>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withTranslation()(Header));
