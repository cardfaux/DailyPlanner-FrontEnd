import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';

import App from './App';
import './Styles/CSS/index.css';

const theme = {
  colors: {
    primary: '#89cff0',
    secondary: '#f089cf'
  }
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
