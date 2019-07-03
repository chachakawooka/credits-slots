import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './pages/App';
import Login from './pages/Login';

import theme from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Router>
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
  </ThemeProvider>,
  document.querySelector('#root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
