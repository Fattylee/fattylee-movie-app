import React from "react";
import { Movie } from "./Movie";

export const MovieList = ({
  movies,
  listType,
  handleFavourite,
  matchedResult,
}) => {
  let titleContent = "";
  if (!matchedResult) {
    titleContent = `${listType} movies`;
  } else {
    titleContent = matchedResult[2]
      ? ` Found ${matchedResult[0]} Matches for: ${matchedResult[1]}`
      : `${listType} movies`;
  }
  return (
    <>
      <h3 className="movies-title">{titleContent}</h3>
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
