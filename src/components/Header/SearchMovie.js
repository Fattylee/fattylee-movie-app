import React, { useEffect } from "react";

export const SearchMovie = ({ inputState, handleSubmit }) => {
  const { setMovieName, movieName } = inputState;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (movieName.trim()) {
      handleSubmit(movieName);
    }
  };
  useEffect(() => {
    console.log(window.location);
    // window.location.assign("/");
    return () => {};
  }, []);

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
