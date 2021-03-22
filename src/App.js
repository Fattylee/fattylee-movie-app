import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { SingleMovie } from "./pages/SingleMovie";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/:movieId"
          component={(prop) => <SingleMovie {...prop} />}
        />
      </Switch>
    </Router>
  );
};
