import React from 'react';

import styles from './Spinner.module.css'; 

class Spinner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            spinning: false,
            margin: 0,
            itemHeight:0
        }

        this.spin = this.spin.bind(this);
        this.stop = this.stop.bind(this);
    };

    startAnimation(){
        this.setState({
            spinning: true,
            margin: 0
        })
    }
    spin(){
        setTimeout(
            this.startAnimation.bind(this)
        ,this.props.timer);
    }

    stop(){
        //go to selected reel
        setTimeout(
            this.goToReel.bind(this)
        ,this.props.timer);
    }

    goToReel(){
        const margin = (this.props.item * this.state.itemheight) * -1;

        this.setState({
            margin: margin+'px',
            spinning: false
        })
    }

    componentDidMount() {
        const height = document.getElementById('firstItem').clientHeight;
        this.setState({ itemheight: height });
    }

    render() {
        let spinClass = '';
        if(this.state.spinning){
            spinClass = styles.spinning
        }

        let last

        return (
            <div className={styles.col}>
                    <ul className={spinClass} style={{marginTop : this.state.margin}}>
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                        {this.props.symbols.map((val, index) =>
                            <li className={index + "symbol"}><img src={val} /></li>
                        )}
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                    </ul>
            </div>
        )
    }
}


export default Spinner;