import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import store from "./redux/store.js";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
