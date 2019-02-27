import moment from 'moment';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import FaTrash from "react-icons/lib/fa/trash";
import PropTypes from "prop-types";
import formatMarkdown from "../../Card/formatMarkdown";
import "./Comment.scss";

class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  dateFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  deleteComment = () => {
    const { dispatch, id, cardId } = this.props;
    dispatch({
      type: "DELETE_COMMENT",
      payload: { commentId: id, cardId }
    });
  };

  render() {
    moment.locale('he');
    const { text, user, date } = this.props;
    return (
      <div id="container">
        <div id="comment-container">
          <div id="header">
            <p id="user">{user}</p>
            <p id="date">{moment(new Date(date)).fromNow()}</p>
          </div>
          <div id="comment-text"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(text)
            }}
          />
        </div>
        <div id="delete-container">
          <Wrapper
            className="delete-comment-wrapper"
            onSelection={this.deleteComment}
          >
            <Button className="delete-comment-button">
              <FaTrash />
            </Button>
            <Menu className="delete-comment-menu">
              <div className="delete-comment-header">Are you sure?</div>
              <MenuItem className="delete-comment-confirm">Delete</MenuItem>
            </Menu>
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default connect()(Comment);
