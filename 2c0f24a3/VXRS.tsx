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

class Test extends React.Component {
  render(): React.ReactNode {
    return <span>Test</span>;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock format="bn-BD">
      <Tests />
    </Clock>
  </React.StrictMode>
);
