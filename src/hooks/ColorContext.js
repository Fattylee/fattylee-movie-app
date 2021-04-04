import { createContext, useEffect, useRef, useState } from "react";

const initColor = "red";
const ColorContext = createContext();

const ColorProvider = (props) => {
  const rerender = useRef(false);

  useEffect(() => {
    if (rerender.current) {
      console.log("Context rerender");
      return () => {
        console.log("Countext Unmount rerender");
      };
    }
  });

  useEffect(() => {
    rerender.current = true;

    console.log("Context mounted");
    return () => {
      console.log("Countext Unmounted");
    };
  }, []);

  const [color, setColor] = useState(initColor);

  return <ColorContext.Provider value={[color, setColor]} {...props} />;
};

export { ColorContext, ColorProvider };
