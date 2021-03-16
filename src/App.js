import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList";
import { MOST_POPULAR } from "./utils/constants";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const fetchData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    setMovies(json.results);
  };

  useEffect(() => {
    fetchData(MOST_POPULAR);
  }, []);

  return (
    <div>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
};
