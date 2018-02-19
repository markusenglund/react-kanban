import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";

class ColorPicker extends Component {
  handleSelection = color => {
    const { dispatch, boardId, boardColor } = this.props;
    // Prevent update if selected color is the same as current board color.
    if (color.name !== boardColor.name) {
      dispatch({ type: "CHANGE_BOARD_COLOR", payload: { boardId, color } });
    }
  };

  render() {
    const { boardColor } = this.props;
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
      <Wrapper
        className="color-picker-wrapper"
        onSelection={this.handleSelection}
      >
        <Button className="color-picker">Color&nbsp;&#9662;</Button>
        <Menu className="color-picker-menu">
          {colors.map(color => (
            <MenuItem
              value={color}
              className="color-picker-item"
              style={{ background: color.light }}
              key={color.name}
            >
              {color.name}
              {color.name === boardColor.name && <div>Checkmark</div>}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps;
  return {
    boardColor: state.boardsById[boardId].color || {}
  };
};

export default connect(mapStateToProps)(ColorPicker);
