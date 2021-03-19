import React from "react";
import { SearchMovie } from "./SearchMovie";

export const Header = ({ inputState, handleSubmit }) => {
  return (
    <nav className="nav">
      <div className="brand">Mreact</div>
      <SearchMovie handleSubmit={handleSubmit} inputState={inputState} />
    </nav>
  );
};
