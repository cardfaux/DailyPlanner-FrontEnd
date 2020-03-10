import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Calendar from './Components/Calendar/Calendar.jsx';
import MainNavigation from './Shared/Components/Navigation/MainNavigation/MainNavigation';

import { Main, GlobalStyle } from './Styles/JS/App.styles';

const App = () => {
  let routes;
  routes = (
    <Switch>
      <Route path='/' exact component={Calendar} />
      <Redirect to='/' />
    </Switch>
  );

  return (
    <Router>
      <MainNavigation />
      <Main>{routes}</Main>
      <GlobalStyle />
    </Router>
  );
};

export default App;
