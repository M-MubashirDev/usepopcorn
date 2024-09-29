import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import Star from "./star";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Star nums={5} color={"red"} size={2} />
    <Star
      nums={5}
      color={"red"}
      size={2}
      messsege={["poor", "below", "avrage", "better", "good"]}
    /> */}
  </React.StrictMode>
);
