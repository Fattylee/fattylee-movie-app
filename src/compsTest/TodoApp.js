import { useState, useReducer, useEffect, useRef } from "react";
// import {} from "styleid-component";

const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
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
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const curentCount = useRef(-1);
  const focusInput = useRef(null);

  useEffect(() => {
    curentCount.current = curentCount.current + 1;
  });
  const handleEdit = (text, index, e) => {
    setIsEditing(true);
    setText(text);
    setEditIndex(index);
    focusInput.current.focus();
  };
  const handleCancelEdit = (e) => {
    setIsEditing(false);
    setText("");
    focusInput.current.focus();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Required!");
      setText("");
      return;
    }
    isEditing
      ? dispatch({ type: ACTIONS.EDIT_TODO, payload: { text, editIndex } })
      : dispatch({ type: ACTIONS.ADD_TODO, payload: text });
    setText("");
    setError(null);
    setIsEditing(false);
  };
  return (
    <>
      <h1>render count: {curentCount.current}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={!isEditing ? "add a new todo..." : "edit your todo..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={focusInput}
        />
        {isEditing ? (
          <button type="button" onClick={handleCancelEdit}>
            Cancel edit
          </button>
        ) : null}
        {error ? <div>{error}</div> : null}
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <button
              onClick={() =>
                dispatch({ type: ACTIONS.TOGGLE_TODO, payload: index })
              }
            >
              Toggle
            </button>
            <button
              onClick={() =>
                dispatch({ type: ACTIONS.DELETE_TODO, payload: index })
              }
            >
              Delete
            </button>
            <button onClick={handleEdit.bind(null, todo.text, index)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

function reducer(state, action) {
  let newState = state;
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      newState = {
        ...state,
        todos: [{ text: action.payload, completed: false }, ...state.todos],
      };
      saveToStorage(newState);
      return newState;
    case ACTIONS.TOGGLE_TODO:
      newState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          action.payload === index
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      saveToStorage(newState);
      return newState;
    case ACTIONS.DELETE_TODO:
      newState = {
        ...state,
        todos: state.todos.filter((todo, index) => action.payload !== index),
      };
      saveToStorage(newState);
      return newState;
    case ACTIONS.EDIT_TODO:
      newState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.editIndex
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
      saveToStorage(newState);
      return newState;
    default:
      return state;
  }
}
function saveToStorage(state) {
  localStorage.setItem("todos", JSON.stringify(state));
}

// const TodoStyle = styled;
