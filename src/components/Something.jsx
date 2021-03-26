import React from "react";

const Zomething = () => {
  const counter = React.useRef(0);
  console.log("Render count from Something  Comp:", ++counter.current);
  return <h1>Hello world</h1>;
};

export const Something = React.memo(Zomething);
