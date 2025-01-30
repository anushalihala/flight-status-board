import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
}
