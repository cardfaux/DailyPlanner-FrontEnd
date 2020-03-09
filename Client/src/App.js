import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Calendar from "./Components/Calendar/Calendar";

const App = () => {
  let routes;
  routes = (
    <Switch>
      <Route path="/" exact component={Calendar} />
      <Redirect to="/" />
    </Switch>
  );
  return <Router>{routes}</Router>;
};

export default App;
