import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "./Card";
import CardEditor from "./CardEditor";
import "./Card.scss";

class CardWrapper extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired,
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  toggleCardEditor = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  deleteCard = () => {
    const { dispatch, listId, boardId, card } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId, boardId }
    });
  };

  render() {
    const { card, listId, boardId, index } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Card
          key={card._id}
          card={card}
          index={index}
          deleteCard={this.deleteCard}
          toggleCardEditor={this.toggleCardEditor}
        />
        <CardEditor
          isOpen={isOpen}
          card={card}
          listId={listId}
          boardId={boardId}
          toggleCardEditor={this.toggleCardEditor}
          deleteCard={this.deleteCard}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(CardWrapper);
