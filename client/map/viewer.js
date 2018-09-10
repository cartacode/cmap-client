import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import {getImageryurl} from 'map/config';
import {clickHandler} from 'map/MapClickHandler';


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
export function createViewer(viewerId, elementId) {
  if (viewers.has(viewerId)) {
    return;
  }
  const viewer = new Cesium.Viewer(elementId, {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: true,
    selectionIndicator: false,
    navigationHelpButton : false,
    timeline: false,
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
viewer.canvas.addEventListener('dblclick', function(e){
  let currentLatLong = getCurrentLatLong(e, viewer);
  clickHandler[viewerId](currentLatLong, viewerId);	
}, false);

  viewer.cesiumWidget._creditContainer.parentNode.removeChild(viewer.cesiumWidget._creditContainer);

  viewers.set(viewerId, viewer);

  return viewer;
}
/**
 * getCurrentLatLong: returns the lat-long values of point where mouse is double clicked
 * @param {*} viewer 
 */
function getCurrentLatLong(e, viewer){
  var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
  var ellipsoid = viewer.scene.globe.ellipsoid;
  var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
  if (cartesian) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      return {longitude: longitudeString, latitude: latitudeString};
  } else {
    console.log('Globe was not picked');
  }

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

export function addPoint(x, y, viewerId, label){
  if (!viewers.has(viewerId)) {
    return;
  }

  const viewer = viewers.get(viewerId);
  viewer.entities.removeAll();
viewer.entities.add({
  name : 'Bounding Box Center',
  position : Cesium.Cartesian3.fromDegrees(x, y),
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
viewer.zoomTo(viewer.entities);
}