import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
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

import {Navigation} from 'react-router';

import loginStyles from './Login.module.css'; 
import styles from '../Components/Game.module.css'; 


class Login extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            privateKey: '',
            publicKey: '',
            nodeUrl: 'https://proxy.cap.davidwalsh.dev'
        }
    }

    privateKey(e) {
        this.setState({ privateKey: e.target.value })
    }

    publicKey(e) {
        this.setState({ publicKey: e.target.value })
    }

    nodeUrl(e) {
        this.setState({ nodeUrl: e.target.value })
    }

    submitLogin(){
        window.Url = this.state.nodeUrl
        window.Cs_PrivateKey = this.state.privateKey
        window.Cs_PublicKey = this.state.publicKey
        
        if(window.Url && window.Cs_PrivateKey && window.Cs_PublicKey){
            this.props.history.push('/');
        }
        
    }

    render() {


        return (

            <div className={styles.gridcontainer}>
            <div className={styles.notSlots}>
            <div className={loginStyles.loginWrap}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={styles.paper}>
                    <div className={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="privateKey"
                            label="Private Key"
                            name="privateKey"
                            autoFocus
                            onChange={this.privateKey.bind(this)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="publicKey"
                            label="Public Key"
                            name="publicKey"
                            autoFocus
                            onChange={this.publicKey.bind(this)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Node"
                            label="Node"
                            name="Node"
                            autoFocus
                            value="https://proxy.cap.davidwalsh.dev"
                            onChange={this.nodeUrl.bind(this)}
                        />

<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                            onClick={this.submitLogin.bind(this)}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </Container>
            </div>
            </div>
            <div className={styles.Balance}>
              <div className={styles.topWrap}>
                <h2>Balance</h2>
                <h3>0.00</h3>
              </div>
            </div>
            <div className={styles.Win}>
              <div className={styles.topWrap}>
                <h2>Last Win</h2>
                <h3>0.00</h3>
              </div>
            </div>
          <div className={styles.LOGO}><h1>CS<em>SLOTS</em></h1></div>
          <div className={styles.PayTable}></div>
          <div className={styles.MakeYourOwn}></div>
          <div className={styles.SPIN}>
          </div>
          <div className={styles.Bet}>

          </div>
        </div>
           
        );
    }
}

export default Login;