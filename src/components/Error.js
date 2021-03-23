import React from "react";
import { Link } from "react-router-dom";

export const Error = ({ error, btnMessage, removeMarginTop }) => {
  return (
    <div
      className={`${
        removeMarginTop ? "error-modal error-modal__rmt" : "error-modal"
      }`}
    >
      <h3>Something went wrong</h3>
      <p> {error}</p>
      <Link
        className="btn"
        to="/"
        onClick={() => {
          btnMessage && window.location.reload();
        }}
      >
        {btnMessage ? btnMessage : "Show all movies"}
      </Link>
    </div>
  );
};
