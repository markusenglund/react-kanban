import path from "path";
import express from "express";
import mysql from "mysql";
import compression from "compression";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import renderPage from "./renderPage";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

const reorganizeData = data => {
  /* eslint-disable camelcase */
  const boardsById = data.reduce(
    (boards, { board_id, board_title, list_id }) => {
      if (!boards[board_id]) {
        return {
          ...boards,
          [board_id]: { id: board_id, title: board_title, lists: [list_id] }
        };
      }
      if (!boards[board_id].lists.includes(list_id)) {
        return {
          ...boards,
          [board_id]: {
            ...boards[board_id],
            lists: [...boards[board_id].lists, list_id]
          }
        };
      }
      return boards;
    },
    {}
  );
  const listsById = data.reduce((lists, { list_id, list_title, card_id }) => {
    if (!lists[list_id]) {
      return {
        ...lists,
        [list_id]: { id: list_id, title: list_title, cards: [card_id] }
      };
    }
    if (!lists[list_id].cards.includes(card_id)) {
      return {
        ...lists,
        [list_id]: {
          ...lists[list_id],
          cards: [...lists[list_id].cards, card_id]
        }
      };
    }
    return lists;
  }, {});
  const cardsById = data.reduce(
    (cards, { card_id, card_title }) => ({
      ...cards,
      [card_id]: { id: card_id, title: card_title }
    }),
    {}
  );

  return { boardsById, listsById, cardsById };
  /* eslint-enable camelcase */
};

const getData = (req, res, next) => {
  connection.query(
    `SELECT boards.board_id, board_title, lists.list_id, list_title, card_id, card_title
    FROM boards, lists, cards
    WHERE cards.list_id = lists.list_id
    AND lists.board_id = boards.board_id 
    AND boards.is_public = 1
    ORDER BY list_order, card_order`,
    (error, cards) => {
      if (error) console.log(error);
      req.initialState = reorganizeData(cards);
      next();
    }
  );
};

const app = express();

app.use(favicon(path.join("dist/public/favicons/favicon.ico")));
app.use("/static", express.static("dist/public"));
app.use(compression());
app.use(getData);
app.get("*", renderPage);

const port = process.env.PORT || "1337";

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}`));
