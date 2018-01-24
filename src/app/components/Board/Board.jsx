// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
// import DndExample from "./BeautifulDndExample";
import "./Board.scss";

type Props = {
  lists: Array<{ id: string }>,
  boardTitle: string,
  dispatch: ({ type: string }) => void
};

class Board extends Component<Props> {
  handleDragEnd = ({ source, destination }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: "REORDER_LIST",
      payload: {
        listId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }
    });
  };
  render = () => {
    const { lists, boardTitle } = this.props;
    return (
      <div className="board">
        <Helmet>
          <title>{boardTitle} | Trello</title>
        </Helmet>
        <div className="board-header">
          <h1 className="board-title">{boardTitle}</h1>
        </div>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <div className="lists">
            {lists.map(list => <List key={list.id} list={list} />)}
          </div>
        </DragDropContext>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boards[boardId];
  return {
    lists: board.lists.map(listId => state.lists[listId]),
    boardTitle: board.title
  };
};

export default connect(mapStateToProps)(Board);
