
import React from 'react';
const MAPACTIONS = {
    KMLLookUp: "kmlLookUp",
    LocationLookUp: "naipoiLookUp",
}
export default class ToolBar extends React.Component {
    constructor() {
        super();
        this.state = {
            performKMLLookUp: false,
        }
        
    }
    componentDidMount = () =>{
    }
    activate = (selectedOption) =>{
        for(let key in this.state) {
            if(key !== selectedOption){
                this.state[key] = false;
            }
        }
        this.state[selectedOption] = !this.state[selectedOption];
        this.setState(this.state);
    }
    renderToolBar = () =>{
        if(!this.props.options){
            return;
        }
        if(this.props.options.kmlLookUp) {
            return (
                <div  className="ico-location" aria-hidden="true">
                    <a onClick={() => {this.props.lookUpMode(MAPACTIONS.KMLLookUp); this.activate("performKMLLookUp")}} className={this.state.performKMLLookUp ? "is-active": ""}>
                        <img src="/assets/img/intel_request/locationicon.png" className="ico-location--img" title="Perform KML lookup" />
                    </a>
                </div>
            );
        }
        if(this.props.options.LocationLookUp) {
            return (
                <div  className="ico-location" aria-hidden="true">
                    <a onClick={() => {this.props.lookUpMode(MAPACTIONS.LocationLookUp); this.activate("naipoiLookUp")}} className={this.state.performKMLLookUp ? "is-active": ""}>
                        <img src="/assets/img/icons" className="ico-location--img" title="Perform KML lookup" />
                    </a>
                </div>
            );
        }
    }
    render() {
        return (
        <div>
            {this.renderToolBar()}
            
        </div>
        )
    }
}