import React from "react";

class Calculator extends React.Component {
  state = { temperature: "" };

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
      </div>
    );
  }
}
