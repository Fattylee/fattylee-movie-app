import React from "react";
import { Link } from "react-router-dom";

export const Error = ({ error }) => {
  return (
    <div className="error-modal">
      <h3>Something went wrong</h3>
      <p> {error}</p>
      <Link className="btn" to="/">
        Show all movies
      </Link>
    </div>
  );
};
