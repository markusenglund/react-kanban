import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import "./UserDropdown.scss";

class UserDropdown extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    }).isRequired
  };
  render = () => {
    const { name, imageUrl } = this.props.user;
    return (
      <Wrapper className="user-dropdown-wrapper">
        <Button className="user-dropdown-button">
          <img src={imageUrl} alt={name} />
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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(UserDropdown);
