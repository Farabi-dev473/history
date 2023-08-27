import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Clock = () => {
  return <h1>Time is ${new Date().toLocaleString()}</h1>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>
);
