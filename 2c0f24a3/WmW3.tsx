import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface ClockProps {
  format: sting;
}

class Clock extends React.Component {
  render(): React.ReactNode {
    return <h1>Time is ${new Date().toLocaleTimeString(this.props.format)}</h1>;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock format="bn-BD" />
  </React.StrictMode>
);
