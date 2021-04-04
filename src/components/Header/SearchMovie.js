import React, { useContext } from "react";
import { ColorContext } from "../../hooks/ColorContext";

export const SearchMovie = ({ inputState, handleSubmit, boxRef }) => {
  const { setMovieName, movieName } = inputState;
  const [, setColor] = useContext(ColorContext);

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
          setColor(e.target.value);
        }}
        value={movieName}
        type="text"
        className="search-movie-textbox"
        placeholder="Search movie..."
      />
    </form>
  );
};
