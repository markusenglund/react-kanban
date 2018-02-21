import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class ClickOutsideWrapper extends Component {
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
