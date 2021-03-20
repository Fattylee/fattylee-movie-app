import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList";
import { SingleMovie } from "./pages/SingleMovie";
import { MOST_POPULAR, SEARCH_MOVIE } from "./utils/constants";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [matchedResult, setmatchedResult] = useState([0, "", false]);
  const [movieName, setMovieName] = useState("");

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setMovies(json.results);
      return json;
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

  const handleSubmit = async (movieName) => {
    const json = await fetchData(SEARCH_MOVIE + movieName);

    setmatchedResult([json.results.length, movieName, true]);
    setMovieName("");
  };

  return (
    <Router>
      <Header
        inputState={{ setMovieName, movieName }}
        handleSubmit={handleSubmit}
      />
      <MovieList
        listType="Favourite"
        movies={favourites}
        handleFavourite={handleFavourite}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <MovieList
              matchedResult={matchedResult}
              listType="Featured"
              movies={movies}
              handleFavourite={handleFavourite}
            />
          )}
        />
        <Route
          path="/:movieId"
          component={() => <SingleMovie handleFavourite={handleFavourite} />}
        />
      </Switch>
    </Router>
  );
};
