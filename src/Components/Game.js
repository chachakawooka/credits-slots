import React from 'react';

import styles from './Game.module.css';

import { Link } from 'react-router-dom'

import SendTransaction from './SendTransaction'

import Spinner from './Spinner'


class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reel1: 1,
      reel2: 4,
      reel3: 2,
      lastWin: 0
    }

  };

  spinReels() {
    this._child1.spin();
    this._child2.spin();
    this._child3.spin();
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

  }
  render() {
    return (
      <>

        <div className={styles.gridcontainer}>
          <div className={styles.SLOTS}>

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
          <div className={styles.LOGO}></div>
          <div className={styles.SPIN}><SendTransaction onPlaceBet={this.spinReels.bind(this)} callback={this.result.bind(this)} /></div>
          <div className={styles.Bet}>1</div>
          <div className={styles.Add}></div>
          <div className={styles.Remove}></div>
        </div>


      </>
    );
  }
}

export default Game;