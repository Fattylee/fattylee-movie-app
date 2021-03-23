import React from "react";
import { Link } from "react-router-dom";
import { SearchMovie } from "./SearchMovie";

export const Header = ({ inputState, handleSubmit = () => {} }) => {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        Mreact
      </Link>
      {!inputState && (
        <Link className="btn show-all" to="/">
          Show all movies
        </Link>
      )}
      {inputState && (
        <SearchMovie handleSubmit={handleSubmit} inputState={inputState} />
      )}
    </nav>
  );
};
