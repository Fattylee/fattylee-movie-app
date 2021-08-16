import React, { useCallback, useRef, useState } from "react";
import { useBookSearch } from "./useBookSearch";

export const InfiniteScroll = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, hasMore, books } = useBookSearch(query, pageNumber);

  function handleQuery(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  const observer = useRef(null);
  const lastElementNode = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((n) => n + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="enter a search word..."
        value={query}
        onChange={handleQuery}
      />
      <ol>
        {books.map((book, index) => {
          if (hasMore && books.length === index + 1)
            return (
              <li ref={lastElementNode} key={book}>
                {book}
              </li>
            );
          return <li key={book}>{book}</li>;
        })}
      </ol>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};
