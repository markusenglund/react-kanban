import { denormalize, schema } from "normalizr";
import axios from "axios";

// Persist the board to the database after every action.
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
      axios
        .delete("/api/board", { data: { boardId } })
        .then(({ data }) => console.log(data));

      // All action-types that are not DELETE_BOARD are currently modifying a board in a way that should
      // be persisted to db. If other types of actions are added, this logic has be get more specific.
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

      axios.put("/api/board", boardData).then(({ data }) => console.log(data));
    }
  }
};

export default persistMiddleware;
