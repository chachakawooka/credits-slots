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
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

import {Navigation} from 'react-router';

const styles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



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

        const classes = this.props.classes;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div className={classes.form} noValidate>
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
                            className={classes.submit}
                            onClick={this.submitLogin.bind(this)}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);