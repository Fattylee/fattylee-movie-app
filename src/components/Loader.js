import React from "react";

export const Loader = ({ size }) => {
  const computeBoxSize = (size = "small") => {
    if (size.toLowerCase() === "large") return "500px";

    if (size.toLowerCase() === "medium") return "300px";

    return "200px";
  };

  return (
    <div className="loader-wrapper">
      <span className="loader" style={{ "--box": computeBoxSize(size) }}></span>
    </div>
  );
};
