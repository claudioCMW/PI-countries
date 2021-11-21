import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./f_redux/f_store/store";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import { BrowserRouter } from "react-router-dom";
import axios  from "axios";
dotenv.config();

axios.defaults.baseURL=process.env.REACT_APP_API || "http://localhost:3001";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
