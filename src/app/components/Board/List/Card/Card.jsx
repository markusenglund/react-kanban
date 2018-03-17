import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import marked from "marked";
import CardEditor from "./CardEditor";
import CardDetails from "./CardDetails";
import "./Card.scss";

function formatMarkdown(markdown) {
  return marked(markdown, { sanitize: true, gfm: true })
    .replace(/<a/g, '<a target="_blank"')
    .replace(
      /<li>\[\s\]/g,
      '<li class="check-box"><input onclick="return false" type="checkbox">'
    )
    .replace(
      /<li>\[x\]/g,
      '<li class="check-box"><input checked onclick="return false" type="checkbox">'
    );
}

class Card extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string
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

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== "a") {
      event.preventDefault();
      this.toggleCardEditor();
    }
  };

  render() {
    const { card, index, listId, boardId, isDraggingOver } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <>
              {/* eslint-disable */}
              <div
                className={classnames("card-title", {
                  "card-title--drag": snapshot.isDragging
                })}
                ref={ref => {
                  provided.innerRef(ref);
                  this.ref = ref;
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={event => {
                  provided.dragHandleProps.onClick(event);
                  if (event.target.tagName.toLowerCase() !== "a") {
                    this.toggleCardEditor(event);
                  }
                }}
                onKeyDown={event => {
                  provided.dragHandleProps.onKeyDown(event);
                  this.handleKeyDown(event);
                }}
                style={{
                  ...provided.draggableProps.style,
                  background: card.color
                }}
              >
                <div
                  className="card-title-html"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(card.title)
                  }}
                />
                {/* eslint-enable */}
                {card.date && <CardDetails date={card.date} />}
              </div>
              {isDraggingOver && provided.placeholder}
            </>
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
