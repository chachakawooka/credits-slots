import React from 'react';

import styles from './Game.module.css';

import { Link } from 'react-router-dom'

import SendTransaction from './SendTransaction'

import Spinner from './Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { style } from '@material-ui/system';
import PayTable from './PayTable'
import MakeYourOwn from './MakeYourOwn'

class Game extends React.Component {

  constructor(props) {
    super(props);
    this._reels = [];
    this.state = {
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
    Array.apply(0, Array(parseInt(this.props.reels))).map(function (x, index) {
      this[`spinner${index}`].spin();
    }.bind(this));

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
      reels: result.result.Reels,
      lastWin: result.result.win,
      balance: 0.00
    })
    
    Array.apply(0, Array(parseInt(this.props.reels))).map(function (x, index) {
      this[`spinner${index}`].stop();
    }.bind(this));

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
    
    let reels = Array(parseInt(this.props.reels)).fill(0);
    
    if(this.state.reels){
      if(this.props.reels != this.state.reels.length) this.setState({reels: reels});
      reels = this.state.reels;
    }
    
    let spinColStyle = {
      "grid-template-columns": Array(this.props.reels).fill('1fr').join(' ')
    }

    return (
      <>

        <div className={styles.gridcontainer}>
          <div className={styles.SLOTS}>
            <div className={styles.arrowRight}></div>
            <div className={styles.arrowLeft}></div>
            <div className={this.state.winnerClassName}></div>
            <div className={styles.spinnercontainer}  style={spinColStyle}>
            {reels.map((val, index) =>
              <Spinner item={val} 
              ref={(child) => { this[`spinner${index}`] = child; }}
              timer="100" symbols={this.props.symbols}/>
            )}
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
              <h3>{this.state.lastWin} CS</h3>
            </div>
          </div>
          <div className={styles.LOGO}><h1>{this.props.name}<em>SLOTS</em></h1></div>
          <div className={styles.PayTable}><PayTable
                      reels={this.props.reels}
                      symbols={this.props.symbols}
          /></div>
          <div className={styles.SPIN}>
            <SendTransaction 
            reels={this.props.reels}
            symbols={this.props.symbols.length}
            gameMaker={this.props.gameMaker}
            bet={this.state.bet} 
            onPlaceBet={this.spinReels.bind(this)} 
            callback={this.result.bind(this)} />
          </div>
          <div className={styles.MakeYourOwn}><MakeYourOwn changeGame={this.props.changeGame} /></div>
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