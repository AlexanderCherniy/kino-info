import "./index.css";
import store from "./redux/store-redux"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainApp/>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
