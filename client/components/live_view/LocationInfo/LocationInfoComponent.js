import React from 'react';
import './LocationInfoComponent.scss';

class LocationInfoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      elv: 0,
      alt: 0
    };
  }

  render() {
    return (

      <div className="col-md-12 location-info-bar">
        <div className="sidebar-bottom-block">
          <ul>
            <li className="lat-block">
              <span style={{ color: 'chartreuse' }} >LAT:</span>
              <span>{this.state.lat}</span>
            </li>
            <li className="lon-block">
              <span>LON:</span>
              <span>{this.state.lon}</span>
            </li>
            <li className="elv-block">
              <span>ELV:</span>
              <span>{this.state.elv}</span>
            </li>
            <li className="alt-block">
              <span>ALT:</span>
              <span>{this.state.alt}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LocationInfoComponent;
