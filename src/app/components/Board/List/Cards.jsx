import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card/Card";

class Cards extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    if (
      this.props.cards[this.props.cards.length - 1] !==
      prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { listId, cards, boardId } = this.props;
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
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.listEnd = el;
                }}
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
