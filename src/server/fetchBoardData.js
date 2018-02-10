import { normalize, schema } from "normalizr";

const normalizeBoards = boards => {
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
  const { entities } = normalize(boards, [board]);
  return entities;
};

const fetchBoardData = db => (req, res, next) => {
  // if (req.user) {
  if (true) {
    const collection = db.collection("boards");
    collection
      .find({})
      .toArray()
      .then(boards => {
        req.initialState = { ...normalizeBoards(boards), user: req.user };
        next();
      });
  } else {
    req.initialState = {};
    next();
  }
};

export default fetchBoardData;
