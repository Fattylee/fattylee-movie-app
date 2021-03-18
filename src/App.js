import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList";
import { MOST_POPULAR, SEARCH_MOVIE } from "./utils/constants";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setMovies(json.results);
      // TOOD: clear loader
    } catch (error) {
      // TOOD: clear loader
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData(MOST_POPULAR);
  }, []);

  const handleSubmit = async (movieName, setMovieName) => {
    console.log(movieName);
    await fetchData(SEARCH_MOVIE + movieName);
    // setMovieName("");
  };
  return (
    <div>
      <Header handleSubmit={handleSubmit} />
      <MovieList listType="Favourite" movies={movies} />

      <MovieList listType="Featured" movies={movies} />
    </div>
  );
};
