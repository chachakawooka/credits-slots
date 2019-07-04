import React from 'react';

import styles from './Spinner.module.css'; 

class Spinner extends React.Component {

    static iconHeight = 120;
    multiplier = Math.floor(Math.random()*(4-1)+1);
    speed = Spinner.iconHeight * this.multiplier;

    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            timeRemaining: this.props.timer
        }
        
        this.run = this.run.bind(this);
    };

    moveBackground() {
        this.setState({
            position: this.state.position - this.speed,
            timeRemaining: this.state.timeRemaining - 100
        })
    }

    tick() {
        if (this.state.timeRemaining <= 0) {
            clearInterval(this.timer);

            this.setState({
                position: (Spinner.iconHeight * this.props.item)- 25
            })

        } else {
            this.moveBackground();
        }
    }

    run(){
        this.setState({
            timeRemaining: this.props.timer
        })

        this.timer = setInterval(() => {
            this.tick()
        }, 100);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.tick()
        }, 100);
    }

    render() {

        return (
            <div
                style={{ backgroundPosition: '0px ' + this.state.position + 'px' }}
                className={styles.icons}
            />
        )
    }
}


export default Spinner;