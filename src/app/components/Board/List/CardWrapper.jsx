import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Card from "./Card";

class CardWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: props.card.title,
      isOpen: false
    };
  }

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  toggleCardEditor = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { newTitle } = this.state;
    const { card, listId, boardId, dispatch } = this.props;
    if (newTitle === "") {
      this.deleteCard();
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
    this.setState({ isOpen: false });
  };

  deleteCard = () => {
    const { dispatch, listId, boardId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId, boardId }
    });
  };

  render() {
    const { card, index, i } = this.props;
    const { isOpen, newTitle } = this.state;
    return !isOpen ? (
      <Card
        key={card._id}
        card={card}
        index={index}
        i={i}
        deleteCard={this.deleteCard}
        toggleCardEditor={this.toggleCardEditor}
      />
    ) : (
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
    );
  }
}

export default connect()(CardWrapper);
