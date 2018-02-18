import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";

class ColorPicker extends Component {
  render() {
    const { background } = this.props;
    const colors = [
      {
        name: "green",
        primary: "#032",
        light: "#143",
        transparent: "rgba(80, 100, 90, 0.55)"
      },
      {
        name: "blue",
        primary: "#024",
        light: "#135",
        transparent: "rgba(80, 90, 100, 0.55)"
      }
    ];
    return (
      <Wrapper className="color-picker-wrapper">
        <Button className="color-picker">Color&nbsp;&#9662;</Button>
        <Menu className="color-picker-menu">
          {colors.map(color => (
            <MenuItem
              className="color-picker-item"
              style={{ background: color.light }}
            />
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps;
  return {
    background: state.boardsById[boardId].background || "#143"
  };
};

export default connect(mapStateToProps)(ColorPicker);
