import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
