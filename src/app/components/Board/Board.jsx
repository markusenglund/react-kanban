// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import ListAdder from "./ListAdder";
import "./Board.scss";

type Props = {
  lists: Array<{ _id: string }>,
  boardTitle: string,
  boardId: string,
  dispatch: ({ type: string }) => void
};

let i = 0;

class Board extends React.Component<Props> {
  componentWillUnmount = () => {
    i += 1;
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

  render = () => {
    const { lists, boardTitle, boardId } = this.props;
    return (
      <div className="board">
        <Helmet>
          <title>{boardTitle} | Trello</title>
        </Helmet>
        <div className="board-header">
          <h1 className="board-title">{boardTitle}</h1>
        </div>
        <div className="lists-wrapper">
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
