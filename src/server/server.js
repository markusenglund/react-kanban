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
import socketIO from "socket.io";
import http from "http";


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
  const server = http.createServer(app);
  server.listen(port, () => console.log(`Server listening on port ${port}`));

  const io = socketIO(server);
  let userSockets = {};

  io.on("connection", socket=>{
    console.log("user connected to socket");
    socket.emit("connected");

    socket.on("userDetails", ({_id: userID})=>{
      console.log(userID);
      userSockets[userID] = socket;
    })

    socket.on("disconnect", ()=>{
      console.log("user disconnected");
      let keys = Object.keys(userSockets);
      for(let i=0; i< keys.length; i++){
        if(userSockets[keys[i]].id === socket.id){
          delete userSockets[keys[i]];
          break;
        }
      }
    })
    
    socket.on("change", (boardID)=>{
      console.log("change");
      sendChangeMessage(boardID, db);
    })
  })

  function sendChangeMessage(boardID, db){
    const boards = db.collection("boards");
    boards.findOne({_id: boardID}).then(board=>{
      if(board){
        let {users} = board;
        users.forEach(user=>{
          if(userSockets[user]){
            userSockets[user].emit("change");
          }
        })
      }
    })
  }

});
