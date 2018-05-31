import express from "express";
import { MongoClient } from "mongodb";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import compression from "compression";
import serveStatic from "express-static-gzip";
import helmet from "helmet";
import favicon from "serve-favicon";
import logger from "morgan";
import dotenv from "dotenv";
import renderPage from "./renderPage";
import configurePassport from "./passport";
import api from "./routes/api";
import auth from "./routes/auth";
import fetchBoardData from "./fetchBoardData";

// Load environment variables from .env file
dotenv.config();

const app = express();

const MongoStore = connectMongo(session);

MongoClient.connect(process.env.MONGODB_URL).then(client => {
  const db = client.db(process.env.MONGODB_NAME);

  configurePassport(db);

  app.use(helmet());
  app.use(logger("tiny"));
  app.use(compression());
  app.use(favicon("dist/public/favicons/favicon.ico"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // aggressive cache static assets (1 year)
  // app.use("/static", express.static("dist/public", { maxAge: "1y" }));
  app.use(
    "/static",
    serveStatic("dist/public", { enableBrotli: true, maxAge: "1y" })
  );

  // Persist session in mongoDB
  app.use(
    session({
      store: new MongoStore({ db }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
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
