import * as React from 'react';
import './Lighter.scss';

export class Lighter extends React.Component{
    
    
    constructor(){
        super();
        this.state = {
            isActive: false
        }
    }
    
    toggle(){
        this.setState({
            isActive: !this.state.isActive
        }); 
    }
    
    render(){
        let dynamicStyles;
        if(this.state.isActive === true){
            dynamicStyles = {backgroundColor: 'red'};
        }else{
            dynamicStyles = {backgroundColor: 'transparent'};

        }
        return <div className="lighter">
            <div style={dynamicStyles} className="lighter__lamp"></div>
            <button className="lighter__control" onClick={this.toggle.bind(this)}>TOGGLE</button>
        </div>
    }
}