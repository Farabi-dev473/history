import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Item = (isPacked: boolean, name: string) => {
  return <li>{isPacked ? name : null}</li>;
};

class PackingList extends React.Component {
  render(): React.ReactNode {
    <li></li>;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode></React.StrictMode>
);
