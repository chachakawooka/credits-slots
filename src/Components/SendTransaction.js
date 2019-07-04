import React from 'react';
import styles from './SendTransaction.module.css';

class sendTransaction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            balance: {
                integral: 0,
                fraction: 0,
                result: null
            }
        }
    }

    placeBet() {
        this.props.onPlaceBet();
        const gameHash = Math.random().toString().slice(10);

        this.setState({
            gameHash: gameHash
        })

        let jsonr = JSON.stringify({
            gameHash: gameHash
        })


        this.sendTransaction({
            Target: "C3qmJpadn5WrAt2WrE5GwAVqGYcXX6qYGPRuGVET6cQH",
            Fee: "0.1",
            Amount: 1,
            UserData: jsonr
        },
            this.getResult.bind(this)
        )

    }


    getResult() {

        this.sendTransaction({
            Target: "C3qmJpadn5WrAt2WrE5GwAVqGYcXX6qYGPRuGVET6cQH",
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