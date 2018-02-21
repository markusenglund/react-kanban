import { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";

class ClickOutsideWrapper extends Component {
  static propTypes = {
    handleClickOutside: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
