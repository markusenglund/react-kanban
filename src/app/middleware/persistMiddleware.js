import { denormalize, schema } from "normalizr";
import axios from "axios";

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
      axios.delete("/api/board", { data: { boardId } });

      // All action-types that are not DELETE_BOARD or PUT_BOARD_ID_IN_REDUX are currently modifying a board in a way that should
      // be persisted to db. If other types of actions are added, this logic will get unwieldy.
    } else if (action.type !== "PUT_BOARD_ID_IN_REDUX") {
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
      console.log(boardData, "boardData");

      // TODO: Provide warning message to user when put request doesn't work for whatever reason
      axios.put("/api/board", boardData);
    }
  }
};

export default persistMiddleware;
