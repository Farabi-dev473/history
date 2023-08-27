import React from "react";
import BoilingVerdict from "./BoillingVerdict";

class Calculator extends React.Component {
  state = { temperature: 0 };

  handleOnChange(event: any) {
    this.setState({
      temperature: event.target.value,
    });
  }

  render(): React.ReactNode {
    const { temperature } = this.state;

    return (
      <div>
        <input type="text" value={temperature} onChange={this.handleOnChange} />
        <BoilingVerdict celcious={temperature} />
      </div>
    );
  }
}

export default Calculator;
