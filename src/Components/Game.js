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
      reel3: 2
    }

  };

  result(r) {
    const result = JSON.parse(r.smart_contract_result.v_string);
    console.log(result);
    this.setState({
      reel1: result.result.Reels[0],
      reel2: result.result.Reels[1],
      reel3: result.result.Reels[2]
    })

    this._child1.run();
    this._child2.run();
    this._child3.run();

  }
  render() {
    return (
      <>
        
        <div className={styles.spinnercontainer}>
          <Spinner item={this.state.reel1} ref={(child) => { this._child1 = child; }} timer="1000" />
          <Spinner item={this.state.reel2} ref={(child) => { this._child2 = child; }} timer="1400" />
          <Spinner item={this.state.reel3} ref={(child) => { this._child3 = child; }} timer="1700" />
        </div>
        <SendTransaction callback={this.result.bind(this)} />
      </>
    );
  }
}

export default Game;