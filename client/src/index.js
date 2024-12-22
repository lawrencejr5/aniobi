import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.scss";
import "./styles/index.responsive.scss";

import App from "./App.tsx";
import { GlobalProvider } from "./Global.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
