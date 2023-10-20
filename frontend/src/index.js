import App from "./App";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import Context from "./Context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </StrictMode>
);
