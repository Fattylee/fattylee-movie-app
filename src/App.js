import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Child } from "./components/Header/Child";
import { Header } from "./components/Header/Header";
import { Hello } from "./components/Header/Hello";
import { MovieList } from "./components/MovieList";
import { Something } from "./components/Something";
import { SingleMovie } from "./pages/SingleMovie";
import { MOST_POPULAR, SEARCH_MOVIE } from "./utils/constants";

export const App = () => {
  const boxRef = useRef();
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(true);

  const [favourites, setFavourites] = useState(() => {
    let favMovies = [];
    try {
      favMovies = JSON.parse(localStorage["fav-movies"]);
    } catch (error) {}
    return favMovies;
  });

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
    console.log("useEffect 1");
    fetchData(MOST_POPULAR);
  }, []);

  useEffect(() => {
    console.log("useEffect 2");
    localStorage.setItem("fav-movies", JSON.stringify(favourites));
  }, [favourites]);

  const unMemoizehandleFavourite = (id, favAction) => {
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

  const handleFavourite = useCallback(unMemoizehandleFavourite, [
    movies,
    favourites,
  ]);

  const handleSubmit = async (movieName) => {
    const json = await fetchData(SEARCH_MOVIE + movieName);

    setmatchedResult([json.results.length, movieName, true]);
    setMovieName("");
  };
  const MemoRoute = React.memo(Route);
  return (
    <Router>
      <Header
        boxRef={boxRef}
        inputState={{ setMovieName, movieName }}
        handleSubmit={handleSubmit}
      />
      <button onClick={() => setVisible(!visible)}>
        Toggle Hello Component
      </button>
      {visible && <Hello textBoxRef={boxRef} />}
      {/* <Something /> */}
      <Switch>
        <MemoRoute exact path="/xyz" component={Child} />
        <Route
          exact
          path="/"
          component={() => (
            <>
              <MovieList
                listType="Favourite"
                movies={favourites}
                handleFavourite={handleFavourite}
              />
              <MovieList
                matchedResult={matchedResult}
                listType="Featured"
                movies={movies}
                handleFavourite={handleFavourite}
              />
            </>
          )}
        />
        <Route
          path="/:movieId"
          exact
          component={() => <SingleMovie handleFavourite={handleFavourite} />}
        />
        <Route path="/xyz/:somethiing" component={Something} />
        <Route
          component={() => {
            return (
              <div>
                <h3>Not found</h3>
                <button className="btn show-all">Goto Home</button>
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
};
