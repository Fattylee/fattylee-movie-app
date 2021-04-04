import React, { useState, memo, useMemo, useCallback, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { Child } from "./Child";

const MemoChild = memo(Child);
// let c = 0;
export const Hello = ({ textBoxRef }) => {
  useEffect(() => {
    console.log("Hello mounted");
    return () => {
      console.log("Hello Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Hello render");
  });

  // const [count, setCount] = useState(0);
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

  // const refCount = useRef(0);
  // const counterRef = useRef(0);
  // console.log("Hello renders:", ++refCount.current);

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
        // c++;
        if (word.length > longestWord.length) {
          longestWord = word;
        }
      })
    );

    // console.log("computeLongestWord counter", c);
    // c = 0;
    return longestWord;
  }, []);

  const longest = useMemo(() => computeLongestWord(data), [
    data,
    computeLongestWord,
  ]);
  const sum = (a, b) => {
    // console.log("computing sum....");
    return a + b;
  };
  const memoize = React.useMemo(() => sum(5, 6), []);

  // const Papa = React.useMemo(() => Increment, []);
  // console.log(increment(9));
  // const arr = React.useCallback((first = 999) => [first, 1, 2, 3, 4], []);

  // const Papa = React.useMemo(() => <Child />);
  const increment = (num) => {
    console.log(num);
  };
  const memoArr = React.useMemo(() => {
    const arr = [1, 2, 3, 4];
    return arr;
  }, []);
  return (
    <>
      {/* {Papa} */}
      <MemoChild num={memoArr} increment={increment} />
      {/* <Papa lost="lost" /> */}
      {/* <p>COUNT: {count}</p> */}
      <h3>memoize: {memoize}</h3>
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
};
