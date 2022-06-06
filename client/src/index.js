import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App.js";

import axios from "axios";
window.axios = axios; 

const store = createStore(reducers,{}, applyMiddleware(reduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}><App/></Provider>,
);
reportWebVitals();