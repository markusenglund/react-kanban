import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import { FaSignOutAlt as FaSignOut } from "react-icons/fa";
import { FaSignInAlt as FaSignIn } from "react-icons/fa";
import kanbanLogo from "../../../assets/images/kanban-logo.svg";
import "./Header.scss";

class Header extends Component {
  static propTypes = { user: PropTypes.object };
  render = () => {
    const { user } = this.props;
    return (
      <header>
        <Link to="/" className="header-title">
          <img src={kanbanLogo} alt="React Kanban logo" />
          &nbsp;React Kanban
        </Link>
        <div className="header-right-side">
          {user ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="user-thumbnail"
              title={user.name}
            />
          ) : (
            <FaUserSecret className="guest-icon" />
          )}
          {user ? (
            <a className="signout-link" href="/auth/signout">
              <FaSignOut className="signout-icon" />
              &nbsp;Sign out
            </a>
          ) : (
            <a className="signout-link" href="/">
              <FaSignIn className="signout-icon" />
              &nbsp;Sign in
            </a>
          )}
        </div>
      </header>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
