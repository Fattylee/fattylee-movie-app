import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../../hooks/ColorContext";
import { GrandChild } from "./GrandChild";

export const Child = (props) => {
  const [color, setColor] = useContext(ColorContext);
  const [toggleVisibility, setToggleVisibility] = useState(true);

  useEffect(() => {
    console.log("Child mounted");
    return () => {
      console.log("Child Unmounted");
    };
  }, []);
  useEffect(() => {
    // setColor("skyblue");
    console.log("Child render");
  });

  const { increment } = props;
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  countRef.current++;
  if (countRef.current > 0) console.log("re-render child", countRef.current);
  countRef.current++;
  const getItems = React.useCallback(() => {
    return [count + 1, count + 2, count + 3];
  }, [count]);

  return (
    <div>
      <button onClick={() => setToggleVisibility(!toggleVisibility)}>
        Toggle GcComp {String(toggleVisibility)}
      </button>
      {toggleVisibility && <GrandChild getItems={getItems} />}
      <button onClick={() => setCount((c) => c + 1)}> Count: {count}</button>
      {/* {props.arr(0)} Hello children: {props?.location?.pathname} */}
      <h3 className="child-comp" style={{ WebkitTextFillColor: color }}>
        Child Comp
      </h3>
      <div
        className="child-height"
        style={{
          backgroundImage: "url(/assets/img/missing-unsplash.jpg)",
          // background: "red",
        }}
      >
        child height
      </div>
      <div className="unsplash">G</div>

      <button onClick={() => increment(countRef.current)}>Increment</button>
      <h3>Child Comp</h3>
    </div>
  );
};
