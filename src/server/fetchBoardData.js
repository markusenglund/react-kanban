import { normalize, schema } from "normalizr";
import createWelcomeBoard from "./createWelcomeBoard";

// Boards are stored in a tree structure inside mongoDB.
// This function takes the tree shaped boards and returns a flat structure more suitable to a redux store.
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

// Fetch board data and append to req object as intialState which will be put inside redux store on the client
const fetchBoardData = db => (req, res, next) => {
  // Fetch a user's private boards from db if a user is logged in
  if (req.user) {
    const collection = db.collection("boards");
    collection
      .find({ $or: [{ users: req.user._id }, { isPublic: true }] })
      .toArray()
      .then(boards => {
        req.initialState = { ...normalizeBoards(boards), user: req.user };
        next();
      });

    // Just create the welcome board if no user is logged in
  } else {
    req.initialState = normalizeBoards([createWelcomeBoard()]);
    next();
  }
};

export default fetchBoardData;
