// @flow
import * as React from "react";
import onClickOutside from "react-onclickoutside";

type Props = {
  handleClickOutside: () => void,
  children: React.Node
};

class ClickOutsideWrapper extends React.Component<Props> {
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
