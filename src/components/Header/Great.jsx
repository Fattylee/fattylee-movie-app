import React from "react";

export const Great = ({ food, list }) => {
  console.log("renders from GREAT - ", food);
  return (
    <div>
      Hello Great - I love {food} - {list}
    </div>
  );
};
