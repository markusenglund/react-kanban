import path from "path";
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import { Client } from "pg";
import renderPage from "./renderPage";

dotenv.config();

const getData = (req, res, next) => {
  const client = new Client();

  client.connect();

  client.query("SELECT * FROM cards", (err, cardData) => {
    // console.log(err ? err.stack : res.rows[0]); // Hello World!
    console.log("getdata");
    const cards = cardData.rows.reduce((acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {});
    req.initialState = { cards };
    client.end();
    next();
  });
};

const app = express();

app.use(compression());
app.use("/public", express.static(path.join("dist/public")));
app.use(getData);
app.get("*", renderPage);

const port = process.env.PORT || "1337";

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}`));
