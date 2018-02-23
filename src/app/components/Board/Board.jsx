import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import classnames from "classnames";
import List from "./List/List";
import ListAdder from "./ListAdder/ListAdder";
import Header from "../Header/Header";
import BoardHeader from "./BoardHeader/BoardHeader";
import "./Board.scss";

class Board extends Component {
  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({ _id: PropTypes.string.isRequired })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      startX: null,
      startScrollX: null
    };
  }

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "REORDER_LISTS",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: source.droppableId
          }
        });
      }
      return;
    }
    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "REORDER_CARDS",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
          boardId
        }
      });
    }
  };

  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== "list-wrapper") return;
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollX: window.scrollX
    });
  };

  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = this.state;
    const scrollLeft = startScrollX - clientX + startX;
    window.scroll(scrollLeft, 0);
    if (scrollLeft !== window.scrollX) {
      this.setState({
        startX: clientX + window.scrollX - startScrollX
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.startX) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };
  render = () => {
    const { lists, boardTitle, boardId, boardColor } = this.props;
    return (
      <div className={classnames("board-wrapper", boardColor)}>
        <div className="board">
          <Helmet>
            <title>{boardTitle} | kanban.live</title>
          </Helmet>
          <Header />
          <BoardHeader />
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <div
              // ref={el => {
              //   this.backgroundEl = el;
              // }}
              className="lists-wrapper"
              onMouseDown={this.handleMouseDown}
            >
              {/* eslint-enable jsx-a11y/no-static-element-interactions */}
              <Droppable
                droppableId={boardId}
                type="COLUMN"
                direction="horizontal"
              >
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {lists.map((list, index) => (
                      <List
                        list={list}
                        boardId={boardId}
                        index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                    <ListAdder boardId={boardId} />
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boardsById[boardId];
  return {
    lists: board.lists.map(listId => state.listsById[listId]),
    boardTitle: board.title,
    boardColor: board.color,
    boardId
  };
};

export default connect(mapStateToProps)(Board);
