// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import trelloLogo from "../../assets/images/trello-logo.png";
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
        <Link to="/">
          <img src={trelloLogo} alt="Trello logo" className="profile-image" />
        </Link>
        <Wrapper className="dropdown-wrapper">
          <Button className="dropdown-button">
            <img src={imageUrl} alt={name} />
            &#9662;
          </Button>
          <Menu className="dropdown-menu">
            {name}
            <br />
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
