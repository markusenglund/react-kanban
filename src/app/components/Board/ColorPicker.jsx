import React, { Component } from "react";
import { connect } from "react-redux";

class ColorPicker extends Component {
  render() {
    const { background } = this.props;
    return (
      <div className="color-picker">
        <div>Color:</div>
        <div style={{ background }}>asdf</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps;
  return {
    background: state.boardsById[boardId].background || "#032"
  };
};

export default connect(mapStateToProps)(ColorPicker);
