import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import "./CommentsList.scss";

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    cardId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { comments, cardId } = this.props;
    return (
      <div className="container">
        {comments.map((comment, index) => (
          <Comment id={comment._id} cardId={cardId} key={index} date={comment.date} user={comment.user} text={comment.text} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {currentCardId} = state;
  const commentsIdArr = state.cardsById[currentCardId].comments || [];
  const keys = Object.keys(state.commentsById);
  const comments = [];
  keys.forEach(key => {
    const comment = state.commentsById[key];
    if(commentsIdArr.includes(comment._id)){
      comments.push(comment);
    }
  })
  return {comments};
};

export default connect(mapStateToProps)(CommentsList);
