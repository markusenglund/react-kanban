import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import passport from "passport";
import session from "express-session";
import compression from "compression";
import helmet from "helmet";
import favicon from "serve-favicon";
import logger from "morgan";
import dotenv from "dotenv";
import renderPage from "./renderPage";
import configurePassport from "./passport";
import api from "./api";
import auth from "./auth";
import fetchBoardData from "./fetchBoardData";

dotenv.config();
const app = express();

MongoClient.connect(process.env.MONGODB_URL).then(client => {
  const db = client.db(process.env.MONGODB_NAME);

  configurePassport(db);

  app.use(helmet());
  app.use(logger("tiny"));
  app.use(compression());
  app.use(favicon(path.join("dist/public/favicons/favicon.ico")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("dist/public"));
  app.use(session({ secret: "asdf", resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/auth", auth);
  app.use("/api", api(db));
  app.use(fetchBoardData(db));
  app.get("*", renderPage);

  const port = process.env.PORT || "1337";
  /* eslint-disable no-console */
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
