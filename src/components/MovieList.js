import React, { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../hooks/ColorContext";
import { Movie } from "./Movie";

export const MovieList = ({
  movies,
  listType,
  handleFavourite,
  matchedResult,
}) => {
  const [color] = useContext(ColorContext);
  const rerender = useRef(false);

  useEffect(() => {
    if (rerender.current) {
      console.log("MovieList rerender");
      return () => {
        console.log("MovieList Unmount rerender");
      };
    }
  });

  useEffect(() => {
    rerender.current = true;

    console.log("MovieList mounted");
    return () => {
      console.log("MovieList Unmounted");
    };
  }, []);

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
      <h3
        style={{ color: listType === "Favourite" ? color : "inherit" }}
        className="movies-title"
      >
        {titleContent}
      </h3>
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
