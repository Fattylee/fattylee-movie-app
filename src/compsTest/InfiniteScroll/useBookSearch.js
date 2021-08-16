import { useEffect, useState } from "react";
import axios from "axios";

export const useBookSearch = (query, pageNumber) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    let cancel;
    axios({
      method: "get",
      url: "http://openlibrary.org/search.json",
      params: {
        q: query,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        setBooks((prevBooks) => [
          ...new Set([
            ...prevBooks,
            ...res?.data?.docs?.map((book) => book.title),
          ]),
        ]);
        setHasMore(res.data?.docs?.length > 0);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        if (e.isCancel) return;
        setError(e.message);
      });

    return () => {
      cancel();
    };
  }, [query, pageNumber]);
  return { loading, error, hasMore, books };
};
