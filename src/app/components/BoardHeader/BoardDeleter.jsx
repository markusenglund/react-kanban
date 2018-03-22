import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import FaTrash from "react-icons/lib/fa/trash";
import "./BoardDeleter.scss";

class BoardDeleter extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelection = () => {
    const { dispatch, match, history } = this.props;
    const { boardId } = match.params;
    dispatch({ type: "DELETE_BOARD", payload: { boardId } });
    history.push("/");
  };

  render = () => (
    <Wrapper
      className="board-deleter-wrapper"
      onSelection={this.handleSelection}
    >
      <Button className="board-deleter-button">
        <div className="modal-icon">
          <FaTrash />
        </div>
        <div className="board-header-right-text">&nbsp;Delete board</div>
      </Button>
      <Menu className="board-deleter-menu">
        <div className="board-deleter-header">Are you sure?</div>
        <MenuItem className="board-deleter-confirm">Delete</MenuItem>
      </Menu>
    </Wrapper>
  );
}

export default withRouter(connect()(BoardDeleter));
