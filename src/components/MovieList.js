import React from "react";
import { Movie } from "./Movie";

export const MovieList = ({ movies, listType, handleFavourite }) => {
  return (
    <>
      <h3 className="movies-title">{listType} movies</h3>
      <div
        className={
          listType === "Favourite" ? "movies movies--scroll" : "movies"
        }
      >
        {movies.length === 0 ? (
          <h3>Empty list</h3>
        ) : (
          movies.map((movie) => (
            <Movie
              key={movie.id}
              listType={listType}
              {...movie}
              handleFavourite={handleFavourite}
            />
          ))
        )}
      </div>
    </>
  );
};
