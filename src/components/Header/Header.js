import React from "react";
import { SearchMovie } from "./SearchMovie";

export const Header = () => {
  return (
    <nav className="nav">
      <div className="brand">Mreact</div>
      <SearchMovie />
    </nav>
  );
};
