import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Calendar from './Components/Calendar/Calendar.jsx';
import MainNavigation from './Shared/Components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './Shared/Context/auth-context';
import { useAuth } from './Shared/Hooks/Auth-Hook';

import { Main, GlobalStyle } from './Styles/JS/App.styles';

const App = () => {
  const { token, login, logout, userId, userName } = useAuth();

  let routes;

  routes = (
    <Switch>
      <Route path='/' exact component={Calendar} />
      <Redirect to='/' />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout
      }}
    >
      <ToastProvider placement='bottom-right'>
        <Router>
          <MainNavigation />
          <Main>{routes}</Main>
          <GlobalStyle />
        </Router>
      </ToastProvider>
    </AuthContext.Provider>
  );
};

export default App;
