import React from "react";
import { Movie } from "./Movie";

export const MovieList = ({ movies, listType }) => {
  return (
    <>
      <h3 className="movies-title">{listType} movies</h3>
      <div
        className={
          listType === "Favourite" ? "movies movies--scroll" : "movies"
        }
      >
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};
