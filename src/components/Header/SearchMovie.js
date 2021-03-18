import React, { useState } from "react";

export const SearchMovie = ({ handleSubmit }) => {
  const [movieName, setMovieName] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target, "onSubmit");
    if (movieName.trim()) {
      handleSubmit(movieName, setMovieName);
    }
  };

  return (
    <form className="search-form" onSubmit={handleOnSubmit}>
      <input
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
        value={movieName}
        type="text"
        className="search-movie-textbox"
        placeholder="Search movie..."
      />
    </form>
  );
};
