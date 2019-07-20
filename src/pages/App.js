import React from 'react';

import { Link } from 'react-router-dom'

import Game from '../Components/Game'
import { Redirect} from 'react-router-dom'
import config from '../config'
import GamePicker from '../Components/GamePicker'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      games:false
    }
    if(window.Cs_PublicKey){this.getGames();} 
  };

  sendTransaction(val, callback) {
    val.Source = window.Base58.decode(window.Cs_PublicKey);
    val.PrivateKey = window.Base58.decode(window.Cs_PrivateKey);
    let Trans = window.SignCS.CreateTransaction(val);
    this.TransactionFlow(Trans.Result, callback)
  }

  TransactionFlow(result, callback) {
      window.SignCS.Connect().TransactionFlow(result, callback)
  }

  changeGame(gameId){
    this.getGames();
    this.setState({gameId: gameId});
  }

  getGames() {
    this.sendTransaction({
      Target: config.makeYourOwnAddress,
      Fee: "0.01",
      SmartContract: {
        Method: "getGames",
        NewState: true
      }
    },
      this.updateGames.bind(this)
    )

  }

  updateGames(r){
    let games = JSON.parse(r.smart_contract_result.v_string);
    games = Object.entries(games);
    this.setState({games: games});
    
  }

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
    if(this.state.games == false) this.getGames();

    if(this.state.gameId){
      console.log(this.state.gameId);
      let lookup = this.state.games;
      lookup = lookup.reduce(function(a,b){
        if(b[0] == this.state.gameId) a = b;
        return a;
      }.bind(this));
      console.log(lookup[1])
      if(lookup && lookup[1] && lookup[1].numReels){
        return (  
          <>
            <Game reels={lookup[1].numReels} name={lookup[1].name} symbols={lookup[1].symbols.split("\n")} gameMaker={lookup[1].maker} changeGame={this.changeGame.bind(this)} />        
            <GamePicker games={this.state.games} changeGame={this.changeGame.bind(this)} />
          </>
        )
      }


    }

    return (
      <>
        <Game reels={config.reels} name="Credits" symbols={config.symbols} gameMaker={config.gameMaker} changeGame={this.changeGame.bind(this)} />
        <GamePicker games={this.state.games} changeGame={this.changeGame.bind(this)} /> 
      </>
    );
    
  }
}

export default App;