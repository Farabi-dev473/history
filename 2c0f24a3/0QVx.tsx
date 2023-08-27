import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface ClockProps {
  format: string;
}

class Clock extends React.Component<ClockProps> {
  render(): React.ReactNode {
    return <h1>Time is ${new Date().toLocaleTimeString(this.props.format)}</h1>;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock format="bn-BD" />
  </React.StrictMode>
);
