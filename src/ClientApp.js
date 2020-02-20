import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

// Space for other browser only items

hydrate(<App />, document.getElementById("root"));
