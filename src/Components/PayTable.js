import React from 'react';
import styles from './PayTable.module.css';
import { style } from '@material-ui/system';
import config from '../config';

class PayTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayed: false,
      topPrizes: [],
      secondPrizes: [],
      progressive: 10000
    }

    this.getPrizes();
  };


  openPayTable() {
    this.setState({ displayed: true })
  }

  closePayTable() {
    this.setState({ displayed: false })
  }

  getPrizes() {

    this.sendTransaction({
      Target: config.slotAdress,
      Fee: "0.01",
      SmartContract: {
        Method: "getTopPrizes",
        NewState: true,
        Params: [
          { K: "INT", V: this.props.symbols.length },
          { K: "INT", V: this.props.reels }
        ]
      },

    },
      this.updateTopPrizes.bind(this)
    )

    this.sendTransaction({
      Target: config.slotAdress,
      Fee: "0.01",
      SmartContract: {
        Method: "getSecondTierPrizes",
        NewState: true,
        Params: [
          { K: "INT", V: this.props.symbols.length },
          { K: "INT", V: this.props.reels }
        ]
      },

    },
      this.updateSecondPrizes.bind(this)
    )

    this.sendTransaction({
      Target: config.slotAdress,
      Fee: "0.01",
      SmartContract: {
        Method: "getProgressiveJackpot",
        NewState: true
      },

    },
      this.updateProgressive.bind(this)
    )

  }

  updateProgressive(r) {
    this.setState({ progressive: r.smart_contract_result.v_double });
  }

  updateTopPrizes(r) {
    let prizes = []
    r.smart_contract_result.v_list.map(function (list) {
      prizes.push(list.v_double_box);
    });
    this.setState({ topPrizes: prizes.reverse() })
  }

  updateSecondPrizes(r) {
    console.log(r);
    let prizes = []
    r.smart_contract_result.v_list.map(function (list) {
      prizes.push(list.v_double_box);
    });
    this.setState({ secondPrizes: prizes.reverse() })
  }

  sendTransaction(val, callback) {
    val.Source = window.Base58.decode(window.Cs_PublicKey);
    val.PrivateKey = window.Base58.decode(window.Cs_PrivateKey);
    let Trans = window.SignCS.CreateTransaction(val);
    this.TransactionFlow(Trans.Result, callback)
  }

  TransactionFlow(result, callback) {
    window.SignCS.Connect().TransactionFlow(result, callback)
  }

  render() {

    let payGridStyles = [styles.PayTableGrid];
    if (this.state.displayed) {
      payGridStyles.push(styles.PayTableGridOpen);
    }
    return (
      <>
        <div className={styles.PayTableButton} onClick={this.openPayTable.bind(this)}><span>Pay Table</span></div>
        <div className={payGridStyles.join(' ')} onClick={this.closePayTable.bind(this)}>
          <div className={styles.PROGRESSIVE}>PROGRESSIVE JACKPOT
            <div>{this.state.progressive} CS <span> 10% is paid to game maker</span></div>
            
          </div>
          <div className={styles.JACKPOTSYMBOL}>
            <img src={this.props.symbols[0]} />
            <dl>
              {this.state.topPrizes.map((val, index) =>
              <>
                <dt>{this.props.reels - index} Pays</dt>
                <dd>{val} CS</dd>
              </>
              )}
            </dl>
          </div>
          <div className={styles.OTHERSYMBOLS}>
                <div className="images">
                {this.state.secondPrizes.map((val, index) =>
                    {
                      if(index > 0)
                        return <img src={this.props.symbols[index]} />
                    }
                  )}
                </div>
            <dl>
              {this.state.secondPrizes.map((val, index) =>
              <>
                <dt>{this.props.reels - index} Pays</dt>
                <dd>{val} CS</dd>
              </>
              )}
            </dl>

          </div>
        </div>
      </>
    );
  }
}

export default PayTable;