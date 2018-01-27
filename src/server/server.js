import path from "path";
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import { Client } from "pg";
import renderPage from "./renderPage";

dotenv.config();

const client = new Client();

client.connect();

client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message); // Hello World!
  client.end();
});

const app = express();

app.use(compression());
app.use("/public", express.static(path.join("dist/public")));
app.get("*", renderPage);

const port = process.env.PORT || "1337";

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}`));
