import React from "react";

export const SearchMovie = ({ inputState, handleSubmit, boxRef }) => {
  const { setMovieName, movieName } = inputState;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (movieName.trim()) {
      handleSubmit(movieName);
    }
  };

  return (
    <form className="search-form" onSubmit={handleOnSubmit}>
      <input
        ref={boxRef}
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
