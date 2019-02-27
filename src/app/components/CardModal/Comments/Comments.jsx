import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

class Comments extends Component {
  static propTypes = {
    showForm: PropTypes.bool.isRequired,
    cardId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cardId } = this.props;
    return (
      <div className="container">
        {this.props.showForm && <CommentForm cardId={cardId} />}
        {this.props.showForm && <CommentsList cardId={cardId} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Comments);
