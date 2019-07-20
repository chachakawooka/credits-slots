import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


import styles from './GamePicker.module.css';

class GamePicker extends React.Component {
    changeGame(e){
        this.props.changeGame(e.target.value);
    }
    render() {
        if(!this.props.games.length) return (<></>)
        return (
        <div className={styles.GamePicker}>
            <InputLabel htmlFor="age-helper">Pick A Game</InputLabel>
        <Select
            onChange={this.changeGame.bind(this)}
            displayEmpty
            label="Pick A Game"
            placeholder="Pick A Game"
        >

            <MenuItem value="">
                <em>CS Slots</em>
            </MenuItem>
            {this.props.games.map((val, index) =>
                <MenuItem value={val[1].maker}>{val[1].name}</MenuItem>
            )}

        </Select>
        </div>
        
        
        );
    }

}

export default GamePicker;