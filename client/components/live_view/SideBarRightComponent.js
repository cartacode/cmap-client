import React from 'react';

class SideBarRightComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="sidebar-right-block sidebar-block">
        <ul>
          <li className="maps-link">
            <a href="#"><span>Maps</span></a>
          </li>
          <li className="geo-admin">
            <a target="_blank" href="http://localhost/geoserver/web"><span>GeoAdmin</span></a>
          </li>
          <li className="layers-link">
            <a href="#"><span>Layers</span></a>
          </li>
          <li className="drawing-link">
            <a href="#"><span>Drawing</span></a>
          </li>
          <li className="measure-link">
            <a href="#"><span>Measure</span></a>
          </li>
          <li className="tools-link">
            <a href="#"><span>Tools</span></a>
          </li>
          <li className="details-link">
            <a href="#"><span>Details</span></a>
          </li>
          <li className="search-link">
            <a href="#"><span>Search</span></a>
          </li>
          <li className="timeline-link">
            <a href="#"><span>Timeline</span></a>
          </li>
          <li className="sysadmin-link">
            <a href="#"><span>Sys Admin</span></a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBarRightComponent;
