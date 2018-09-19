import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import { createViewer, destroyViewer, } from 'map/viewer';
import ToolBar from 'map/ToolBar';
import {UTILS} from 'map/Utils';
import {addKML} from "map/kml";
import {addPoint} from "map/viewer";


/**
 * The map of Cesium viewer sizes.
 * @static
 * @type  {Object.<number>}
 */
export const viewerSize = {
  medium: 100,
};

export default class Map extends React.PureComponent {
  static propTypes = {
    size: PropTypes.string,
    viewerId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this._elementId = `Map_${uuid()}`;
    this._viewer = null;
    this.lookUpMode = this.lookUpMode.bind(this);
    this.state = {
      performKMLLookUp: false,
    }
      
    this.MAP_EVENTS = {
      LEFT_DOUBLE_CLICK : this.dblClickCallback,
    
    }
  }
  dblClickCallback = (currenLatLong, viewerId, viewer) =>{
    let nearestNeighbour;
    switch(this.mapOperatingMode) {
      case "kmlLookUp":
            nearestNeighbour = UTILS["kmlLookUp"](currenLatLong, viewerId);
            let nearestPoint = nearestNeighbour.point.split(",");
            addKML(nearestNeighbour.KMLUri, viewerId);
            addPoint(Number(nearestPoint[0]), Number(nearestPoint[1]), Number(nearestPoint[2]), viewerId, "nearest point "+nearestPoint[0]+","+nearestPoint[1]);
            this.props.setCCIRPIR(nearestNeighbour);
            break;
      case "naipoiLookUp":
          nearestNeighbour = UTILS["naipoiLookUp"](currenLatLong, viewerId);
          viewer.entities.removeAll();
          addPoint(Number(nearestNeighbour[0].locationLongitude), Number(nearestNeighbour[0].locationLatitude), 0,viewerId, "Nearest "+nearestNeighbour[0].type+" "+nearestNeighbour[0].locationLatitude+","+nearestNeighbour[0].locationLongitude, false);
          
          addPoint(Number(nearestNeighbour[1].locationLongitude), Number(nearestNeighbour[1].locationLatitude), 0,viewerId, "Nearest "+nearestNeighbour[1].type+" "+nearestNeighbour[1].locationLatitude+","+nearestNeighbour[1].locationLongitude, false);
          console.log("nearest nai/poi", nearestNeighbour);
          this.props.setOneLocation(nearestNeighbour);
          break;
      default:
          addPoint(currenLatLong.longitude, currenLatLong.latitude, 0,viewerId, "Lat-Long "+currenLatLong.latitude+","+currenLatLong.longitude);
         // this.props.updateLatLong([currenLatLong.longitude, currenLatLong.latitude]);

    }
  }
  componentDidMount() {
    this._viewer = createViewer(this.props.viewerId, this._elementId, this.MAP_EVENTS.LEFT_DOUBLE_CLICK);
  }
  lookUpMode = (mode) =>{
    this.mapOperatingMode = mode;
  }
  

  componentWillUnmount() {
    destroyViewer(this.props.viewerId);
    this._viewer = null;
  }

  render() {
    const { size = viewerSize.medium } = this.props;

    return (
      <div id={this._elementId} className="map-wrapper" style={{ width: `${size}%` }}>
        <ToolBar lookUpMode={this.lookUpMode} options={this.props.toolBarOptions} />
      </div>
    );
  }
}