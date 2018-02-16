// @flow
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import marked from "marked";
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
  render() {
    const { card, index, i, deleteCard, openCardEditor } = this.props;
    return (
      <Draggable draggableId={card._id} index={index}>
        {(
          {
            innerRef,
            draggableProps,
            dragHandleProps: handleProps,
            placeholder
          },
          { isDragging }
        ) => (
          <div>
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <div
              className={classnames("card-title", {
                "card-title-drag": isDragging
              })}
              ref={innerRef}
              {...draggableProps}
              {...handleProps}
              data-react-beautiful-dnd-draggable={i}
              data-react-beautiful-dnd-drag-handle={i}
            >
              {/* eslint-enable */}
              <div
                className="card-title-html"
                dangerouslySetInnerHTML={{
                  __html: marked(card.title, { sanitize: true })
                }}
              />
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
