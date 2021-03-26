import React from "react";
import { Link } from "react-router-dom";
import { SearchMovie } from "./SearchMovie";

export const Header = ({ inputState, handleSubmit, boxRef }) => {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        Mreact
      </Link>
      <SearchMovie
        handleSubmit={handleSubmit}
        inputState={inputState}
        boxRef={boxRef}
      />
    </nav>
  );
};
