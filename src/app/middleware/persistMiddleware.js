import { denormalize, schema } from "normalizr";
import socket from "../socketIOHandler";

// Persist the board to the database after almost every action.
const persistMiddleware = store => next => action => {
  next(action);
  const {
    user,
    boardsById,
    listsById,
    cardsById,
    currentBoardId: boardId
  } = store.getState();



  // Nothing is persisted for guest users
  if (user) {
    if (action.type === "DELETE_BOARD") {
      fetch("/api/board", {
        method: "DELETE",
        body: JSON.stringify({ boardId}),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      // All action-types that are not DELETE_BOARD or PUT_BOARD_ID_IN_REDUX are currently modifying a board in a way that should
      // be persisted to db. If other types of actions are added, this logic will get unwieldy.
    } else if (!['PUT_BOARD_ID_IN_REDUX', 'UPDATE_FILTER','CHANGE_CARD_FILTER', 'LOAD_BOARD_USERS_DATA'].includes(action.type)) {
      // Transform the flattened board state structure into the tree-shaped structure that the db uses.
      const card = new schema.Entity("cardsById", {}, { idAttribute: "_id" });
      const list = new schema.Entity(
        "listsById",
        { cards: [card] },
        { idAttribute: "_id" }
      );
      const board = new schema.Entity(
        "boardsById",
        { lists: [list] },
        { idAttribute: "_id" }
      );
      const entities = { cardsById, listsById, boardsById };

      const boardData = denormalize(boardId, board, entities);

      // TODO: Provide warning message to user when put request doesn't work for whatever reason
      fetch("/api/board", {
        method: "PUT",
        body: JSON.stringify(boardData),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
    }
  }
};

export default persistMiddleware;
