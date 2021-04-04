import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorContext } from "../../hooks/ColorContext";
import { SearchMovie } from "./SearchMovie";

export const Header = ({ inputState, handleSubmit, boxRef }) => {
  const [color] = useContext(ColorContext);
  return (
    <nav className="nav">
      <Link style={{ color }} to="/" className="brand">
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
