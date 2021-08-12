import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { SingleMovie } from "./pages/SingleMovie";

export const ButtonFat = () => (
  <div>
    <h1>
      Nice looking <button>Click here</button>
      <p>Some funky paragraph</p>
    </h1>
  </div>
);
export const HiddenMessage = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor="showMessage">Toggle Message</label>
      <input
        type="checkbox"
        name="showMessage"
        id="showMessage"
        checked={show}
        onChange={(e) => setShow(!show)}
        data-testid="hide-box"
      />
      {show ? children : null}
    </div>
  );
};
const reducer = (state, action) => {
  switch (action.type) {
    case "add-todo":
      const newState = {
        ...state,
        todos: [{ text: action.payload, completed: false }, ...state.todos],
      };
      localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    case "toggle-todo":
      const copyState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          action.payload === index
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      localStorage.setItem("todos", JSON.stringify(copyState));
      return copyState;
    default:
      return state;
  }
};

export const TodoApp = () => {
  const [{ todos }, dispatch] = useReducer(reducer, undefined, () => {
    try {
      if (localStorage.getItem("todos")) {
        const state = JSON.parse(localStorage.getItem("todos"));
        return state;
      }
    } catch (error) {}
    return { todos: [] };
  });
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Required!");
      setText("");
      return;
    }
    dispatch({ type: "add-todo", payload: text });
    setText("");
    setError(null);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {error ? <div>{error}</div> : null}
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => dispatch({ type: "toggle-todo", payload: index })}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
};

export const App = () => {
  return (
    <>
      <TodoApp />
      <HiddenMessage>Hello, secret message</HiddenMessage>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/:movieId"
            component={(prop) => <SingleMovie {...prop} />}
          />
        </Switch>
      </Router>
    </>
  );
};
