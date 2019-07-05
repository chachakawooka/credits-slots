import React from 'react';

import { Link } from 'react-router-dom'

import Game from '../Components/Game'
import { Redirect} from 'react-router-dom'

class App extends React.Component {

  render() {

    if (!window.Url && !window.Cs_PrivateKey && !window.Cs_PublicKey) {
      return (
        <>
          <Redirect
            to={{
              pathname: "/login",
              search: ""
            }}
          />
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