import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import CardComposer from "./CardComposer/CardComposer";
import Card from "./Card/Card";

class Cards extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    cardComposerIsOpen: PropTypes.bool.isRequired,
    toggleCardComposer: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const {
      listId,
      cards,
      cardComposerIsOpen,
      toggleCardComposer,
      boardId
    } = this.props;
    return (
      <Droppable droppableId={listId}>
        {(provided, { isDraggingOver }) => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((cardId, index) => (
                <Card
                  isDraggingOver={isDraggingOver}
                  key={cardId}
                  cardId={cardId}
                  index={index}
                  listId={listId}
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
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

const mapStateToProps = (state, ownProps) => ({
  cards: state.listsById[ownProps.listId].cards
});

export default connect(mapStateToProps)(Cards);
