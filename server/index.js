import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.Port || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  res.write(parts[0]);
  // Start core part to get this to work with React
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(res, { end: false });

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });

  // End core part to work with React
});

console.log("listening on  " + PORT);
app.listen(PORT);
