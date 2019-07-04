import React from 'react';

import Button from '@material-ui/core/Button';

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

    checkResult(r){
        console.log(r);
       if(r && r.smart_contract_result.v_string){
            const result = JSON.parse(r.smart_contract_result.v_string);
            if(this.state.gameHash == result.result.gameHash){
                this.props.callback(r);
            }else{
                setTimeout(this.getResult.bind(this),1000);
            }
            
       }else{
            setTimeout(this.getResult.bind(this),1000);
       }

        
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
                 <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.placeBet.bind(this)}
                >Bet 1 CS</Button>]
            </>
        );
    }
}

export default sendTransaction;