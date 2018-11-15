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
    const { latlong: { latitude, longitude, height } } = this.props;

    return (

      <div className="col-md-12 location-info-bar">
        <div className="sidebar-bottom-block">
          <ul>
            <li className="lat-block">
              <span style={{ color: 'chartreuse' }} >LAT:</span>
              <span>{latitude.toFixed(4)}"</span>
            </li>
            <li className="lon-block">
              <span style={{ color: 'darkgoldenrod' }} >LON:</span>
              <span>{longitude.toFixed(4)}"</span>
            </li>
            <li className="elv-block">
              <span style={{ color: 'crimson' }} >ELV:</span>
              <span>{ height > 0 ? height.toLocaleString(): 0 }m</span>
            </li>
            <li className="alt-block">
              <span style={{ color: 'deeppink' }} >ALT:</span>
              <span>{ height > 0 ? height.toLocaleString(): 0 }m</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LocationInfoComponent;
