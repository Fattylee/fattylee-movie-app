import React, { useEffect, useState } from "react";
import { Great } from "./Great";

export const GrandChild = ({ getItems }) => {
  const [posts, setPosts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [list, setList] = useState([]);
  const [food, setFood] = useState("");
  const [listArr, setListArr] = useState([1, 2, 3]);

  useEffect(() => {
    console.log("Setting list");
    setList(getItems());
  }, [getItems]);

  useEffect(() => {
    console.log("GrandChild rendering");
  }, [JSON.stringify(posts)]);

  useEffect(() => {
    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    console.log("Add resize");
    window.addEventListener("resize", handleResize);
    return () => {
      console.log("remove resize");
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("renders from GrandChild");
  const MemoGreat = React.useMemo(
    () => <Great food={food || "No favFood"} list={listArr} />,
    [food, listArr]
  );

  return (
    <div>
      <hr />
      <button
        onClick={() => {
          setListArr([...listArr, (Math.random() * 10) | 0]);
        }}
      >
        Update ListArr
      </button>
      <input
        type="text"
        placeholder="Change favFood"
        value={food}
        onChange={(e) => {
          setFood(e.target.value);
        }}
      />
      <Great food="Eba" list={listArr} />
      {MemoGreat}
      Hello GrandChild
      <h2>{windowWidth}</h2>
      <ul>
        {list.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      <button
        style={{ padding: "10px 15px", color: "green" }}
        onClick={() => {
          const newState = [];
          newState.push({
            [posts.length]: posts.concat((Math.random() * 10) | 0),
          });
          setPosts(newState);
        }}
      >
        Mutate
      </button>
      <button
        style={{ padding: "10px 15px", color: "green" }}
        onClick={() => setPosts((state) => [...state])}
      >
        Posts
      </button>
      <pre>{JSON.stringify(posts, null, 1)}</pre>
      End - Hello GrandChild
      <hr />
    </div>
  );
};
