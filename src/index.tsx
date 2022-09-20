import "./index.css";
import store from "./redux/store-redux"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    // <BrowserRouter>
    <HashRouter>
      <Provider store={store}>
        <MainApp/>
      </Provider>
    </HashRouter>
    // </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
