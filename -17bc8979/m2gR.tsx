import React from "react";

const Input = ({ temperature, handleOnChange, scale }) => {
  return (
    <input
      type="text"
      value={temperature}
      onChange={(event) => handleOnChange(event, scale)}
    />
  );
};

class Calculator extends React.Component {
  state = { temperatureInCelcious: 0, temperatureInFarenheight: 32 };

  handleOnChange(event: any, scale: string) {
    if (scale === "c") {
      this.setState((prevState) => {
        prevState.temperatureInCelcious * 1.8 + 32;
      });
      return;
    }

    if (scale === "f") {
      this.setState((prevState) => {
        (prevState.temperatureInFarenheight - 32) / 18;
      });
      return;
    }

    console.log("No scale exist");
  }

  render(): React.ReactNode {
    const { temperatureInCelcious, temperatureInFarenheight } = this.state;
    return (
      <div>
        <Input
          temperature={temperatureInCelcious}
          handleOnChange={this.handleOnChange}
          scale={"c"}
        />
        <Input
          temperature={temperatureInFarenheight}
          handleOnChange
          scale={"f"}
        />
      </div>
    );
  }
}

export default Calculator;
