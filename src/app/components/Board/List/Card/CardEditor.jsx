import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";

class CardEditor extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    toggleCardEditor: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newTitle: props.card.title
    };
  }

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { newTitle } = this.state;
    const {
      card,
      listId,
      boardId,
      dispatch,
      toggleCardEditor,
      deleteCard
    } = this.props;
    if (newTitle === "") {
      deleteCard();
    } else if (newTitle !== card.title) {
      dispatch({
        type: "EDIT_CARD_TITLE",
        payload: {
          cardTitle: newTitle,
          cardId: card._id,
          listId,
          boardId
        }
      });
    }
    toggleCardEditor();
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  render() {
    const { newTitle } = this.state;
    const { card, isOpen } = this.props;
    return isOpen ? (
      <div key={card._id} className="textarea-wrapper">
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          value={newTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="list-textarea"
          onBlur={this.submitCard}
          spellCheck={false}
        />
      </div>
    ) : null;
  }
}

export default connect()(CardEditor);
