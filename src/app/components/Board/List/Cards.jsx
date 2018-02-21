import React, { Component } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import CardComposer from "./CardComposer";
import CardWrapper from "./CardWrapper";

class Cards extends Component {
  static propTypes = {
    i: PropTypes.number.isRequired,
    boardId: PropTypes.string.isRequired,
    cardComposerIsOpen: PropTypes.bool.isRequired,
    toggleCardComposer: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const {
      listId,
      cards,
      i,
      cardComposerIsOpen,
      toggleCardComposer,
      boardId
    } = this.props;
    return (
      <Droppable droppableId={listId}>
        {provided => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((card, index) => (
                <CardWrapper
                  key={card._id}
                  card={card}
                  index={index}
                  i={i}
                  listId={listId}
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
              <div style={{ padding: "6px" }} />
              <CardComposer
                isOpen={cardComposerIsOpen}
                toggleCardComposer={toggleCardComposer}
                boardId={boardId}
                listId={listId}
              />
            </div>
          </>
        )}
      </Droppable>
    );
  }
}

export default Cards;
