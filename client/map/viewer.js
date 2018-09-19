import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import {getImageryurl} from 'map/config';


/**
 * The identifiers of the Cesium viewers in the application.
 * @type  {Object.<string>}
 */
export const viewerIdentifiers = {
  intelRequest: 'INTEL_REQUEST',
  liveView: 'LIVE_VIEW',
  location:'LOCATION',
};


/**
 * The map of viewer identifiers to their corresponding viewer instance.
 * @type  {Map.<string, Object>}
 */
export const viewers = new Map();

/**
 * Returns the viewer instance representing the provided viewer identifier.
 * @param   {string}  viewerId  The identifier of the viewer.
 * @param   {string}  elementId The identifier of the viewer's parent element.
 * @returns {Object}
 */
export function createViewer(viewerId, elementId, LEFT_DOUBLE_CLICK) {
  if (viewers.has(viewerId)) {
    return;
  }
  const viewer = new Cesium.Viewer(elementId, {
    animation: false,
    fullscreenButton: true,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: true,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    navigationHelpButton : false,
    timeline: false,
    shadows: true,
    // imageryProvider: new Cesium.WebMapServiceImageryProvider({
    //     layers: 'amps:WORLDGEOTIF',
    //     proxy: new Cesium.DefaultProxy('/proxy/'),
    //     url: getImageryurl(),
    //   })
  });



  var layers = viewer.scene.imageryLayers;
//   var statesLayer = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
//     url : 'http://ec2-18-218-162-242.us-east-2.compute.amazonaws.com:8080/geoserver/wms',
//     proxy: new Cesium.DefaultProxy('/proxy/'),
//     srs:'EPSG:4326',
//     layers: 'amps:states',
//     credit : 'Black Marble imagery courtesy NASA Earth Observatory'
// }));

// // statesLayer.alpha = 0.5;
// var lebanonRoadsLayer = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
//   url : 'http://ec2-18-218-162-242.us-east-2.compute.amazonaws.com:8080/geoserver/wms',
//   proxy: new Cesium.DefaultProxy('/proxy/'),
//   srs:'EPSG:4326',
//   layers: 'amps:gis_osm_roads_free_1',
//   credit : 'Black Marble imagery courtesy NASA Earth Observatory'
// }));
// lebanonRoadsLayer.alpha = 0.3;



  // Corrects the viewer styling
viewer.canvas.style.height = '100%';
viewer.canvas.style.width = '100%';


/**
 * TODO: Move to separate file
 * Attaching double click event on canvas, to retrieve lat, long values
*/
  attachDoubleClick(viewer, viewerId, LEFT_DOUBLE_CLICK)

  viewer.cesiumWidget._creditContainer.parentNode.removeChild(viewer.cesiumWidget._creditContainer);

  viewers.set(viewerId, viewer);

  return viewer;
}
/**
 * attachDoubleClick: returns the lat-long values of point where mouse is double clicked
 * @param {*} viewer 
 */
function attachDoubleClick(viewer, viewerId, dblClickHandler){
  var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // Event handler for left click
  screenSpaceEventHandler.setInputAction(click => {

    var clickPosition = viewer.camera.pickEllipsoid(click.position);

    var cartographicClick = Cesium.Ellipsoid.WGS84.cartesianToCartographic(clickPosition);
    var currentLatLong = {
      longitude: Cesium.Math.toDegrees(cartographicClick.longitude),
      latitude:  Cesium.Math.toDegrees(cartographicClick.latitude),
    }
    if(typeof dblClickHandler === "function"){
      dblClickHandler(currentLatLong, viewerId, viewer);
    }
  },  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

}

/**
 * Destroys the viewer representing the provided identifier.
 * @param {string}  viewerId  The identifier of the viewer.
 */
export function destroyViewer(viewerId) {
  if (!viewers.has(viewerId)) {
    return;
  }

  viewers.get(viewerId).destroy();
  viewers.delete(viewerId);
}

export function addPoint(x, y, z, viewerId, label, focus=false){
  if (!viewers.has(viewerId)) {
    return;
  }

  const viewer = viewers.get(viewerId);
 
  viewer.entities.add({
  name : 'Bounding Box Center',
  position : Cesium.Cartesian3.fromDegrees(x, y, z),
  point : {
      pixelSize : 5,
      color : Cesium.Color.RED,
      outlineColor : Cesium.Color.WHITE,
      outlineWidth : 2
  },
  label : {
      text : label,
      font : '14pt monospace',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth : 2,
      verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
      pixelOffset : new Cesium.Cartesian2(0, -9)
  }
});
//if(focus) {
  viewer.flyTo(viewer.entities);
//}

}
export function moveFar(viewerId){
  
  var center = Cesium.Cartesian3.fromDegrees(-82.5, 35.3);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 4200000.0));
}