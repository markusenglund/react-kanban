import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import FaUserSecret from "react-icons/lib/fa/user-secret";
import "./UserDropdown.scss";

class UserDropdown extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.element.isRequired
  };
  render = () => {
    const { name, thumbnail } = this.props;
    return (
      <Wrapper className="user-dropdown-wrapper">
        <Button className="user-dropdown-button">
          {thumbnail}
          &#9662;
        </Button>
        <Menu className="user-dropdown-menu">
          <div className="user-dropdown-header">{name}</div>
          <hr />
          <MenuItem
            tag="a"
            rel="noopener noreferrer"
            href="/auth/signout"
            className="user-dropdown-item"
          >
            Sign out
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  };
}

const mapStateToProps = ({ user }) => ({
  name: user ? user.name : "Guest",
  thumbnail: user ? (
    <img src={user.imageUrl} alt={user.name} />
  ) : (
    <FaUserSecret style={{ fontSize: 26 }} />
  )
});

export default connect(mapStateToProps)(UserDropdown);
