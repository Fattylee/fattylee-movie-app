import React, { useEffect, useState } from "react";
import { Movie } from "../components/Movie";

export const SingleMovie = ({ listType, handleFavourite }) => {
  const url = `https://api.themoviedb.org/3/movie${window.location.pathname}?api_key=${process.env.REACT_APP_MOVIE_API}`;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setMovie(json);
        return json;
        // TOOD: clear loader
      } catch (error) {
        // TOOD: clear loader
        console.log(error, "error");
      }
    };
    fetchData(url);
    return () => {};
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
  return (
    <>
      <div className="single-movie" data-fap="red">
        <h3>Movie details</h3>
        <div
          className="wrapper"
          style={{
            backgroundImage:
              "url(https://www.themoviedb.org/t/p/w1280" + backdrop_path,
          }}
        >
          <Movie
            listType={listType}
            {...movie}
            handleFavourite={handleFavourite}
          />
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
              <li>adult pg: {adult}</li>
              <li>{release_date}</li>
              <li>{vote_average}</li>
              <li>{genres?.map((genre) => genre.name)}</li>
              <li>{runtime}</li>
              <li>add to favourite</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
