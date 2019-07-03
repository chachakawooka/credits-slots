import React from 'react';

import { Link } from 'react-router-dom'

import Game from '../Components/Game'


class App extends React.Component {

  render() {

    if (!window.Url && !window.Cs_PrivateKey && !window.Cs_PublicKey) {
      return (
        <>
          <Link to="/login">Login</Link>
        </>
      );
    }
    return (
      <>
        <Game />
      </>
    );
  }
}

export default App;