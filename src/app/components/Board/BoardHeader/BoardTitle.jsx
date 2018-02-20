// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

type Props = {};

class BoardTitle extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  submitTitle = () => {
    const { dispatch, boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === "") return;
    if (boardTitle !== newTitle) {
      dispatch({
        type: "EDIT_BOARD_TITLE",
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ newTitle: boardTitle, isOpen: false });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitTitle();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { boardTitle } = this.props;
    return (
      <div className="board-title-wrapper">
        {isOpen ? (
          <input
            autoFocus
            value={newTitle}
            type="text"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onBlur={this.revertTitle}
            className="board-title-input"
            spellCheck={false}
          />
        ) : (
          <button className="board-title-button" onClick={this.handleClick}>
            <h1 className="board-title">{boardTitle}</h1>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    boardId
  };
};

export default withRouter(connect(mapStateToProps)(BoardTitle));
