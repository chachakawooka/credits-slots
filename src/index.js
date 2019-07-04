import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Route, Link, HashRouter } from 'react-router-dom'
import App from './pages/App';
import Login from './pages/Login';

import theme from './theme';
import * as serviceWorker from './serviceWorker';

import classes from './index.module.css'; 


ReactDOM.render(

  
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />

    <HashRouter basename='/'>

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Credit Slots
          </Typography>
        </Toolbar>
      </AppBar>
    </div>

    <div>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
    </div>
  </HashRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
