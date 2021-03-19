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
    try {
      const favMovies = JSON.parse(localStorage["fav-movies"]);
      setFavourites(favMovies);
    } catch (error) {
      setFavourites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fav-movies", JSON.stringify(favourites));
  }, [favourites]);

  const handleFavourite = (id, favAction) => {
    if (favAction === "add") {
      // add to favourite
      const favMovie = movies.find((movie) => movie?.id === id);
      // add if not already eist
      if (!favourites.find((mov) => mov.id === id)) {
        setFavourites((prevState) => [favMovie, ...prevState]);
      }
    } else {
      // remove from favourite
      const newFavourites = favourites.filter((favMovie) => favMovie.id !== id);
      setFavourites(newFavourites);
    }
  };

  const handleSubmit = async (movieName, setMovieName) => {
    console.log(movieName);
    await fetchData(SEARCH_MOVIE + movieName);
    // setMovieName("");
  };
  return (
    <div>
      <Header handleSubmit={handleSubmit} />
      <MovieList
        listType="Favourite"
        movies={favourites}
        handleFavourite={handleFavourite}
      />

      <MovieList
        listType="Featured"
        movies={movies}
        handleFavourite={handleFavourite}
      />
    </div>
  );
};
