import React from 'react';
import styles from './SendTransaction.module.css';

import config from '../config';

class sendTransaction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            balance: {
                integral: 0,
                fraction: 0,
                result: null,
                reels: this.props.reels,
                symbols: this.props.symbols ? this.props.symbols : 5
            }
        }
    }

    placeBet() {
        this.props.onPlaceBet();
        const gameHash = Math.random().toString().slice(8);

        this.setState({
            gameHash: gameHash
        })

        let jsonr = JSON.stringify({
            gameHash: gameHash,
            numSymbols: parseInt(this.props.symbols),
            numReels: parseInt(this.props.reels),
            gameMaker: this.props.gameMaker
        })


        this.sendTransaction({
            Target: config.slotAdress,
            Fee: "0.1",
            Amount: this.props.bet, 
            UserData: jsonr
        },
            this.getResult.bind(this)
        )

    }


    getResult() {

        this.sendTransaction({
            Target: config.slotAdress,
            Fee: "0.01",
            SmartContract: {
                Method: "getResult",
                NewState: true
            }
        },
            this.checkResult.bind(this)
        )

    }

    checkResult(r) {
        if (r && r.smart_contract_result.v_string) {
            
        console.log(JSON.parse(r.smart_contract_result.v_string));
            const result = JSON.parse(r.smart_contract_result.v_string);
            if (this.state.gameHash == result.result.gameHash) {
                this.props.callback(r);
            } else {
                setTimeout(this.getResult.bind(this), 1000);
            }

        } else {
            setTimeout(this.getResult.bind(this), 1000);
        }
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

        return (
            <>
                <div
                    className={styles.play}
                    onClick={this.placeBet.bind(this)}>
                    <div
                        className={styles.but}
                    >Spin</div>
                </div>
            </>
        );
    }
}

export default sendTransaction;