import React from 'react';

import styles from './Game.module.css';

import { Link } from 'react-router-dom'

import SendTransaction from './SendTransaction'

import Spinner from './Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { style } from '@material-ui/system';

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reel1: 1,
      reel2: 4,
      reel3: 2,
      lastWin: 0,
      balance: 0,
      bet: 1,
      winnerClassName: styles.winner
    }

      this.getBalance();

  };

  getBalance(){
      const Key = window.Base58.decode(window.Cs_PublicKey);
      window.SignCS.Connect().WalletBalanceGet(Key,function(r){
      if(r.status.code > 0 && r.status.message != "Not found")
      {
        this.setState({
          balance: 'error'
        } )
      } else
      {
        const balance = parseFloat(r.balance.integral + r.balance.fraction * Math.pow(10,-18)).toFixed(2)
        this.setState({
          balance: balance
        })
      }
    }.bind(this));
  }

  spinReels() {
    this._child1.spin();
    this._child2.spin();
    this._child3.spin();

    this.setState(
      {
        balance: this.state.balance - this.state.bet
      }
    )
  }

  result(r) {
    const result = JSON.parse(r.smart_contract_result.v_string);
    console.log(result);
    this.setState({
      reel1: result.result.Reels[0],
      reel2: result.result.Reels[1],
      reel3: result.result.Reels[2],
      lastWin: result.result.win,
      balance: 0.00
    })
    
    this._child1.stop();
    this._child2.stop();
    this._child3.stop();
    this.getBalance();

    if(result.result.resultIsSuccess){
      setTimeout(
        this.winSplash.bind(this)
      ,1000);

    }

  }

  winSplash(){
    this.setState({
      winnerClassName: styles.winner + ' ' + styles.winActive
    })
    setTimeout(
      this.stopSplash.bind(this)
    ,6000);
  }

  stopSplash(){
    this.setState({
      winnerClassName: styles.winner
    })
  }

  betAdd(){
    this.setState({bet: (this.state.bet+1) })
  }

  betRemove(){
    this.setState({bet: (this.state.bet-1)})
  }
  render() {
    
    return (
      <>

        <div className={styles.gridcontainer}>
          <div className={styles.SLOTS}>
            <div className={styles.arrowRight}></div>
            <div className={styles.arrowLeft}></div>
            <div className={this.state.winnerClassName}></div>
            <div className={styles.spinnercontainer}>
              <Spinner item={this.state.reel1} ref={(child) => { this._child1 = child; }} timer="100" />
              <Spinner item={this.state.reel2} ref={(child) => { this._child2 = child; }} timer="200" />
              <Spinner item={this.state.reel3} ref={(child) => { this._child3 = child; }} timer="400" />
            </div>

          </div>
          <div className={styles.Balance}>
            <div className={styles.topWrap}>
              <h2>Balance</h2>
              <h3>{this.state.balance}</h3>
            </div>
          </div>
          <div className={styles.Win}>
            <div className={styles.topWrap}>
              <h2>Last Win</h2>
              <h3>{this.state.lastWin}.00 CS</h3>
            </div>
          </div>
          <div className={styles.LOGO}><h1>CS<em>SLOTS</em></h1></div>
          <div className={styles.SPIN}><SendTransaction bet={this.state.bet} onPlaceBet={this.spinReels.bind(this)} callback={this.result.bind(this)} /></div>
          <div className={styles.Bet}>
          <div className={styles.topWrap}>
              <h2>Bet</h2>
              <h3>{this.state.bet} CS</h3>
            </div>
          </div>
          <div className={styles.Add}><FontAwesomeIcon onClick={this.betAdd.bind(this)} icon={faPlusSquare} /></div>
          <div className={styles.Remove}><FontAwesomeIcon onClick={this.betRemove.bind(this)} icon={faMinusSquare} /></div>
        </div>


      </>
    );
  }
}

export default Game;