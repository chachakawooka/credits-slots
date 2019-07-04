import React from 'react';

import styles from './Spinner.module.css'; 

class Spinner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            spinning: false,
            margin: 0
        }

        this.spin = this.spin.bind(this);
        this.stop = this.stop.bind(this);
    };


    spin(){
        this.setState({
            spinning: true,
            margin: 0
        })
    }

    stop(){
        //go to selected reel
        setTimeout(
            this.goToReel.bind(this)
        ,this.props.timer);
    }

    goToReel(){
        const margin = (this.props.item * 60) * -1;

        this.setState({
            margin: margin+'%',
            spinning: false
        })
    }

    render() {
        let spinClass = '';
        if(this.state.spinning){
            spinClass = styles.spinning
        }



        return (
            <div className={styles.col}>
                    <ul className={spinClass} style={{marginTop : this.state.margin}}>
                        <li><img src={require('../image/Bitcoin.svg')} /></li>
                        <li><img src={require('../image/credits.png')} /></li>
                        <li><img src={require('../image/Litecoin.svg')} /></li>
                        <li><img src={require('../image/ether.svg')} /></li>
                        <li><img src={require('../image/Bitcoin.svg')} /></li>
                        <li><img src={require('../image/xrp.svg')} /></li>
                        <li><img src={require('../image/Bitcoin.svg')} /></li>
                        <li><img src={require('../image/credits.png')} /></li>
                    </ul>
            </div>
        )
    }
}


export default Spinner;