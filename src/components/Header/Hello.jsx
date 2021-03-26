import React, { useRef, useState, memo, useMemo, useCallback } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { Child } from "./Child";

let c = 0;
export const Hello = memo(({ textBoxRef }) => {
  const [count, setCount] = useState(0);
  const [resource, setResource] = useState("comments");
  const [values, handleChange] = useForm({ name: "" });

  const url = "https://jsonplaceholder.typicode.com/" + resource;
  const { data, loading } = useFetch(url);
  const favResource = [
    "comments",
    "posts",
    // "users",
    // "todos",
    // "albums",
    // "photos",
  ];

  const refCount = useRef(0);
  // const counterRef = useRef(0);
  console.log("Hello renders:", ++refCount.current);

  const handleClick = () => {
    console.log("handle clicked called");
    let currentIndex = favResource.indexOf(resource);
    if (++currentIndex >= favResource.length) {
      currentIndex = 0;
    }
    setResource(favResource[currentIndex]);
  };

  const computeLongestWord = useCallback((data) => {
    if (!data) data = [];

    let longestWord = "";
    data.forEach((entity) =>
      entity.body.split(/\s+/).forEach((word) => {
        // counterRef.current++;
        c++;
        if (word.length > longestWord.length) {
          longestWord = word;
        }
      })
    );

    // console.log("computeLongestWord counter", counterRef.current);
    // counterRef.current = 0;
    console.log("computeLongestWord counter", c);
    c = 0;
    return longestWord;
  }, []);

  const longest = useMemo(() => computeLongestWord(data), [
    data,
    computeLongestWord,
  ]);
  const sum = (a, b) => {
    console.log("computing sum....");
    return a + b;
  };
  const memoize = React.useMemo(() => sum(5, 6), []);
  // const res = sum(2, 3);
  // const res = memoize(3, 4);
  // console.log(res);

  // const longest = React.useCallback((data) => computeLongestWord(data), [data]);
  // const MemoChild = React.useMemo(() => <Child />, []);
  const increment = React.useCallback((v) => {
    setCount((c) => c + v);
  }, []);
  return (
    <>
      <p>COUNT: {count}</p>
      <h3>{memoize}</h3>
      <div className="rotor"></div>
      <input
        type="text"
        value={values.name}
        name={"name"}
        onChange={handleChange}
        placeholder="Enter some words"
      />
      <p>Longest: {longest}</p>
      <div onClick={() => textBoxRef.current.focus()}>Hello, react</div>
      <button onClick={handleClick}>Next resource</button>
      {!data ? (
        "Loading..."
      ) : (
        <>
          <h2>
            {loading
              ? "Loading next res..."
              : resource.slice(0, 1).toUpperCase() +
                resource.slice(1).toLowerCase()}
          </h2>
          <pre>{JSON.stringify(data, null, 1)}</pre>
        </>
      )}
    </>
  );
});
