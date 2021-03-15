import React from "react";

export const SearchMovie = () => {
  return (
    <form className="search-form" action="">
      <input
        type="text"
        className="search-movie-textbox"
        placeholder="Search movie..."
      />
    </form>
  );
};
