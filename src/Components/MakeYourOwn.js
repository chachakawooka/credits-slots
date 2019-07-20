import React from 'react';
import styles from './MakeYourOwn.module.css';
import { style } from '@material-ui/system';
import config from '../config';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withRouter } from 'react-router'

class MakeYourOwn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            name: '',
            numReels: 5,
            numSymbols: 5,
            symbols:[]
        }

    };

    openMakeYourOwn() {
        this.setState({ displayed: true })
    }

    closeMakeYourOwn() {
        this.setState({ displayed: false })
    }

    name(e) {
        this.setState({ name: e.target.value })
    }

    numReels(e) {
        this.setState({ numReels: e.target.value })
    }

    numSymbols(e) {
        this.setState({ numSymbols: e.target.value })
    }

    symbols(e) {
        this.setState({ symbols: e.target.value})
    }
    
    submitMaker(){

        let jsonr = JSON.stringify({
            symbols: this.state.symbols,
            numReels: parseInt(this.state.numReels),
            name: this.state.name
        });

        this.sendTransaction({
            Target: config.makeYourOwnAddress,
            Fee: "0.1",
            Amount: 1, 
            UserData: jsonr
        },
            this.getResult.bind(this)
        )

    }

    getResult(r){
        this.closeMakeYourOwn();
        this.props.changeGame(window.Cs_PublicKey);
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

        let MakeYourOwnStyles = [styles.MakeYourOwn];
        if (this.state.displayed) {
            MakeYourOwnStyles.push(styles.MakeYourOwnOpen);
        }

        return (
            <>
                <div className={styles.MakeYourOwnButton} onClick={this.openMakeYourOwn.bind(this)}><span>MakeYourOwn Slot</span></div>
                <div className={MakeYourOwnStyles.join(' ')}>

                <Container component="main" maxWidth="xl">
                <CssBaseline />
                <div className={styles.paper}>
                    <h2>Make your own slot</h2>
                    <p>By making your own slot your game will automatically be eligble to win part Progressive Jackpot.  If someone wins the progressive while playing your slot.  You get a percentage of the winnings</p>
                    <p>The price is 1 CS to make your slot</p>
                    <div className={styles.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                                onChange={this.name.bind(this)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="number of reels"
                                name="number of reels"
                                type="number"
                                value={this.state.numReels}
                                autoFocus
                                onChange={this.numReels.bind(this)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="number of symbols"
                                name="number of symbols"
                                type="number"
                                value={this.state.numSymbols}
                                autoFocus
                                onChange={this.numSymbols.bind(this)}
                            />
                            <TextField
                                label="add image location for each symbol seperated by new line"
                                placeholder="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                                multiline={true}
                                fullWidth
                                rows={this.state.numSymbols}
                                rowsMax={this.state.numSymbols}
                                onChange={this.symbols.bind(this)}
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                            onClick={this.submitMaker.bind(this)}
                        >
                            Make Slot
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={styles.submit}
                            onClick={this.closeMakeYourOwn.bind(this)}
                        >
                            Close Window
                        </Button>
                    </div>
                </div>
                </Container>


                </div>
            </>
        )
    }
}

export default withRouter(MakeYourOwn);