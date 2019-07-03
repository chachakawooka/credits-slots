import React from 'react';

class sendTransaction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            balance: {
                integral: 0,
                fraction: 0
            }
        }
    }

    placeBet() {

        let jsonr = JSON.stringify({
        })


        this.sendTransaction({
            Target: "CiFFcwTzemsG6msVfBy2vSpPA8rLVA1VUGSuLcAJSh1h",
            Fee: "0.1",
            Amount: 1,
            UserData: jsonr
        },
            this.getResult.bind(this)
        )

    }


    getResult() {

        this.sendTransaction({
            Target: "CiFFcwTzemsG6msVfBy2vSpPA8rLVA1VUGSuLcAJSh1h",
            Fee: "0.01",
            SmartContract: {
                Method: "getResult",
                NewState: true
            }
        },
            this.props.callback.bind(this)
        )

    }

    sendTransaction(val,callback) {
        val.Source = window.Base58.decode(window.Cs_PublicKey);
        val.PrivateKey = window.Base58.decode(window.Cs_PrivateKey);
        let Trans = window.SignCS.CreateTransaction(val);
        this.TransactionFlow(Trans.Result,callback)
    }

    TransactionFlow(result,callback){
        window.SignCS.Connect().TransactionFlow(result,callback)
    }



    render() {

        return (
            <>
                <button onClick={this.placeBet.bind(this)} />
            </>
        );
    }
}

export default sendTransaction;