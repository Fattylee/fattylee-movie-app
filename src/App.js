import React from "react";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList";

export const App = () => {
  const movies = [1, 2, 3, 4, 5];
  return (
    <div>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
};
