import React from 'react';
import PropTypes from 'prop-types';
import './LocationInfoComponent.scss';

class LocationInfoComponent extends React.Component {

  static propTypes = {
    latlong: PropTypes.object
  }

  static defaultProps = {
    latlong: {
      latitude: 0,
      longitude: 0,
      height: 0,
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { latlong: { latitude, longitude, height } } = this.props
    return (

      <div className="col-md-12 location-info-bar">
        <div className="sidebar-bottom-block">
          <ul>
            <li className="lat-block">
              <span style={{ color: 'chartreuse' }} >LAT:</span>
              <span>{latitude}</span>
            </li>
            <li className="lon-block">
              <span>LON:</span>
              <span>{longitude}</span>
            </li>
            <li className="elv-block">
              <span>ELV:</span>
              <span>{height}</span>
            </li>
            <li className="alt-block">
              <span>ALT:</span>
              <span>{height}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LocationInfoComponent;
