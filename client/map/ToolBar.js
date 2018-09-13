
import React from 'react';
export default class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () =>{
    }
    render() {
        return (
        <div>
            <div  className="ico-location" aria-hidden="true">
                <a href="#">
                <img src="/assets/img/intel_request/locationicon.png" className="ico-location--img" title="Perform KML lookup" />
                </a>
            </div>
        </div>
        )
    }
}