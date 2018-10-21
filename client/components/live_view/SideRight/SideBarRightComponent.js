import React from 'react';

import MapsPopupComponent from './MapsPopup';
import DrawingPopupComponent from './DrawingPopup';

import './SideBarRightComponent.scss';

class SideBarRightComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapsPopupOpen: false,
      drawingPopupOpen: false,
    };
  }

  onPopup = (opened, popupType, event) => {
    if (event) {
      this.preventEvent(event);
    }
    this.setState({
      [popupType]: opened,
    });
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="sidebar-right-block sidebar-block">
          <ul>
            <li className="maps-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'mapsPopupOpen', e)}><span>Maps</span></a>
            </li>
            <li className="geo-admin">
              <a target="_blank" href="http://localhost/geoserver/web"><span>GeoAdmin</span></a>
            </li>
            <li className="layers-link">
              <a href="#" onClick={this.preventEvent}><span>Layers</span></a>
            </li>
            <li className="drawing-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'drawingPopupOpen', e)}><span>Drawing</span></a>
            </li>
            <li className="measure-link">
              <a href="#" onClick={this.preventEvent}><span>Measure</span></a>
            </li>
            <li className="tools-link">
              <a href="#" onClick={this.preventEvent}><span>Tools</span></a>
            </li>
            <li className="details-link">
              <a href="#" onClick={this.preventEvent}><span>Details</span></a>
            </li>
            <li className="search-link">
              <a href="#" onClick={this.preventEvent}><span>Search</span></a>
            </li>
            <li className="timeline-link">
              <a href="#" onClick={this.preventEvent}><span>Timeline</span></a>
            </li>
            <li className="sysadmin-link">
              <a href="#" onClick={this.preventEvent}><span>Sys Admin</span></a>
            </li>
          </ul>
        </div>
        <MapsPopupComponent
          onPopup={this.onPopup}
          mapsPopupOpen={this.state.mapsPopupOpen}
        />
        <DrawingPopupComponent
          onPopup={this.onPopup}
          drawingPopupOpen={this.state.drawingPopupOpen}
        />
      </div>
    );
  }
}

export default SideBarRightComponent;
