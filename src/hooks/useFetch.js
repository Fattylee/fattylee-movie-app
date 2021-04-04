import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const unmountRef = useRef(false);

  useEffect(() => {
    // console.log("mounting ...");
    unmountRef.current = false;
    let id;
    const fetchData = async (url) => {
      try {
        setState((prevState) => ({ data: prevState.data, loading: true }));

        const response = await fetch(url);
        const data = await response.json();
        // if (!unmountRef.current) {
        id = setTimeout(() => {
          setState({ data, loading: false });
        }, 2000);
        // }
      } catch (error) {
        setState({ data: null, error, loading: false });
      }
    };
    fetchData(url);

    return () => {
      // console.log("unmounting ...");
      unmountRef.current = true;
      clearTimeout(id);
    };
  }, [url]);

  return state;
};
