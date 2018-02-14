// @flow
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

type Props = {
  card: { _id: string, title: string },
  index: number,
  i: number,
  deleteCard: () => void,
  openCardEditor: () => void
};

class Card extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isDragging: false
    };
  }

  render() {
    const { card, index, i, deleteCard, openCardEditor } = this.props;
    return (
      <Draggable draggableId={card._id} index={index}>
        {({
          innerRef,
          draggableProps,
          dragHandleProps: handleProps,
          placeholder
        }) => (
          <div>
            <div
              className="card-title"
              ref={innerRef}
              {...draggableProps}
              {...handleProps}
              onMouseDown={event => {
                handleProps.onMouseDown(event);
                console.log("itsw rtokgin");
                // do shit
              }}
              data-react-beautiful-dnd-draggable={i}
              data-react-beautiful-dnd-drag-handle={i}
            >
              <span>{card.title}</span>
              <button
                onClick={() => deleteCard(card._id)}
                className="delete-card-button"
              >
                <FaTimesCircle />
              </button>
              <button
                onClick={() => openCardEditor(card)}
                className="edit-card-button"
              >
                <FaPencil />
              </button>
            </div>
            {placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
