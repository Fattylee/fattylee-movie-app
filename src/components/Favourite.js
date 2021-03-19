import React from "react";

export const Favourite = ({ listType, handleFavourite, id }) => {
  return (
    <div
      className="favourite-btn"
      onClick={(e) => {
        if (listType === "Favourite") {
          // remove logic
          handleFavourite(id, "remove");
        } else {
          // add logic
          handleFavourite(id, "add");
        }
      }}
    >
      {listType === "Favourite" ? "-" : "+"}
    </div>
  );
};
