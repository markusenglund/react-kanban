// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import ListAdder from "./ListAdder";
import Header from "../Header";
import ColorPicker from "./ColorPicker";
import "./Board.scss";

type Props = {
  lists: Array<{ _id: string }>,
  boardTitle: string,
  boardId: string,
  dispatch: ({ type: string }) => void
};

let i = 0;

class Board extends React.Component<Props> {
  constructor() {
    super();
    this.state = {
      startX: null,
      startScrollLeft: null,
      newTitle: "",
      isTitleInEdit: false
    };
  }
  componentWillUnmount = () => {
    i += 1;
  };

  handleTitleClick = () => {
    this.setState({ isTitleInEdit: true, newTitle: this.props.boardTitle });
  };

  handleTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  submitTitle = () => {
    const { dispatch, boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === "") return;
    if (boardTitle !== newTitle) {
      dispatch({
        type: "EDIT_BOARD_TITLE",
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({
      isTitleInEdit: false,
      newTitle: ""
    });
  };

  handleTitleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitTitle();
    }
  };

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId } = this.props;

    if (type === "COLUMN") {
      dispatch({
        type: "REORDER_LISTS",
        payload: {
          oldListIndex: source.index,
          newListIndex: destination.index,
          boardId: source.droppableId
        }
      });
      return;
    }

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
  };

  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== "list-wrapper") return;
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollLeft: this.backgroundEl.scrollLeft
    });
  };

  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollLeft } = this.state;
    const scrollLeft = startScrollLeft - clientX + startX;
    this.backgroundEl.scrollLeft = scrollLeft;
    if (scrollLeft !== this.backgroundEl.scrollLeft) {
      this.setState({
        startX: clientX + this.backgroundEl.scrollLeft - startScrollLeft
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.startX) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.setState({ startX: null, startScrollLeft: null });
    }
  };
  render = () => {
    const { lists, boardTitle, boardId } = this.props;
    const { isTitleInEdit, newTitle } = this.state;
    return (
      <div className="board">
        <Helmet>
          <title>{boardTitle} | kanban.live</title>
        </Helmet>
        <Header />
        <div className="board-header">
          <div className="board-title-wrapper">
            {isTitleInEdit ? (
              <input
                autoFocus
                value={newTitle}
                type="text"
                onKeyDown={this.handleTitleKeyDown}
                onChange={this.handleTitleChange}
                onBlur={this.submitTitle}
                className="board-title-input"
                spellCheck={false}
              />
            ) : (
              <button
                className="board-title-button"
                onClick={this.handleTitleClick}
              >
                <h1 className="board-title">{boardTitle}</h1>
              </button>
            )}
          </div>
          <ColorPicker boardId={boardId} />
        </div>
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <div
          ref={el => {
            this.backgroundEl = el;
          }}
          className="lists-wrapper"
          onMouseDown={this.handleMouseDown}
        >
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
              droppableId={boardId}
              type="COLUMN"
              direction="horizontal"
            >
              {droppableProvided => (
                <div className="lists" ref={droppableProvided.innerRef}>
                  {lists.map((list, index) => (
                    <Draggable
                      key={list._id}
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
                            <List
                              list={list}
                              boardId={boardId}
                              dragHandleProps={provided.dragHandleProps}
                              i={i}
                            />
                          </div>
                          {provided.placeholder}
                        </>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                  <ListAdder boardId={boardId} />
                </div>
              )}
            </Droppable>
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
    boardId
  };
};

export default connect(mapStateToProps)(Board);
