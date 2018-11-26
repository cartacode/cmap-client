import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import { createViewer, destroyViewer, } from 'map/viewer';
import ToolBar from 'map/ToolBar';
import {UTILS} from 'map/Utils';
import {addKML} from 'map/kml';
import {addPoint, createTestObject, initialViewer, addPin} from 'map/viewer';

import SideBarLeftComponent from '../live_view/SideLeft';
import SideBarRightComponent from '../live_view/SideRight';
import LocationInfoComponent from '../live_view/LocationInfo'

/**
 * The map of Cesium viewer sizes.
 * @static
 * @type  {Object.<number>}
 */
export const viewerSize = {
  medium: 100,
};

export const defaultLocation = {
  longitude: -117.38380562649462,
  latitude: 43.38974235735528,
  height: 0
}

export default class Map extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    toolBarOptions: PropTypes.object,
    viewerId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this._elementId = `Map_${uuid()}`;
    this._viewer = null;
    this.lookUpMode = this.lookUpMode.bind(this);
    this.state = {
      performKMLLookUp: false,
    };
    this.MAP_EVENTS = {
      LEFT_DOUBLE_CLICK : this.dblClickCallback,
      LEFT_CLICK : this.leftClickCallback,
    }
  }

  static state = {
    latlong: PropTypes.object
  }

  componentDidMount() {
    this._viewer = createViewer(this.props.viewerId, this._elementId, this.MAP_EVENTS.LEFT_DOUBLE_CLICK, this.MAP_EVENTS.LEFT_CLICK, this.props.enableLiveViewToolBar, true);
    //createTestObject(this.props.viewerId);
    initialViewer(this.props.viewerId);
    addPin(this.props.viewerId);

    // add the default location or user location into the location bar
    const init_session = JSON.parse(localStorage.getItem("session"));
    const init_longitude = init_session.LocationLongitude? Number(init_session.LocationLongitude) : defaultLocation.longitude; 
    const init_latitude = init_session.LocationLatitude? Number(init_session.LocationLatitude) : defaultLocation.latitude;
    this.setState({ latlong: { latitude: init_latitude, longitude: init_longitude, height: 0 } });
  }

  componentWillUnmount() {
    destroyViewer(this.props.viewerId);
    this._viewer = null;
  }

  lookUpMode = (mode, isSet) =>{
    this.mapOperatingMode = isSet && mode;
  }

  dblClickPlotMap = (currenLatLong, viewerId, viewer) =>{
    console.log("=====currentLatLong=", currenLatLong);
    let nearestNeighbourNAIPOI;
    let nearestNeighbourKML;
    let nearestNeighbour;

    nearestNeighbourNAIPOI = UTILS['naipoiLookUp'](currenLatLong, viewerId);
    viewer.entities.removeAll();
    console.log("pass here");
    addPoint(currenLatLong.longitude, currenLatLong.latitude, 0,viewerId, 'Current Lat-Long '+currenLatLong.latitude+','+currenLatLong.longitude, true);
    addPoint(Number(nearestNeighbourNAIPOI[0].locationLongitude), Number(nearestNeighbourNAIPOI[0].locationLatitude), 0,viewerId, 'Nearest '+nearestNeighbourNAIPOI[0].type+' '+nearestNeighbourNAIPOI[0].locationLatitude+','+nearestNeighbourNAIPOI[0].locationLongitude, true);
    addPoint(Number(nearestNeighbourNAIPOI[1].locationLongitude), Number(nearestNeighbourNAIPOI[1].locationLatitude), 0,viewerId, 'Nearest '+nearestNeighbourNAIPOI[1].type+' '+nearestNeighbourNAIPOI[1].locationLatitude+','+nearestNeighbourNAIPOI[1].locationLongitude, true);
    console.log('nearest nai/poi', nearestNeighbourNAIPOI);
    this.props.setOneLocation(nearestNeighbourNAIPOI, currenLatLong);

    nearestNeighbourKML = UTILS['kmlLookUp'](currenLatLong, viewerId);
    let nearestPoint = nearestNeighbourKML.point.split(',');
    //viewer.entities.removeAll();
    addPoint(Number(nearestPoint[0]), Number(nearestPoint[1]), Number(nearestPoint[2]), viewerId, 'nearest point '+nearestPoint[0]+','+nearestPoint[1]);
    addKML(nearestNeighbourKML.KMLUri, viewerId);
    this.props.setCCIRPIR(nearestNeighbourKML);
  }

  dblClickCallback = (currenLatLong, viewerId, viewer) =>{
    this.dblClickPlotMap(currenLatLong, viewerId, viewer);
  }

  leftClickCallback = (worldPosition, viewerId, viewer) => {
    this.setState({ latlong: worldPosition });
  }

  dblClickCallback_bkp = (currenLatLong, viewerId, viewer) =>{
    let nearestNeighbour;
    switch(this.mapOperatingMode) {
      case 'kmlLookUp':
        nearestNeighbour = UTILS['kmlLookUp'](currenLatLong, viewerId);
        let nearestPoint = nearestNeighbour.point.split(',');
        viewer.entities.removeAll();
          
        addPoint(Number(nearestPoint[0]), Number(nearestPoint[1]), Number(nearestPoint[2]), viewerId, 'nearest point '+nearestPoint[0]+','+nearestPoint[1]);
        addKML(nearestNeighbour.KMLUri, viewerId);
            
        this.props.setCCIRPIR(nearestNeighbour);
        break;
      case 'naipoiLookUp':
        nearestNeighbour = UTILS['naipoiLookUp'](currenLatLong, viewerId);
        //moveFar(viewerId);
        viewer.entities.removeAll();
        addPoint(currenLatLong.longitude, currenLatLong.latitude, 0,viewerId, 'Current Lat-Long '+currenLatLong.latitude+','+currenLatLong.longitude, true);

        addPoint(Number(nearestNeighbour[0].locationLongitude), Number(nearestNeighbour[0].locationLatitude), 0,viewerId, 'Nearest '+nearestNeighbour[0].type+' '+nearestNeighbour[0].locationLatitude+','+nearestNeighbour[0].locationLongitude, true);
          
        addPoint(Number(nearestNeighbour[1].locationLongitude), Number(nearestNeighbour[1].locationLatitude), 0,viewerId, 'Nearest '+nearestNeighbour[1].type+' '+nearestNeighbour[1].locationLatitude+','+nearestNeighbour[1].locationLongitude, true);
        console.log('nearest nai/poi', nearestNeighbour);
        this.props.setOneLocation(nearestNeighbour, currenLatLong);
        break;
          
      default:
        // addPoint(currenLatLong.longitude, currenLatLong.latitude, 0,viewerId, "Current Lat-Long "+currenLatLong.latitude+","+currenLatLong.longitude, true);
        if(this.props.updateLatLong) {
          viewer.entities.removeAll();
          addPoint(currenLatLong.longitude, currenLatLong.latitude, 0,viewerId, 'Current Lat-Long '+currenLatLong.latitude+','+currenLatLong.longitude);
          this.props.updateLatLong([currenLatLong.longitude, currenLatLong.latitude]);
        }
    }
  }

  render() {
    const { size = viewerSize.medium, toolBarOptions } = this.props;
    const { latlong } = this.state;
    const toolbar_show = !toolBarOptions ? true: toolBarOptions.show;

    return (
      <div className="d-flex">
        {toolbar_show && <SideBarLeftComponent /> }
        <div id={this._elementId} className="map-wrapper" style={toolbar_show ? { width: `${size}%`, marginLeft: '36px', marginRight: '36px' }:{ width: `${size}%`, overflow: 'hidden'}}>
          <div id="drawingToolBar"/>
          <div id="logging"/>
          <LocationInfoComponent latlong={latlong}/>
          {/* <ToolBar lookUpMode={this.lookUpMode} options={this.props.toolBarOptions} /> */}
        </div>
        {toolbar_show && <SideBarRightComponent /> }
      </div>
    );
  }
}