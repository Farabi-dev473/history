import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface ClockProps {
  format: string;
  children?: React.ReactNode;
}

class Clock extends React.Component<ClockProps> {
  state = { date: new Date() };

  componentDidMount(): void {
    this.intervalId = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalId);
  }

  render(): React.ReactNode {
    return (
      <h1>Time is ${this.state.date.toLocaleTimeString(this.props.format)}</h1>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock format="bn-BD"></Clock>
  </React.StrictMode>
);
