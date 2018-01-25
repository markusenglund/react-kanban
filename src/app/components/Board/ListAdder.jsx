import React, { Component } from "react";
import { connect } from "react-redux";

// type Props = {
//   lists: Array<{ id: string }>,
//   boardTitle: string,
//   boardId: string,
//   dispatch: ({ type: string }) => void
// };

class ListAdder extends Component {
  constructor() {
    super();
    this.state = {
      isListInEdit: false
    };
  }
  render = () => {
    const { isListInEdit } = this.state;
    if (!isListInEdit) {
      return (
        <button
          onClick={() => this.setState({ isListInEdit: true })}
          className="add-list-button"
        >
          Add a list...
        </button>
      );
    }
    return <div className="list">Do the thing</div>;
  };
}

export default connect()(ListAdder);
