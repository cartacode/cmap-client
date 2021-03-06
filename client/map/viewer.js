import axios from 'axios';

import Cesium from 'cesium/Cesium';
import CesiumNavigation from "cesium-navigation-es6";
import { DrawHelper } from 'map/drawHelper';
// eslint-disable-line import/no-unresolved
//  import ViewerCesiumNavigationMixin from 'cesiumNav/viewerCesiumNavigationMixin';
import { LAYERS } from 'map/layer-names';
import { COORDINATE_SYTEM } from 'map/coordinate-system';
import { getImageryurl } from 'map/config';
import { ImageryUrls, LocalMapLayer } from 'dictionary/constants';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';

/**
 * The identifiers of the Cesium viewers in the application.
 * @type  {Object.<string>}
 */
export const viewerIdentifiers = {
  intelRequest: 'INTEL_REQUEST',
  liveView: 'LIVE_VIEW',
  location: 'LOCATION',
  collectionPlan: 'COLLECTION_PLAN',
};

export const layerIdentifiers = {
  aerial: Cesium.BingMapsStyle.AERIAL,
  road: Cesium.BingMapsStyle.ROAD,
  aerialLabels: Cesium.BingMapsStyle.AERIAL_WITH_LABELS,
};

export const layerLevels = {
  base: 0,
  top: 1,
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
export function createViewer(viewerId, elementId, LEFT_DOUBLE_CLICK, LEFT_CLICK, RIGHT_CLICK, liveViewToolBar, callback) {

  if (viewers.has(viewerId)) {
    return;
  }

  // Specify access key to get the geocodes from cesium api
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5OWUzZTI2Ni0zZmEyLTQ4MzQtYmE3NS1jMTU2MzEyOWYzZDgiLCJpZCI6NDY1OSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTM4ODk1N30.iOKoHxirli-lHdjLqb2FuXKo34CskRFrM3z7_6HPzZk';
  const viewer = new Cesium.Viewer(elementId, {
    animation: false,
    fullscreenButton: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: true,
    infoBox: true,
    sceneModePicker: false,
    selectionIndicator: false,
    navigationHelpButton: false,
    timeline: false,
    shadows: true,
    imageryProvider: new Cesium.BingMapsImageryProvider({
      url: ImageryUrls.BING_IMAGERY,
      key: 'ArOgWQkl4MCPhYGdu_lpeZ68vphHIOr4OUo5xnLt3soQLDDWt0ZeXuOeJdd5iYkf',
      mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS,
    }),
    // imageryProvider: new Cesium.WebMapServiceImageryProvider({
    //    layers: 'WORLD_RADAR:WORLDGEOTIF,asia_categorized:asia-osm',
    //    srs:'EPSG:4326',
    //    proxy: new Cesium.DefaultProxy('/proxy/'),
    //    url : 'http://18.219.160.200:9090/geoserver/wms'
    //    //  url: getImageryurl(),
    //   }),
  });

  create3DModel(viewer);
  // extend our view by the cesium navigation mixin
  let options = {};
  options.defaultResetView = Cesium.Rectangle.fromDegrees(71, 3, 90, 14);

  options.enableCompass = true;
  options.enableZoomControls = true;
  options.enableDistanceLegend = true;
  options.enableCompassOuterRing = true;
  CesiumNavigation(viewer, options);

  // Adding layers
  let layers = viewer.scene.imageryLayers;

  let alphCounter = 0.0, _layers = [];
  //for(let i=0; LAYERS[i]; i++){
  //_layers.push(layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
  //url: getImageryurl(),
  //  proxy: new Cesium.DefaultProxy('/proxy/'),
  //layers: LAYERS[i],
  //maximumLevel : 8,
  //srs: COORDINATE_SYTEM.EPSG,

  //})));
  //  layers.lower(_layers[i]);
  //  alphCounter+=((alphCounter+1)/10);
  // _layers[i].alpha = 0.5;
  // _layers[i].brightness = (i+1).toFixed(1);
  //}

  //var cesiumWidget = new Cesium.CesiumWidget(elementId, {scene3DOnly: true});
  const rightToolBar = document.getElementById("drawingToolsRight");
  if (rightToolBar) {
    var drawHelper = new DrawHelper(viewer);
    var toolbar = drawHelper.addToolbar(rightToolBar, {
      buttons: ['marker', 'polyline', 'polygon', 'circle']
    });

    let scene = viewer.scene;

    toolbar.addListener('markerCreated', function (event) {
      loggingMessage('Marker created at ' + event.position.toString());
      // create one common billboard collection for all billboards
      var b = new Cesium.BillboardCollection();
      scene.primitives.add(b);

      var billboard = b.add({
        show: true,
        position: event.position,
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        scale: 1.0,
        image: '/vendor/cesium-drawhelper-master/img/glyphicons_242_google_maps.png',
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
      });
      billboard.setEditable();
    });

    toolbar.addListener('polylineCreated', function (event) {
      loggingMessage('Polyline created with ' + event.positions.length + ' points');
      var polyline = new DrawHelper.PolylinePrimitive({
        positions: event.positions,
        width: 5,
        geodesic: true
      });
      scene.primitives.add(polyline);
      polyline.setEditable();
      polyline.addListener('onEdited', function (event) {
        loggingMessage('Polyline edited, ' + event.positions.length + ' points');
      });
    });
    toolbar.addListener('polygonCreated', function (event) {
      loggingMessage('Polygon created with ' + event.positions.length + ' points');
      var polygon = new DrawHelper.PolygonPrimitive({
        positions: event.positions,
        material: Cesium.Material.fromType('Checkerboard')
      });

      scene.primitives.add(polygon);

      polygon.setEditable();
      polygon.addListener('onEdited', function (event) {
        loggingMessage('Polygon edited, ' + event.positions.length + ' points');
      });
    });

    toolbar.addListener('circleCreated', function (event) {
      loggingMessage('Circle created: center is ' + event.center.toString() + ' and radius is ' + event.radius.toFixed(1) + ' meters');
      var circle = new DrawHelper.CirclePrimitive({
        center: event.center,
        radius: event.radius,
        material: Cesium.Material.fromType(Cesium.Material.RimLightingType)
      });

      scene.primitives.add(circle);
      circle.setEditable();
      circle.addListener('onEdited', function (event) {
        loggingMessage('Circle edited: radius is ' + event.radius.toFixed(1) + ' meters');
      });

    });
    // toolbar.addListener('extentCreated', function(event) {
    //     var extent = event.extent;
    //     loggingMessage('Extent created (N: ' + extent.north.toFixed(3) + ', E: ' + extent.east.toFixed(3) + ', S: ' + extent.south.toFixed(3) + ', W: ' + extent.west.toFixed(3) + ')');
    //     var extentPrimitive = new DrawHelper.ExtentPrimitive({
    //         extent: extent,
    //         material: Cesium.Material.fromType(Cesium.Material.StripeType)
    //     });
    //     scene.primitives.add(extentPrimitive);
    //     extentPrimitive.setEditable();
    //     extentPrimitive.addListener('onEdited', function(event) {
    //         loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    //     });
    // });

    let logging = document.getElementById('logging');
    function loggingMessage(message) {
      logging.innerHTML = message;
    }

  }
  //   var layers = viewer.scene.imageryLayers;
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

  if (!liveViewToolBar) {
    attachDoubleClick(viewer, viewerId, LEFT_DOUBLE_CLICK);
    attachLeftClick(viewer, viewerId, LEFT_CLICK);
    attachRightClick(viewer, viewerId, RIGHT_CLICK);
    viewer.cesiumWidget._creditContainer.parentNode.removeChild(viewer.cesiumWidget._creditContainer);
    viewers.set(viewerId, viewer);
    return viewer;
  }

  if (typeof callback === 'function') {
    callback();
  }

  /*Cesium.subscribeAndEvaluate(viewer.infoBox.viewModel, 'clickClosed', (newValue) => {
    console.log('clicked', newValue);
  });*/
}

export async function initialViewer(viewerId) {
  if (!viewers.has(viewerId)) {
    return;
  }

  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  const init_session = JSON.parse(localStorage.getItem("session"));
  const default_info = { longitude: -117.38380562649462, latitude: 43.38974235735528, height: 0 }

  const init_longitude = init_session.LocationLongitude ? Number(init_session.LocationLongitude) : default_info.longitude;
  const init_latitude = init_session.LocationLatitude ? Number(init_session.LocationLatitude) : default_info.latitude;

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      init_longitude,
      init_latitude,
      30000.0
      // Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height
    ),
  });

  // Add parent nodes to handle panel toggle all on/off
  viewer.entities.add({ id: 'MISSIONS-PARENT' });
  viewer.entities.add({ id: 'PLATFORMS-PARENT' });
  viewer.entities.add({ id: 'PERSONNEL-PARENT' });
  //viewer.entities.add({ id: 'air-PARENT' });



  if (viewer.infoBox) {
    viewer.infoBox.container.style.display = 'none';
  }
}

export async function changeLayer(mapLayer, layerLevel, viewerId) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  const existLayer = viewer.imageryLayers.get(layerLevel);

  if (existLayer) {
    viewer.imageryLayers.remove(existLayer, true);
  }

  if (mapLayer === LocalMapLayer.WORLD_MAP || mapLayer === LocalMapLayer.ASIA_CATEGORIZED || mapLayer === LocalMapLayer.SYRIA_LEBANON) {
    viewer.scene.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
      layers: mapLayer,
      srs: 'EPSG:4326',
      // format:'image/png',
      // proxy: new Cesium.DefaultProxy('/proxy/'),
      url: ImageryUrls.GEOSERVER_IMAGERY,
    })
    );

    create3DModel(viewer);
  } else {
    viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
      url: ImageryUrls.BING_IMAGERY,
      key: 'ArOgWQkl4MCPhYGdu_lpeZ68vphHIOr4OUo5xnLt3soQLDDWt0ZeXuOeJdd5iYkf',
      mapStyle: mapLayer,
    }), layerLevel);

    create3DModel(viewer);
  }
}

export async function flyTo(container, viewerId) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  var geocode = new Cesium.Geocoder({
    container: container,
    scene: viewer.scene,
    // autoComplete: true,
    flightDuration: 2,
    // url: 'https://dev.virtualearth.net',
    // key: 'ArOgWQkl4MCPhYGdu_lpeZ68vphHIOr4OUo5xnLt3soQLDDWt0ZeXuOeJdd5iYkf',
  });
}

export async function adjustLayerTransparency(layerLevel, alphaLevel, viewerId) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  const existLayer = viewer.imageryLayers.get(layerLevel);

  if (existLayer) {
    existLayer.alpha = alphaLevel;
  }
}

export async function addKML(KMLSource, dataSourceID, viewerId, bMoveMap = false, tooltipText) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  const existingEntity = viewer.entities.getById(dataSourceID);

  if (!existingEntity) {
    Cesium.KmlDataSource.load(KMLSource,
      {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
      }).then((kml) => {
        const missionParent = viewer.entities.getById(dataSourceID);
        const parentEntity = viewer.entities.add({
          id: dataSourceID,
          parent: missionParent,
        });

        kml.entities.values.forEach(item => {
          if (Cesium.defined(item.position)) {
            // console.log("position defined", item.billboard.image, item.id, item.position);
            addNewPinByPosition(item.position, item.billboard, item.name, item.id, viewerId, parentEntity, bMoveMap, tooltipText);
          } else if (Cesium.defined(item.polyline)) {
            // Placemark with LineString geometry
            // console.log("polyline defined");
            addPolyline(item.polyline, item.name, item.id, viewerId, parentEntity, bMoveMap, tooltipText);
          } else if (Cesium.defined(item.polygon)) {
            // Placemark with Polygon geometry
            // console.log("polygon defined");
            addPolygon(item.polygon, item.name, item.id, viewerId, parentEntity, bMoveMap, tooltipText);
          } else if (Cesium.defined(item.wall)) {
            // console.log("wall defined");
            addWall(item.wall, item.name, item.id, viewerId, parentEntity, bMoveMap, tooltipText);
          }
        });
      }, (error) => {
        console.log('error', KMLSource, error);
      });
  } else {
    toggleShowEntity(dataSourceID, true, viewerId);

    if (bMoveMap) {
      viewer.flyTo(existingEntity);
    }
  }
}

export function removeKML(dataSourceID, viewerId) {
  const viewer = viewers.get(viewerId);

  const children = viewer.entities.values.filter((x) => x.parent && x.parent.id === dataSourceID);

  children.forEach(item => {
    viewer.entities.removeById(item.id);
  });

  viewer.entities.removeById(dataSourceID);
}

const toggleEntityParents = (entityId, bDisplay, viewerId) => {
  const viewer = viewers.get(viewerId);
  const entity = viewer.entities.getById(entityId);

  if (entity.parent) {
    toggleEntityParents(entity.parent.id, bDisplay, viewerId);
  }

  entity.show = bDisplay;
};

const toggleEntityChildren = (entityId, bDisplay, viewerId) => {
  const viewer = viewers.get(viewerId);
  const children = viewer.entities.values.filter((x) => x.parent && x.parent.id === entityId);

  children.forEach(item => {
    toggleEntityChildren(item.id, bDisplay, viewerId);
  });

  viewer.entities.getById(entityId).show = bDisplay;
};

export async function toggleShowEntity(entityId, bDisplay, viewerId, bDestroy = false) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  if (viewer.entities && viewer.entities.getById(entityId)) {
    if (bDestroy) {
      viewer.entities.removeById(entityId);
    } else {
      toggleEntityChildren(entityId, bDisplay, viewerId);
    }

    if (bDisplay) {
      toggleEntityParents(entityId, bDisplay, viewerId);
    }
  }
}

export async function positionMap(latitude, longitude, viewerId, uniqueId) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  if(uniqueId != null && uniqueId != undefined && uniqueId != ''){
    toggleShowEntity(uniqueId, true, viewerId);
  }

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 15000.0)
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function addPolygon(polygon, labelText, polygonId, viewerId, parentEntity, bMoveMap = false) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  const newEntity = viewer.entities.add({
    id: polygonId,
    name: labelText,
    polygon: polygon,
    parent: parentEntity,
  });

  if (bMoveMap) {
    viewer.flyTo(newEntity);
  }
}

export async function addPolyline(line, labelText, lineId, viewerId, parentEntity, bMoveMap = false) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  const newEntity = viewer.entities.add({
    id: lineId,
    name: labelText,
    label: {
      text: labelText,
      font: 'small-caps bold 24px/1 sans-serif',
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.4, 1.5e7, 0.7),
      pixelOffset: new Cesium.Cartesian2(0, 10),
      fillColor: Cesium.Color.DARKBLUE,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1.0,
    },
    polyline: line,
    parent: parentEntity,
  });

  if (bMoveMap) {
    viewer.flyTo(newEntity);
  }
}

export async function addWall(wall, labelText, wallId, viewerId, parentEntity, bMoveMap = false, tooltipText) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  const newEntity = viewer.entities.add({
    id: wallId,
    label: {
      text: labelText,
      font: 'small-caps bold 24px/1 sans-serif',
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.4, 1.5e7, 0.7),
      pixelOffset: new Cesium.Cartesian2(0, 10),
      fillColor: Cesium.Color.DARKBLUE,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1.0,
    },
    wall: wall,
    description: tooltipText,
    name: labelText,
    parent: parentEntity,
  });

  if (bMoveMap) {
    viewer.flyTo(newEntity);
  }
}

export async function addCircle(centerPointLat, centerPointLong, circleText, circleId, viewerId, parentEntity, bMoveMap = false, tooltipText, circleColor) {
  if (isNaN(centerPointLat) || isNaN(centerPointLong)) { return; }

  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(5000);
    viewer = viewers.get(viewerId);
  }

  const entity = (circleId && viewer && viewer.entities && viewer.entities.getById(circleId) ? viewer.entities.getById(circleId) : null);

  if (!entity) {
    const newEntity = viewer.entities.add({
      id: circleId,
      position: Cesium.Cartesian3.fromDegrees(centerPointLong, centerPointLat),
      ellipse: {
        semiMinorAxis: 400.0,
        semiMajorAxis: 400.0,
        material: new Cesium.ColorMaterialProperty(circleColor),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 80000),
      },
      description: tooltipText,
      name: circleText,
      label: new Cesium.LabelGraphics({
        text: circleText,
        font: 'small-caps bold 12px/1 sans-serif',
        fillColor: Cesium.Color.BLACK,
        translucencyByDistance: new Cesium.NearFarScalar(0, 100, 230000, 0),
      }),
    });

    if (bMoveMap) {
      viewer.flyTo(newEntity);
    }
  }
}

export async function addNewPinByPosition(position, billboard, pinText, pinId, viewerId, parentEntity, bMoveMap = false) {
  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  const newEntity = viewer.entities.add({
    id: pinId,
    position: position,
    label: {
      text: pinText,
      font: 'small-caps bold 14px/1 sans-serif',
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.4, 1.5e7, 0.7),
      pixelOffset: new Cesium.Cartesian2(0, 10),
      fillColor: Cesium.Color.DARKBLUE,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 0.8,
    },
    billboard: billboard,
    parent: parentEntity,
  });

  if (bMoveMap) {
    viewer.flyTo(newEntity);
  }
}

export async function addNew3DPin(latitude, longitude, iconName, pinText, pinId, viewerId, tooltipLabel, tooltipText, bMoveMap = false) {
  if (isNaN(longitude) || isNaN(latitude)) { return; }

  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  let entity = (pinId && viewer && viewer.entities && viewer.entities.getById(pinId) ? viewer.entities.getById(pinId) : null);


  if (!entity) {

    //   console.log("3Did",pinId);
    // var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
    // var heading = Cesium.Math.toRadians(0);
    // var pitch = 0;
    // var roll = 0;
    // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    // var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    //
    // viewer.entities.add({
    //   id : pinId,
    //   position : position,
    //   orientation : orientation,
    //   model : {
    //       url: '/assets/models/' + iconName + '.gltf',
    //       minimumPixelSize : 40000,
    //       maximumScale : 50000,
    //       scale : 25
    //   }
    // });
    //
    // Setting position and orientation of the Entity Model
    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude,0);
    var heading = Cesium.Math.toRadians(90);
    var pitch = 200;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    // Setting path of models
    let path = '/assets/models/';
    // Creating entity of models with default visibility as hidden
    var x = viewer.entities.add({
        id : pinId,
        position: position,
        orientation: orientation,
        model: {
                uri: `${path}${iconName}.gltf`,
                minimumPixelSize: 50,
                maximumScale: 200000
            },
        //description: `lat:${latitude} lon:${longitude}, type:${iconName}`,
        description:`${tooltipText}`,
        name:`${tooltipLabel}`,
        show : false
    });
    //console.log("VIOLENT",x.id);

    // const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    //   Cesium.Cartesian3.fromDegrees(longitude, latitude, 0.0));
    //
    // Cesium.when(Cesium.Model.fromGltf({
    //   id : pinId,
    //   url: '/assets/models/' + iconName + '.gltf',
    //   modelMatrix,
    //   scale: 10000.0,
    // }), model => {
    //   console.log(model);
    //   const mapObj = viewer.scene.primitives.add(model).then(() => {
    //     if (bMoveMap) {
    //       positionMap(latitude, longitude, viewerId);
    //     }
    //   });
    // });
  } else {
    toggleShowEntity(pinId, true, viewerId);

    if (bMoveMap) {
      positionMap(latitude, longitude, viewerId);
    }
  }
}

// Function to add 3D Map Markers with Parent Entity
//  here pinId is parent Entity
export async function addNew3DPinWithParent(latitude, longitude, iconName, pinText, pinId, viewerId, tooltipLabel, tooltipText, bMoveMap = false) {
  if (isNaN(longitude) || isNaN(latitude)) { return; }

  let viewer = viewers.get(viewerId);
  alert(viewer);
  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  let entity = (pinId && viewer && viewer.entities && viewer.entities.getById(pinId) ? viewer.entities.getById(pinId) : null);


  if (!entity) {

    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude,0);
    var heading = Cesium.Math.toRadians(0);
    var pitch = 99;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    // Setting path of models
    let path = '/assets/models/';
    // Creating entity of models with default visibility as hidden
    //var id = viewer.entities.getById(pinId);
    var x = viewer.entities.add({
        id : pinId,
        position: position,
        orientation: orientation,
        model: {
                uri: `${path}${iconName}.gltf`,
                minimumPixelSize: 50,
                maximumScale: 200000
            },
        description: `lat:${latitude} lon:${longitude}, type:${iconName}`
    });
    console.log("MODEL GENERATED", JSON.stringify(x));
  } else {
    toggleShowEntity(pinId, true, viewerId);

    if (bMoveMap) {
      positionMap(latitude, longitude, viewerId);
    }
  }
}


export async function addNewPin(latitude, longitude, iconId, pinText, color, pinId, viewerId, tooltipLabel, tooltipText, bMoveMap = false) {
  // console.log(pinId, pinText);
  if (isNaN(longitude) || isNaN(latitude)) { return; }

  let viewer = viewers.get(viewerId);

  if (!viewer) {
    await sleep(3000);
    viewer = viewers.get(viewerId);
  }

  let entity = (pinId && viewer && viewer.entities && viewer.entities.getById(pinId) ? viewer.entities.getById(pinId) : null);

  if (!entity) {
    const pinBuilder = new Cesium.PinBuilder();

    if (!pinText) {
      Cesium.when(pinBuilder.fromMakiIconId(iconId, color, 36), (canvas) => {
        // alert(tooltipLabel);
        // alert(tooltipText);
        entity = viewer.entities.add({
          id: pinId,
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
          billboard: {
            image: canvas.toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          name: tooltipLabel,
          description: tooltipText,
        }).then(() => {
          if (bMoveMap) {
            positionMap(latitude, longitude, viewerId);
          }
        });
      });
    } else {
      Cesium.when(pinBuilder.fromText(pinText, color, 36), (canvas) => {
        entity = viewer.entities.add({
          id: pinId,
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
          billboard: {
            image: canvas.toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
        }).then(() => {
          if (bMoveMap) {
            positionMap(latitude, longitude, viewerId);
          }
        });
      });
    }
  } else {
    toggleShowEntity(pinId, true, viewerId);

    if (bMoveMap) {
      positionMap(latitude, longitude, viewerId);
    }
  }
}

export function removePinById(pinId, viewerId, bDestroy = false) {
  toggleShowEntity(pinId, false, viewerId, bDestroy);
}

/**
 * attachDoubleClick: returns the lat-long values of point where mouse is double clicked
 * @param {*} viewer
 */
function attachDoubleClick(viewer, viewerId, dblClickHandler) {

  var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // Event handler for left click
  screenSpaceEventHandler.setInputAction(click => {

    var clickPosition = viewer.camera.pickEllipsoid(click.position);

    var cartographicClick = Cesium.Ellipsoid.WGS84.cartesianToCartographic(clickPosition);
    var currentLatLong = {
      longitude: Cesium.Math.toDegrees(cartographicClick.longitude),
      latitude: Cesium.Math.toDegrees(cartographicClick.latitude),
      height: cartographicClick.height,
    }
    if (typeof dblClickHandler === "function") {
      dblClickHandler(currentLatLong, viewerId, viewer);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

}

async function attachLeftClick(viewer, viewerId, leftClickHandler) {
  if (!viewer) {
    await sleep(5000);
  }

  let screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
    const pickedObject = viewer.scene.pick(movement.position);
    const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);

    if (Cesium.defined(cartesian)) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

      if (Cesium.defined(pickedObject)) {
        if (pickedObject.id && pickedObject.id.description) {

          if (Cesium.defined(viewer.infoBox)) {
           /*  var frame = viewer.infoBox.frame;
            var cssLink = frame.contentDocument.createElement('link');
            cssLink.href = Cesium.buildModuleUrl('../styles/custom.scss');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            frame.contentDocument.head.appendChild(cssLink); */
            viewer.infoBox.container.id = 'left-click-container';

            viewer.infoBox.container.style.top = movement.position.y + 'px';
            viewer.infoBox.container.style.left = movement.position.x + 'px';
            viewer.infoBox.container.style.display = 'block';
            // Close Event
            viewer.infoBox.viewModel.closeClicked.addEventListener(function() { viewer.infoBox.container.style.display = 'none'; });
            
            // Hiding the lat long functionality and showing the data
            viewer.infoBox.container.childNodes[0].style.display = 'block';
            
            if(viewer.infoBox.container.childNodes[1] != '' && viewer.infoBox.container.childNodes[1] != null && viewer.infoBox.container.childNodes[1] != undefined){
              viewer.infoBox.container.childNodes[1].style.display = 'none';
            }
          }

          // commenting for the demo; continue build after demo
          /* const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
                            '<foreignObject width="100%" height="100%">' +
                            '<div xmlns="http://www.w3.org/1999/xhtml">' +
                            pickedObject.id.description.getValue() + '</div>' +
                            '</foreignObject>' +
                            '</svg>';
          console.log(svgString)
          console.log('data:image/svg+xml;base64,' + window.btoa(svgString));
          const image = new Image();
          image.src = 'data:image/svg+xml;base64,' + window.btoa(svgString);
          let canvas = document.createElement('canvas');
          canvas.width = 300;
          canvas.height = 300;

          // Need to wait for image to load before proceeding to draw
          image.onload = () => {
            canvas.getContext('2d').drawImage(image, 0, 0);
            viewer.entities.add({
              id: 'Test_SVG',
              position: Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)),
              billboard: {
                image: canvas,
              },
              // description: '<p>This is a cupcake that can be modified.</p>'
            });
          }; */
        }
      } else {
        if (Cesium.defined(viewer.infoBox)) {
          viewer.infoBox.container.style.display = 'none';
        }
      }

      if (Cesium.defined(cartographic)) {
        const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        let heightString = Number(cartographic.height);
        console.log('=====', longitudeString, latitudeString, heightString);
        heightString = heightString > 0 ? heightString : 0;

        const currentLatLong = {
          longitude: Number(longitudeString),
          latitude: Number(latitudeString),
          height: heightString,
        };

        leftClickHandler(currentLatLong, viewerId, viewer);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

async function attachRightClick(viewer, viewerId, rightClickHandler) {
  if (!viewer) {
    await sleep(5000);
  }

  // Selecting whole viewer object
  let screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // Right click functionality
  screenSpaceEventHandler.setInputAction(function onRightClick(movement) {
    const pickedObject = viewer.scene.pick(movement.position);
    console.log(pickedObject);

    // Selecting globe position from the viewer object
    const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);

    if (Cesium.defined(cartesian)) {
      // Selecting the coords from globe position
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

      if (Cesium.defined(cartographic)) {
        // Getting the lats, longs and height of clicked position
        const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        let heightString = Number(cartographic.height);

        console.log('=====', longitudeString, latitudeString, heightString);
        heightString = heightString > 0 ? heightString : 0;

        // Info box containing types of billboards
        if (Cesium.defined(viewer.infoBox)) {

          let parentDiv = document.createElement('div');
          parentDiv.id = 'parentDiv';
          let form = document.createElement('form');
          form.setAttribute('action', ' ');
          form.style.padding = '10px';

          let lats = document.createElement('P');
          lats.innerHTML = `Lat: ${latitudeString}`;

          let longs = document.createElement('P');
          longs.innerHTML = `Lng: ${longitudeString}`;

          let layerSelectDiv = document.createElement('div');
          let layerSelectLabel = document.createElement('label');
          layerSelectLabel.innerHTML = 'Layer Select : '
          let layerSelect = document.createElement("SELECT");
          layerSelect.id = 'layer-select';

          let blueForce = document.createElement("option");
          blueForce.text = 'Blue Forces';
          blueForce.value = 1;

          let intelReport = document.createElement("option");
          intelReport.text = 'Intel Report';
          intelReport.value = 2;

          let observation = document.createElement("option");
          observation.text = 'Observation';
          observation.value = 3;

          let sigact = document.createElement("option");
          sigact.text = 'SIGACT';
          sigact.value = 4;

          let media = document.createElement("option");
          media.text = 'Media';
          media.value = 5;

          layerSelect.appendChild(blueForce);
          layerSelect.appendChild(intelReport);
          layerSelect.appendChild(observation);
          layerSelect.appendChild(sigact);
          layerSelect.appendChild(media);

          layerSelectDiv.appendChild(layerSelectLabel);
          layerSelectDiv.appendChild(layerSelect);

          let titleDiv = document.createElement('div');
          let title = document.createElement('label');
          title.innerHTML = 'Title : '
          let titleInput = document.createElement('input');
          titleInput.id = 'title-input';
          titleDiv.appendChild(title);
          titleDiv.appendChild(titleInput);

          let descriptionDiv = document.createElement('div');
          let description = document.createElement('label');
          description.innerHTML = 'Description : '
          let descriptionInput = document.createElement('input');
          descriptionInput.id = 'description-input';
          descriptionDiv.appendChild(description);
          descriptionDiv.appendChild(descriptionInput);

          let fileDiv = document.createElement('div');
          let file = document.createElement('label');
          file.innerHTML = 'File Upload : '
          let fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.id = 'file-input';
          fileDiv.appendChild(file);
          fileDiv.appendChild(fileInput);

          let submitButton = document.createElement('button');
          submitButton.innerHTML = 'Submit';
          submitButton.id = 'add-icon';
          viewer.infoBox.container.id = 'right-click-container';
          submitButton.onclick = (event) => {
            event.preventDefault();
            let layer = $('#layer-select option:selected').text();
            console.log(layer);
            if (layer === 'Blue Forces')
              layer = 'horse_logo';
            else if (layer === 'Intel Report')
              layer = 'paper_list_logo';
            else if (layer === 'Observation')
              layer = 'lens_logo';
            else if (layer === 'SIGACT')
              layer = 'stats_logo';
            else if (layer === 'Media')
              layer = 'photocamera_logo';

            let title = $('#title-input').val();
            let desc = $('#description-input').val();
            let categoryId = $('#layer-select').val();
            // var path = '/assets/img/live_view/map_layer/';

            let path = '/assets/models/';

            // viewer.entities.add({
            //   position: Cesium.Cartesian3.fromDegrees(Number(longitudeString), Number(latitudeString)),
            //   billboard: {
            //     image: `${path}${layer}.png`,
            //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            //     width: 35,
            //     height: 35
            //   },
            //   name: title,
            //   description: desc
            // });
            // const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            //   Cesium.Cartesian3.fromDegrees(longitude, latitude, 0.0));

            var position = Cesium.Cartesian3.fromDegrees(Number(longitudeString), Number(latitudeString));
            var heading = Cesium.Math.toRadians(100);
            var pitch = 200;
            var roll = 0;
            var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

            let entity = viewer.entities.add({
              name: title,
              position: position,
              orientation: orientation,
              model: {
                uri: `${path}${layer}.gltf`,
                minimumPixelSize: 50,
                maximumScale: 100000,
                scale: 10
              },
              description: desc
            });
            var fileLocation = $('#file-input').val().split('\\').pop();;
           var data = {
              "name": title,
              "categoryID": categoryId,
              "description": desc,
              "fileLocation": fileLocation,
              "longitude": longitudeString,
              "latitude": latitudeString,
              "createDate": new Date()
            };
            axios.post(`${baseUrl}/MapLayer/PostMapLayer`, JSON.stringify(data), { headers: requestHeaders })

            // viewer.flyTo(entity, {maximumHeight : 100000});

            //console.log($('#file-input').val());

            //viewer.infoBox.container.id = 'right-click-container';
            viewer.infoBox.container.style.display = 'none';
          };

          form.appendChild(lats);
          form.appendChild(longs);

          form.appendChild(layerSelectDiv);

          form.appendChild(titleDiv);

          form.appendChild(descriptionDiv);

          form.appendChild(fileDiv);

          form.appendChild(submitButton);

          parentDiv.appendChild(form);

          viewer.infoBox.container.appendChild(parentDiv);
          // .getElementsByClassName('cesium-infoBox-description')

          viewer.infoBox.container.style.top = movement.position.y + 'px';
          viewer.infoBox.container.style.left = movement.position.x + 'px';
          viewer.infoBox.container.style.display = 'block';

          let box = viewer.infoBox.container;

          // remove the previous form when new form is created
          if (box.childNodes[2])
            box.removeChild(box.childNodes[1]);

          // Hide the icon data div
          box.childNodes[0].style.display = 'none';
        }

        // Object that contains lat, long, height
        const currentLatLong = {
          longitude: Number(longitudeString),
          latitude: Number(latitudeString),
          height: heightString,
        };

        // Calling the rightClickCallback functionality defined in map component
        rightClickHandler(currentLatLong, viewerId, viewer);
      }
    }
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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

// Function to toggle map layer icons
export function toggleMapLayerIcon(map_name, viewerId) {
  // const viewer = viewers.get(viewerId);
  // const entity = viewer.entities.getById(map_name);
  const viewer = viewers.get(viewerId);
  if(viewer.entities.getById(map_name) != undefined){
      const entity =viewer.entities.getById(map_name);
      //console.log("TOGGLE",entity.id);
      entity.show = !entity.show;
  }

}

export async function createParent(parent_name, viewerId){
      let viewer = viewers.get(viewerId);
      if (!viewer) {
        await sleep(5000);
        viewer = viewers.get(viewerId);
      }
    
      if(viewer != null && viewer != '' && viewer != undefined && viewer.entities.getById(parent_name) == undefined) {
        //if(viewer.entities.getById(parent_name) == undefined){

          const y = viewer.entities.add({ id: parent_name });
          // console.log("PARENT:",JSON.stringify(y));
      }
}

export function create3DModel(viewer, bMoveMap = false) {
  let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 150000.0);
  let heading = Cesium.Math.toRadians(0);
  let pitch = 90;
  let roll = 180;
  let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
  let path = '/assets/models/predator.gltf';
  let entity = viewer.entities.add({
    name: "Predator",
    position: position,
    orientation: orientation,
    model: {
      uri: path,
      minimumPixelSize: 20000,
      maximumScale: 40000
    }
  });

  if(bMoveMap) {
    viewer.zoomTo(entity);
  }
}

export function addPoint(x, y, z, viewerId, label, focus = false) {
  if (!viewers.has(viewerId)) {
    return;
  }

  const viewer = viewers.get(viewerId);

  viewer.entities.add({
    name: 'Bounding Box Center',
    position: Cesium.Cartesian3.fromDegrees(x, y, z),
    point: {
      pixelSize: 5,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2
    },
    label: {
      text: label,
      font: '14pt monospace',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9)
    }
  });

 // console.log(viewer);
  if (focus) {
    viewer.flyTo(viewer.entities);
  }

}


export function moveFar(viewerId) {

  var center = Cesium.Cartesian3.fromDegrees(-82.5, 35.3);
  viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 4200000.0));
}
