import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import marked from "marked";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import CardEditor from "./CardEditor";
import "./Card.scss";

class Card extends Component {
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
    const { card, index, listId, boardId } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={ref => {
                this.ref = ref;
              }}
            >
              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
              <div
                className={classnames("card-title", {
                  "card-title-drag": snapshot.isDragging
                })}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {/* eslint-enable */}
                {/* eslint-disable react/no-danger */}
                <div
                  className="card-title-html"
                  dangerouslySetInnerHTML={{
                    __html: marked(card.title, { sanitize: true })
                  }}
                />
                {/* eslint-enable */}
                <button
                  onClick={this.deleteCard}
                  className="delete-card-button"
                >
                  <FaTimesCircle />
                </button>
                <button
                  onClick={this.toggleCardEditor}
                  className="edit-card-button"
                >
                  <FaPencil />
                </button>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
        {isOpen && (
          <CardEditor
            boundingRect={this.ref.getBoundingClientRect()}
            card={card}
            listId={listId}
            boardId={boardId}
            toggleCardEditor={this.toggleCardEditor}
            deleteCard={this.deleteCard}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
