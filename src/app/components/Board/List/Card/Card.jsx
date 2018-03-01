import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import marked from "marked";
import FaPencil from "react-icons/lib/fa/pencil";
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
    isDraggingOver: PropTypes.bool.isRequired,
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

  render() {
    const { card, index, listId, boardId, isDraggingOver } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div>
              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
              <div
                className={classnames("card-title", {
                  "card-title-drag": snapshot.isDragging
                })}
                ref={ref => {
                  provided.innerRef(ref);
                  this.ref = ref;
                }}
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
                  onClick={this.toggleCardEditor}
                  className="edit-card-button"
                >
                  <FaPencil />
                </button>
              </div>
              {isDraggingOver && provided.placeholder}
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
