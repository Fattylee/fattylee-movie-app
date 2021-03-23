import React, { useEffect, useState } from "react";
import { Movie } from "../components/Movie";
import { BACKDROP_PATH_SIZE } from "../utils/constants";
import { Header } from "../components/Header/Header";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

export const SingleMovie = ({
  match: {
    params: { movieId },
  },
}) => {
  const url = `https://api.themoviedb.org/3/movie/${
    movieId.split("-")[0]
  }?api_key=${process.env.REACT_APP_MOVIE_API}`;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  useEffect(() => {
    document.title = "Movie React App || Details page";
  }, []);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setMovie(json);
        setIsLoading(false);
        return json;
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.log(error.message, "error");
      }
    };
    fetchData(url);

    return () => {
      setError("");
      setIsLoading(true);
      setMovie({});
    };
  }, [url]);

  const {
    title,
    vote_average,
    backdrop_path,
    overview,
    genres,
    release_date,
    tagline,
    adult,
    runtime,
  } = movie || {};

  const getTime = (duration) => {
    if (!runtime) return "unknown";

    if (duration < 60) {
      return duration + "m";
    }
    return `${(duration / 60) | 0}h ${duration % 60}m`;
  };

  if (isLoading) return <Loader size="small" />;

  if (!Object.keys(movie).length) {
    return <Error error={error} />;
  }

  return (
    <>
      <Header />
      <div className="single-movie">
        <h3 className="single-movie-title">Movie details</h3>
        <div
          className="wrapper"
          style={{
            backgroundImage: `url(${BACKDROP_PATH_SIZE}${backdrop_path})`,
          }}
        >
          <Movie {...movie} />
          <div className="content">
            <h3 className="title">
              {title}{" "}
              <span className="released-year">
                ({release_date?.slice(0, 4)})
              </span>
            </h3>
            <p className="overview-sub">{tagline}</p>
            <h4 className="overview-heading">Overview</h4>
            <p className="overview-content">{overview}</p>
            <ul>
              <li>Duration: {getTime(runtime)}</li>
              <li>Released date: {release_date}</li>
              <li>PG: {adult ? "Yes" : "No"}</li>
              <li className="rating">{vote_average}</li>
              <li>
                Genre:{" "}
                {genres?.map((genre, index) => (
                  <span
                    key={index}
                    className={`genre ${genre.name
                      .toLowerCase()
                      .replace(/\s+/, "-")}`}
                  >
                    {genre.name}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
