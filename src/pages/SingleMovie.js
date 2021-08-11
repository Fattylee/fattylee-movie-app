import React, { useEffect, useState } from "react";
import { Movie } from "../components/Movie";
import { BACKDROP_PATH_SIZE } from "../utils/constants";
import styled, { css } from "styled-components/macro";
import { Jumbotron } from "../components/jumbotron";
import jumboData from "../fixtures/jumbo.json";
import { GlobaStyles } from "../global-style";

const Body = styled.div`
  background: red;
  font-size: 2rem;
  box-shadow: ${({ primary }) =>
    primary ? "0 0 10px blue" : "3px 4px 10px cyan"};
  transition: all 0.5s;
  :hover {
    background: pink;
    color: ${({ color }) => color};
  }
  ${({ primary }) =>
    primary &&
    css`
      padding: 10px 20px;
      border-radius: 15px;
    `}
  @media(max-width:300px) {
    background: purple;
  }
`;

export const SingleMovie = (props) => {
  const { listType, handleFavourite } = props;
  const [primary, setPrimary] = useState(false);
  console.log(props);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    console.log("mounting....");

    const url = `https://api.themoviedb.org/3/movie${window.location.pathname}?api_key=${process.env.REACT_APP_MOVIE_API}`;

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
    return () => {
      console.log("UNmounting....");
      setMovie({});
    };
  }, []);

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

  if (!Object.keys(movie).length) {
    return <div>Loading...</div>;
  }
  const getTime = (duration) => {
    if (!runtime) return "unknown";

    if (duration < 60) {
      return duration + "m";
    }
    return `${(duration / 60) | 0}h ${duration % 60}m`;
  };

  return (
    <>
      <GlobaStyles />
      <Jumbotron.Container>
        {jumboData.map((item) => (
          <Jumbotron key={item.id} direction={item.direction}>
            <Jumbotron.Pane>
              <Jumbotron.Title>{item.title}</Jumbotron.Title>
              <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
            </Jumbotron.Pane>
            <Jumbotron.Pane>
              <Jumbotron.Image src={item.image} alt={item.alt} />
            </Jumbotron.Pane>
          </Jumbotron>
        ))}
      </Jumbotron.Container>
      <div className="single-movie">
        <h3 className="single-movie-title">Movie details</h3>
        <div
          className="wrapper"
          style={{
            backgroundImage: `url(${BACKDROP_PATH_SIZE}${backdrop_path})`,
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
