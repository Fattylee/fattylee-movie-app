import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HiddenMessage } from "./compsTest/HiddenMessage";
import { TodoApp } from "./compsTest/TodoApp";
import { Home } from "./pages/Home";
import { SingleMovie } from "./pages/SingleMovie";

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
