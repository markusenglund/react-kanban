// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import ListAdder from "./ListAdder";
import { reorderList } from "../../actionCreators";
import "./Board.scss";

type Props = {
  lists: Array<{ _id: string }>,
  boardTitle: string,
  boardId: string,
  dispatch: ({ type: string }) => void
};

class Board extends React.Component<Props> {
  handleDragEnd = ({ draggableId, source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId } = this.props;

    if (type === "COLUMN") {
      dispatch({
        type: "REORDER_BOARD",
        payload: {
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        }
      });
      return;
    }
    dispatch(
      reorderList(
        draggableId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        boardId
      )
    );
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
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
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
                          data-react-beautiful-dnd-draggable="0"
                          className="list-wrapper"
                        >
                          <List
                            list={list}
                            boardId={boardId}
                            dragHandleProps={provided.dragHandleProps}
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
