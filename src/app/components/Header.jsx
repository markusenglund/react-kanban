// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import "./Header.scss";

type Props = {
  user: {
    name: string,
    imageUrl: string
  }
};

class Header extends Component<Props> {
  render = () => {
    const { name, imageUrl } = this.props.user;
    return (
      <header>
        <Link to="/" className="header-title">
          kanban live
        </Link>
        <Wrapper className="dropdown-wrapper">
          <Button className="dropdown-button">
            <img src={imageUrl} alt={name} />
            &#9662;
          </Button>
          <Menu className="dropdown-menu">
            <div className="dropdown-header">{name}</div>
            <hr />
            <MenuItem
              tag="a"
              rel="noopener noreferrer"
              href="/auth/signout"
              className="dropdown-item"
            >
              Sign out
            </MenuItem>
          </Menu>
        </Wrapper>
      </header>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
