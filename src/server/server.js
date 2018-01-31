import path from "path";
import express from "express";
import mysql from "mysql";
import compression from "compression";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import renderPage from "./renderPage";
import reorganizeData from "./reorganizeData";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

const getData = (req, res, next) => {
  connection.query(
    `SELECT boards.board_id, board_title, lists.list_id, list_title, card_id, card_title
    FROM boards
    LEFT JOIN lists
      ON lists.board_id = boards.board_id
    LEFT JOIN cards
      ON cards.list_id = lists.list_id
    WHERE is_public = 1
    ORDER BY list_order, card_order;`,
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
