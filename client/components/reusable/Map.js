import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import ToolBar from 'map/ToolBar';
import {UTILS} from 'map/Utils';
//import {addKML} from 'map/kml';
import { createViewer, createParent, addNew3DPinWithParent, destroyViewer, addCircle, addNew3DPin, changeLayer, addPoint, createTestObject, initialViewer, toggleMapLayerIcon, addNewPin, removePinById, positionMap, addKML, removeKML, adjustLayerTransparency, toggleShowEntity, flyTo } from 'map/viewer';
import Cesium from 'cesium/Cesium';
import SideBarLeftComponent from '../live_view/SideLeft';
import SideBarRightComponent from '../live_view/SideRight';
import LocationInfoComponent from '../live_view/LocationInfo';

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
    displayGridCoords: PropTypes.string,
    enableLiveViewToolBar: PropTypes.bool,
    height: PropTypes.number,
    intelReqData: PropTypes.array,
    setOneLocation: PropTypes.func,
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
      RIGHT_CLICK : this.rightClickCallback,
    }
  }

  static state = {
    latlong: PropTypes.object
  }

  componentDidMount() {
    ///console.log("BBBBBBBBB "+this.props.viewerId);
    this._viewer = createViewer(this.props.viewerId, this._elementId, this.MAP_EVENTS.LEFT_DOUBLE_CLICK, this.MAP_EVENTS.LEFT_CLICK, this.MAP_EVENTS.RIGHT_CLICK, this.props.enableLiveViewToolBar, true, this.initialSettings);
    //console.log('init settings ' + this._viewer);
    // add the default location or user location into the location bar
    const init_session = JSON.parse(localStorage.getItem('session'));
    const init_longitude = init_session.LocationLongitude? Number(init_session.LocationLongitude) : defaultLocation.longitude;
    const init_latitude = init_session.LocationLatitude? Number(init_session.LocationLatitude) : defaultLocation.latitude;
    this.setState({ latlong: { latitude: init_latitude, longitude: init_longitude, height: 0 } });

    // add pin for current user's home location
    addNewPin(init_latitude, init_longitude, 'town', null, Cesium.Color.BLUE, 'Home', this.props.viewerId);

    initialViewer(this.props.viewerId);

    // prevents Windows Chrome context menu from displaying on right-click
    $('body').on('contextmenu', '.map-wrapper', (e) => {
      e.preventDefault();
      return false;
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.displayGridCoords || this.props.displayGridCoords) {
      if(prevProps.displayGridCoords !== this.props.displayGridCoords) {
        const coords = this.getLatLongFromGridCoords(this.props.displayGridCoords);
        console.log(coords.longitude + ', ' + coords.latitude + '=======');
        this.setState({ latlong: { latitude: coords.latitude, longitude: coords.longitude, height: 0 } }, () => {
          removePinById('IR-GRID-COORDS', this.props.viewerId, true);
          addNewPin(coords.latitude, coords.longitude, 'marker', null, Cesium.Color.RED, 'IR-GRID-COORDS', this.props.viewerId, '', '', true);
          this.positionMapToCoords(coords.latitude, coords.longitude);
        });
      }
    }
  }

  componentWillUnmount() {
    //alert('kjhgfghjkhgfghjk');
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
    nearestNeighbourNAIPOI = [{city:'',id:''},{city:'',id:''}];
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
    // alert("lllll");
    if(this.props.setOneLocation) {
      // alert("pppp");
      removePinById('IR-GRID-COORDS', this.props.viewerId, true);
      addNewPin(worldPosition.latitude, worldPosition.longitude, 'marker', null, Cesium.Color.RED, 'IR-GRID-COORDS', this.props.viewerId, this.props.tooltipLabel,this.props.tooltipText, true);

      //placeholder for future code
      const returnObj = [{city:'',id:''},{city:'',id:''}];
      //this.props.setOneLocation(returnObj, worldPosition);
    }
  }

  // Right click toolbar open functionality
  rightClickCallback = (worldPosition, viewerId, viewer) => {

    // TODO - EXTRA RIGHT CLICK FUNCTIONALITY
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

  convertDMSToDD = (degrees, minutes, seconds, direction) => {
    let dd = Number(degrees) + (minutes / 60) + (seconds / 3600);

    if (direction === 'S' || direction === 'W') {
      dd *= -1;
    } // Don't do anything for N or E

    return Number(dd);
  }

  getLatLongFromGridCoords = (gridCoords) => {
    const returnObj = {
      latitude: 0,
      longitude: 0,
    };

    if(!gridCoords) {
      return returnObj;
    }

    if(gridCoords.includes('°')) {
      const parts = gridCoords.split(/[^\d\w]+/);

      returnObj.latitude = this.convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
      returnObj.longitude = this.convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    } else if(gridCoords.includes(',')) {
      const parts = gridCoords.split(',');
      returnObj.latitude = Number(parts[0]);
      returnObj.longitude = Number(parts[1]);
    }

    return returnObj;
  }

  positionMapToCoords = (lat, long, uniqueId) =>{
    this.setState({ latlong: { latitude: lat, longitude: long, height: 0 } });
    positionMap(lat, long, this.props.viewerId, uniqueId);
  }

  addPin =(lat, long, iconId, pinText, pinColor, pinId, tooltipLabel, tooltipText, pinType) =>{
    let color;
    if(pinColor === 'blue') {
      color = Cesium.Color.BLUE;
    } else if(pinColor === 'green') {
      color = Cesium.Color.GREEN;
    } else if(pinColor === 'red') {
      color = Cesium.Color.RED;
    } else if(pinColor === 'yellow') {
      color = Cesium.Color.YELLOW;
    } else if(pinColor === 'orange') {
      color = Cesium.Color.ORANGE;
    } else if(pinColor === 'lightGreen') {
      color = Cesium.Color.LIGHTGREEN;
    }

    if(pinType && pinType === 'circle') {
      addCircle(lat, long, pinText, pinId, this.props.viewerId, null, false, tooltipText, color);
    } else {
      addNewPin(lat, long, iconId, pinText, color, pinId, this.props.viewerId, tooltipLabel, tooltipText);
    }
  }

  add3DPin = (latitude, longitude, iconName, pinText, pinId, tooltipLabel, tooltipText, bMoveMap) => {
    addNew3DPin(latitude, longitude, iconName, pinText, pinId, this.props.viewerId, tooltipLabel, tooltipText, bMoveMap);
  }

  add3DPinWithParent = (latitude, longitude, iconName, pinText, pinId, tooltipLabel, tooltipText, bMoveMap) =>{
      addNew3DPinWithParent(latitude, longitude, iconName, pinText, pinId, this.props.viewerId, tooltipLabel, tooltipText, bMoveMap);
  }
  createParentMarker = (parent_name) => {
      createParent(parent_name, this.props.viewerId);
  }

  removePin =(pinId) =>{
    removePinById(pinId, this.props.viewerId);
  }
  toggleMapIcon =(map_name) =>{
      toggleMapLayerIcon(map_name, this.props.viewerId);
  }
  addKMLToMap = (kmlSrc, uniqueId, tooltipText) => {
    addKML(kmlSrc, uniqueId, this.props.viewerId, false, tooltipText);
  }

  removeKMLFromMap = (kmlDataSource) => {
    // removeKML(kmlDataSource, this.props.viewerId, this.state.KMLDataSrcCollection);
    toggleShowEntity(kmlDataSource, false, this.props.viewerId);
  }

  changeMapLayer = (newMapLayer, layerLevel) => {
    console.log('change', newMapLayer, layerLevel);
    changeLayer(newMapLayer, layerLevel, this.props.viewerId);
  }

  adjustLayerTransparency = (layerLevel, alphaLevel) => {
    console.log('adjust', layerLevel, alphaLevel);
    adjustLayerTransparency(layerLevel, alphaLevel, this.props.viewerId);
  }

  flyTo = (container) => {
    console.log('geocoder container: ' + container);
    flyTo(container, this.props.viewerId)
  }


  render() {
    const { size = viewerSize.medium, toolBarOptions, height = 100 } = this.props;
    const { latlong } = this.state;
    const toolbar_show = !toolBarOptions ? true: toolBarOptions.show;

    return (
      <div className="d-flex">
        {toolbar_show &&
          <SideBarLeftComponent
            moveMap={this.positionMapToCoords}
            addPin={this.addPin}
            add3DPin={this.add3DPin}
            removePin={this.removePin}
            addKMLToMap={this.addKMLToMap}
            removeKML={this.removeKMLFromMap}
            intelReqData={this.props.intelReqData}
            toolbar_show = {toolbar_show}
          />
        }
        <div id={this._elementId} className="map-wrapper" style={toolbar_show ? { height: `${height}vh`, width: `${size}%`, marginLeft: '36px', marginRight: '36px' }:{ height: `${height}vh`, width: `${size}%`, overflow: 'hidden'}}>
          <div id="drawingToolBar"/>
          <div id="logging"/>
          <LocationInfoComponent latlong={latlong}/>
          {/* <ToolBar lookUpMode={this.lookUpMode} options={this.props.toolBarOptions} /> */}
        </div>
        {toolbar_show &&
          <SideBarRightComponent
            setContainer={this.flyTo}
            setMapLayer={this.changeMapLayer}
            add3DPin={this.add3DPin}
            add3DPinWithParent={this.add3DPinWithParent}
            createParentMarker={this.createParentMarker}
            setLayerTransparency={this.adjustLayerTransparency}
            addKMLToMap={this.addKMLToMap}
            removeKML={this.removeKMLFromMap}
            toggleMapLayer={this.toggleMapIcon}
            toolbar_show = {toolbar_show}

          />
        }
      </div>
    );
  }
}
