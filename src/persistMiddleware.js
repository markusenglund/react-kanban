import { denormalize, schema } from "normalizr";
import axios from "axios";

const persistMiddleware = store => next => action => {
  next(action);
  const { user, boardsById, listsById, cardsById } = store.getState();
  if (user) {
    const { boardId } = action.payload;

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
};

export default persistMiddleware;
