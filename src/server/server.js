import path from "path";
import express from "express";
import compression from "compression";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import renderPage from "./renderPage";

dotenv.config();

const app = express();

app.use(favicon(path.join("dist/public/favicons/favicon.ico")));
app.use(compression());
app.use("/public", express.static(path.join("dist/public")));
app.get("*", renderPage);

const port = process.env.PORT || "1337";

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}`));
