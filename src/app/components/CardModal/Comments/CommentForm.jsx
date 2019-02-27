import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import shortid from 'shortid';
import "./CommentForm.scss";

class CommentForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    cardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    };
  }

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitComment();
    }
  };

  submitComment = () => {
    const { commentText } = this.state;
    this.setState({ commentText: "" });
    const { dispatch, user, cardId } = this.props;
    const id = shortid.generate();

    dispatch({
      type: "ADD_COMMENT",
      payload: { commentText, user: user.name, cardId, id }
    });
  };

  handleSave = () => {
    this.submitComment();
  };

  textChanged = event => {
    this.setState({
      commentText: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <p id="headline">Add comment</p>
        <textarea
          value={this.state.commentText}
          onChange={this.textChanged}
          onKeyDown={this.handleKeyDown}
          className="modal-textarea"
          id="comment-input"
        />
        <div className="comment-form-buttons">
          <button onClick={this.handleSave} className="comment-save-button">
            Comment
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(CommentForm);
