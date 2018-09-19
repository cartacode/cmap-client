
import React from 'react';
const MAPACTIONS = {
    Home:"resetMap",
    KMLLookUp: "kmlLookUp",
    LocationLookUp: "naipoiLookUp",
}
export default class ToolBar extends React.Component {
    constructor() {
        super();
        this.state = {
            performKMLLookUp: false,
            naipoiLookUp: false,
            resetMap: true,
        }
        
    }
    componentDidMount = () =>{
        this.setState({
            resetMap: true,
        })
    }
    // resetMap = () => {
    //     this.props.lookUpMode(MAPACTIONS.Home); 
    //     this.activate("resetMap"); 
    //  //   document.getElementsByClassName("cesium-home-button").click();
    // }
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
        let toolBar = [];
        if(!this.props.options){
            return;
        }
        if(this.props.options.kmlLookUp) {
               toolBar.push(
                    <a key={1} onClick={() => {this.props.lookUpMode(MAPACTIONS.KMLLookUp); this.activate("performKMLLookUp")}} className={this.state.performKMLLookUp ? "is-active": ""}>
                        <img src="/assets/img/icons/kmlLookup.png" className="ico-location--img" title="Perform KML lookup" />
                    </a>
                );
        }
        if(this.props.options.naipoiLookUp) {
            toolBar.push(
               
                    <a key={2} onClick={() => {this.props.lookUpMode(MAPACTIONS.LocationLookUp); this.activate("naipoiLookUp")}} className={this.state.naipoiLookUp ? "is-active": ""}>
                        <img src="/assets/img/icons/nai-poi-lookup.png" className="top-icon--img" title="Perform Location lookup" />
                    </a>
            )
        }
        return toolBar;
    }
    render() {
        return (
            <div>
                <div className="top-icon">
                    {/* <a onClick={this.resetMap} className={this.state.resetMap ? "is-active": ""}>
                            <img src="/assets/img/icons/top-icon.png" className="ico-location--img" title="Home" />
                    </a> */}
                    
                </div>
                <div  className="ico-location" aria-hidden="true">
                    {this.renderToolBar()}
                </div>
            </div>
        )
    }
}