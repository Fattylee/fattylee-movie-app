import React, { useState, useEffect } from "react";
import { Error } from "../components/Error";
import { Header } from "../components/Header/Header";
import { Loader } from "../components/Loader";
import { MovieList } from "../components/MovieList";
import { MOST_POPULAR, SEARCH_MOVIE } from "../utils/constants";
import { fetchData } from "../utils/helper";

export const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [favourites, setFavourites] = useState(() => {
    let favMovies = [];
    try {
      favMovies = JSON.parse(localStorage["fav-movies"]);
    } catch (error) {}
    return favMovies;
  });

  const [matchedResult, setmatchedResult] = useState([0, "", false]);
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    fetchData(MOST_POPULAR, setMovies, setIsLoading, setError);
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
    const json = await fetchData(
      SEARCH_MOVIE + movieName,
      setMovies,
      setIsLoading,
      setError
    );

    setmatchedResult([json?.results?.length, movieName, true]);
    setMovieName("");
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Header
        inputState={{ setMovieName, movieName }}
        handleSubmit={handleSubmit}
      />
      <MovieList
        listType="Favourite"
        movies={favourites}
        handleFavourite={handleFavourite}
      />
      {error ? (
        <Error
          error={error}
          btnMessage="Try again"
          {...props}
          removeMarginTop={true}
        />
      ) : (
        <MovieList
          matchedResult={matchedResult}
          listType="Featured"
          movies={movies}
          handleFavourite={handleFavourite}
        />
      )}
    </>
  );
};
