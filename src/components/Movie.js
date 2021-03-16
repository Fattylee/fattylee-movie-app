import React from "react";

export const Movie = ({ title, vote_average, poster_path, overview }) => {
  const imgPath = `https://image.tmdb.org/t/p/w1280${poster_path}`;

  const setRatingClassName = (vote_average) => {
    if (vote_average >= 8) {
      return "vote-average__green";
    } else if (vote_average >= 6) {
      return "vote-average__orange";
    }
    return "vote-average__red";
  };

  return (
    <div className="movie">
      <img src="/assets/img/placeholder.jpg" alt="alt img" />
      <div className="caption">
        <h3>{title}</h3>
        <span className={`vote-average ${setRatingClassName(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="overview-overlay">
        <h3>Overview</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};
