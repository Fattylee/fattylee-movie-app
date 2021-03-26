import React, { memo, useRef, useState } from "react";

export const Child = memo((props) => {
  const { increment } = props;
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  console.log("render child", ++countRef.current);

  return (
    <div>
      Hello children: {props?.location?.pathname}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <button onClick={() => increment(countRef.current)}>Increment</button>
    </div>
  );
});
