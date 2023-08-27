import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface ClockProps {
  format: string;
  children?: React.ReactNode;
}

class Clock extends React.Component<ClockProps> {
  state = { date: new Date(), clockStarted: false };
  intervalId;

  handleClick() {
    if (this.state.clockStarted) {
      clearInterval(this.intervalId);
      return;
    }
    this.setState({ clockStarted: true });
    this.intervalId = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  render(): React.ReactNode {
    return (
      <>
        <h1>
          Time is ${this.state.date.toLocaleTimeString(this.props.format)}
        </h1>
        <button onClick={() => this.handleClick()}>
          <h3>{this.state.clockStarted ? "Stop Clock" : "Start Clock"}</h3>
        </button>
      </>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Clock format="en-US" />
  </React.StrictMode>
);
