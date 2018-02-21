import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import ListTitle from "./ListTitle";
import Cards from "./Cards";

class List extends Component {
  static propTypes = {
    i: PropTypes.number.isRequired,
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    cards: PropTypes.arrayOf(PropTypes.object)
  };

  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false
    };
  }

  toggleCardComposer = () =>
    this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

  render = () => {
    const { cards, list, boardId, i, index } = this.props;
    const { cardComposerIsOpen } = this.state;
    return (
      <Draggable
        draggableId={list._id}
        index={index}
        disableInteractiveElementBlocking
      >
        {provided => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              data-react-beautiful-dnd-draggable={i}
              className="list-wrapper"
            >
              <div className="list">
                <ListTitle
                  dragHandleProps={provided.dragHandleProps}
                  i={i}
                  listTitle={list.title}
                  listId={list._id}
                  cards={list.cards}
                  boardId={boardId}
                />
                <div className="cards-wrapper">
                  <Cards
                    listId={list._id}
                    cards={cards}
                    cardComposerIsOpen={cardComposerIsOpen}
                    toggleCardComposer={this.toggleCardComposer}
                    i={i}
                    boardId={boardId}
                  />
                </div>
                {cardComposerIsOpen || (
                  <button
                    onClick={this.toggleCardComposer}
                    className="open-composer-button"
                  >
                    Add a card...
                  </button>
                )}
              </div>
            </div>
            {provided.placeholder}
          </>
        )}
      </Draggable>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
