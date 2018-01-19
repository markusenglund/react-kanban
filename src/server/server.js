import path from "path";
import express from "express";
import compression from "compression";
import renderPage from "./renderPage";

const app = express();

app.use(compression());
app.use("/public", express.static(path.join("dist/public")));
app.get("*", renderPage);

const port = process.env.PORT || "1337";

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}`));
