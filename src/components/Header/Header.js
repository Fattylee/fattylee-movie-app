import React from "react";
import { SearchMovie } from "./SearchMovie";

export const Header = ({ handleSubmit }) => {
  return (
    <nav className="nav">
      <div className="brand">Mreact</div>
      <SearchMovie handleSubmit={handleSubmit} />
    </nav>
  );
};
