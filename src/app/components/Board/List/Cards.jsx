import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
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
    console.log("CARDS", this.props);
    return (
      <Droppable droppableId={listId}>
        {provided => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((cardId, index) => (
                <CardWrapper
                  key={cardId}
                  cardId={cardId}
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

const mapStateToProps = (state, ownProps) => ({
  cards: state.listsById[ownProps.listId].cards
});

export default connect(mapStateToProps)(Cards);
