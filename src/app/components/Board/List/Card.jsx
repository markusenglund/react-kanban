import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import marked from "marked";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

class Card extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    deleteCard: PropTypes.func.isRequired,
    toggleCardEditor: PropTypes.func.isRequired
  };

  render() {
    const { card, index, i, deleteCard, toggleCardEditor } = this.props;
    console.log("CARD", this.props);
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div>
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <div
              className={classnames("card-title", {
                "card-title-drag": snapshot.isDragging
              })}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              data-react-beautiful-dnd-draggable={i}
              data-react-beautiful-dnd-drag-handle={i}
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
              <button onClick={deleteCard} className="delete-card-button">
                <FaTimesCircle />
              </button>
              <button onClick={toggleCardEditor} className="edit-card-button">
                <FaPencil />
              </button>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
