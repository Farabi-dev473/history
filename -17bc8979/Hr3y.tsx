import React from "react";

const Input = ({ temperature, handleOnChange, scale }) => {
  return <input type="text" value={temperature} onChange={handleOnChange} />;
};

class Calculator extends React.Component {
  state = { temperatureInCelcious: 0, temperatureInFarenheight: 32 };

  handleOnChange(event: any, scale: string) {
    if (scale === "c") {
      this.setState({
        temperatureInFarenheight: event.target.value * 1.8 + 32,
      });
      return;
    }

    if (scale === "f") {
      this.setState({ temperatureInCelcious: (event.target.value - 32) / 18 });
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
          handleOnChange={(event: any) => this.handleOnChange(event, "f")}
          scale={"c"}
        />
        <Input
          temperature={temperatureInFarenheight}
          handleOnChange={(event: any) => this.handleOnChange(event, "f")}
          scale={"f"}
        />
      </div>
    );
  }
}

export default Calculator;
