import React, { useState } from "react";
import { Link } from "react-router-dom";
import { POSTER_PATH } from "../utils/constants";
import { Favourite } from "./Favourite";

export const Movie = ({
  id,
  title,
  vote_average,
  poster_path,
  overview,
  listType = null,
  handleFavourite = null,
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);

  const [toggleGlowClass, setToggleGlowClass] = useState(false);

  const imgUrl = `${POSTER_PATH}${poster_path}`;

  const setRatingClassName = (vote_average) => {
    if (vote_average >= 8) {
      return "vote-average__green";
    } else if (vote_average >= 6) {
      return "vote-average__orange";
    }
    return "vote-average__red";
  };

  return (
    <div
      className={toggleGlowClass ? "movie glow" : "movie "}
      onClick={(e) => {
        if (e.target.textContent === "+") {
          setToggleGlowClass((prevState) => !prevState);
          setTimeout(() => {
            setToggleGlowClass((prevState) => !prevState);
          }, 500);
        }
      }}
    >
      <Link to={"/" + id}>
        <img
          src={poster_path ? imgUrl : "/assets/img/missing-unsplash.jpg"}
          alt={title}
        />
      </Link>
      <div className="caption">
        <h3>{title}</h3>
        <span className={`vote-average ${setRatingClassName(vote_average)}`}>
          {vote_average}
        </span>
        <button
          type="button"
          className="overview-btn"
          onClick={(e) => {
            setToggleOverlay(!toggleOverlay);
          }}
        >
          {toggleOverlay ? "close" : "oveview"}
        </button>
      </div>
      {handleFavourite && (
        <Favourite
          listType={listType}
          handleFavourite={handleFavourite}
          id={id}
        />
      )}
      <Link
        to={"/" + id}
        className={`overview-overlay ${
          window.innerWidth <= 564
            ? toggleOverlay
              ? "overview-overlay--toggle"
              : ""
            : ""
        }`}
      >
        <h3>Overview</h3>
        <p>{overview}</p>
      </Link>
    </div>
  );
};
