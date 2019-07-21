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

        this._symbols = [];
        {this.props.symbols.map((val, index) =>
            this._symbols.push(<li key={index}><img src={val} /></li>)
        )}
        this._symbols.sort(function(a, b){return 0.5 - Math.random()});
        
        //go to selected reel
        setTimeout(
            this.goToReel.bind(this)
        ,this.props.timer);
    }

    goToReel(){
        let goTo=0;
        {this._symbols.map(function(val, index){
            if(val.key == this.props.item) goTo = index
        }.bind(this))}
        const margin = (goTo * this.state.itemheight) * -1;

        this.setState({
            margin: margin+'px',
            spinning: false
        })
    }

    reset(){
        this._symbols = null;
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

        if(!this._symbols){
            this._symbols = [];
            {this.props.symbols.map((val, index) =>
                this._symbols.push(<li key={index}><img src={val} /></li>)
            )}
            this._symbols.sort(function(a, b){return 0.5 - Math.random()});
        }
        
        return (
            <div className={styles.col}>
                    <ul className={spinClass} style={{marginTop : this.state.margin}}>
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                        {this._symbols}
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                        <li id="firstItem"><img src={this.props.symbols[Math.floor((Math.random() * this.props.symbols.length))]} /></li>
                    </ul>
            </div>
        )
    }
}


export default Spinner;