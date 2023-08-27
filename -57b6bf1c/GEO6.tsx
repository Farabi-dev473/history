const BoilingVerdict = (props: any) => {
  const { celcious } = props;
  if (celcious >= 100) {
    return <h1>Water would boil</h1>;
  }
  return <h1>Water wouldn't boil</h1>;
};

export default BoilingVerdict;
