import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

class Comments extends Component {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cardId } = this.props;
    return (
      <div className="container">
        <CommentForm cardId={cardId}/>
        <CommentsList cardId={cardId}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Comments);
