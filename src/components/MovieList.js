import React from "react";
import { Movie } from "./Movie";

export const MovieList = ({ movies }) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
};
