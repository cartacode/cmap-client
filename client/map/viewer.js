import Cesium from 'cesium/Cesium';
import {DrawHelper} from 'map/drawHelper';
// eslint-disable-line import/no-unresolved
//  import ViewerCesiumNavigationMixin from 'cesiumNav/viewerCesiumNavigationMixin';
import {LAYERS} from 'map/layer-names';
import {COORDINATE_SYTEM} from 'map/coordinate-system';
import {getImageryurl} from 'map/config';

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
export function createViewer(viewerId, elementId, LEFT_DOUBLE_CLICK, LEFT_CLICK,liveViewToolBar) {
  if (viewers.has(viewerId)) {
    return;
  }
  const viewer = new Cesium.Viewer(elementId, {
    animation: false,
    fullscreenButton: false,
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
    //imageryProvider: new Cesium.WebMapServiceImageryProvider({
      //  layers: 'AMPS:WORLDGEOTIF',
      //  srs:'EPSG:4326',
      //  proxy: new Cesium.DefaultProxy('/proxy/'),
      //  url: getImageryurl(),
      //})
    imageryProvider: new Cesium.BingMapsImageryProvider({
      url : 'https://dev.virtualearth.net',
      key : 'ArOgWQkl4MCPhYGdu_lpeZ68vphHIOr4OUo5xnLt3soQLDDWt0ZeXuOeJdd5iYkf',
      mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS
    })
  });
  // extend our view by the cesium navigation mixin
  //   var options = {};
  //   options.defaultResetView = Cesium.Rectangle.fromDegrees(71, 3, 90, 14);

  // options.enableCompass= false;
  // options.enableZoomControls= true;
  // options.enableDistanceLegend= true;
  // options.enableCompassOuterRing= true;
  // viewer.extend(Cesium.viewerCesiumNavigationMixin, options);

  // Adding layers
  let layers = viewer.scene.imageryLayers;

  let alphCounter = 0.0, _layers=[];
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
  if(liveViewToolBar) {
    var drawHelper = new DrawHelper(viewer);
    var toolbar = drawHelper.addToolbar(document.getElementById("drawingToolBar"), {
        buttons: ['marker', 'polyline', 'polygon', 'circle']
    });
    var scene = viewer.scene;
    toolbar.addListener('markerCreated', function(event) {
      loggingMessage('Marker created at ' + event.position.toString());
      // create one common billboard collection for all billboards
      var b = new Cesium.BillboardCollection();
      scene.primitives.add(b);
      var billboard = b.add({
          show : true,
          position : event.position,
          pixelOffset : new Cesium.Cartesian2(0, 0),
          eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
          horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
          verticalOrigin : Cesium.VerticalOrigin.CENTER,
          scale : 1.0,
          image: '/vendor/cesium-drawhelper-master/img/glyphicons_242_google_maps.png',
          color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
      });
      billboard.setEditable();
    });
    toolbar.addListener('polylineCreated', function(event) {
        loggingMessage('Polyline created with ' + event.positions.length + ' points');
        var polyline = new DrawHelper.PolylinePrimitive({
            positions: event.positions,
            width: 5,
            geodesic: true
        });
        scene.primitives.add(polyline);
        polyline.setEditable();
        polyline.addListener('onEdited', function(event) {
            loggingMessage('Polyline edited, ' + event.positions.length + ' points');
        });
    });
    toolbar.addListener('polygonCreated', function(event) {
        loggingMessage('Polygon created with ' + event.positions.length + ' points');
        var polygon = new DrawHelper.PolygonPrimitive({
            positions: event.positions,
            material : Cesium.Material.fromType('Checkerboard')
        });
        scene.primitives.add(polygon);
        polygon.setEditable();
        polygon.addListener('onEdited', function(event) {
            loggingMessage('Polygon edited, ' + event.positions.length + ' points');
        });
    });
    toolbar.addListener('circleCreated', function(event) {
        loggingMessage('Circle created: center is ' + event.center.toString() + ' and radius is ' + event.radius.toFixed(1) + ' meters');
        var circle = new DrawHelper.CirclePrimitive({
            center: event.center,
            radius: event.radius,
            material: Cesium.Material.fromType(Cesium.Material.RimLightingType)
        });
        scene.primitives.add(circle);
        circle.setEditable();
        circle.addListener('onEdited', function(event) {
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
    var logging = document.getElementById('logging');
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
  //lebanonRoadsLayer.alpha = 0.3;
  // Corrects the viewer styling
  viewer.canvas.style.height = '100%';
  viewer.canvas.style.width = '100%';


  /**
   * TODO: Move to separate file
   * Attaching double click event on canvas, to retrieve lat, long values
  */
  if(!liveViewToolBar){
    attachDoubleClick(viewer, viewerId, LEFT_DOUBLE_CLICK);
    attachLeftClick(viewer, viewerId, LEFT_CLICK);
    viewer.cesiumWidget._creditContainer.parentNode.removeChild(viewer.cesiumWidget._creditContainer);
    viewers.set(viewerId, viewer);
    return viewer;
  }
}

export function initialViewer(viewerId) {
  if (!viewers.has(viewerId)) {
    return;
  }

  const viewer = viewers.get(viewerId);
  const init_session = JSON.parse(localStorage.getItem("session"));
  const default_info = { longitude: -117.38380562649462, latitude: 43.38974235735528, height: 0 }

  const init_longitude = init_session.LocationLongitude? Number(init_session.LocationLongitude) : default_info.longitude; 
  const init_latitude = init_session.LocationLatitude? Number(init_session.LocationLatitude) : default_info.latitude;

  viewer.camera.setView({
    destination : Cesium.Cartesian3.fromDegrees(
      init_longitude,
      init_latitude,
      30000.0
      //Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height
    )
  });
}

export function positionMap(latitude, longitude, viewerId) {
  const viewer = viewers.get(viewerId);
  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, 15000.0)
  });

  /*viewer.camera.setView({
    destination : Cesium.Cartesian3.fromDegrees(
      longitude,
      latitude,
      10000
      //(Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height/2)
    )
  });*/
}

export function addNewPin(latitude, longitude, iconId, color, pinId, viewerId) {
  const viewer = viewers.get(viewerId);
  const pinBuilder = new Cesium.PinBuilder();

  Cesium.when(pinBuilder.fromMakiIconId(iconId, color, 36), function(canvas) {
    return viewer.entities.add({
        id : pinId,   
        position : Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard : {
            image : canvas.toDataURL(),
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        }
    });
  });
}

export function removePinById(pinId, viewerId) {
  const viewer = viewers.get(viewerId);
  viewer.entities.removeById(pinId);
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
      height:    cartographicClick.height,
    }
    if(typeof dblClickHandler === "function"){
      dblClickHandler(currentLatLong, viewerId, viewer);
    }
  },  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

}

function attachLeftClick(viewer, viewerId, leftClickHandler) {
  var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
    var cartesian = viewer.scene.pickPosition(movement.position);

    if (Cesium.defined(cartesian)) {
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      var heightString = Number(cartographic.height); 
      console.log("=====", longitudeString, latitudeString, heightString);
      heightString = heightString>0 ? heightString: 0;
      var currentLatLong = {
        longitude: Number(longitudeString),
        latitude:  Number(latitudeString),
        height:    heightString,
      }
      leftClickHandler(currentLatLong, viewerId, viewer);  
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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

export function createTestObject(viewerId) {
  const viewer = viewers.get(viewerId);

  const pinBuilder = new Cesium.PinBuilder();
  let mapData = {data:[
    {lat: 34.60247, long: 32.977567, icon: 'airport', color: Cesium.Color.GREEN},
    {lat: 44.05804819999999, long: -75.7487779, icon: 'airport', color: Cesium.Color.GREEN},
    {lat: 31.1363315, long: -97.7797049, icon: 'airport', color: Cesium.Color.GREEN},
    {lat: 31.812438, long: -106.421321, icon: 'airport', color: Cesium.Color.GREEN},
    {lat: 27.849444, long: -82.521111, icon: 'campsite', color: Cesium.Color.YELLOW},
    {lat: 33.973057, long: -80.472778, icon: 'campsite', color: Cesium.Color.YELLOW},
    {lat: 34.60247, long: 32.977567, icon: 'campsite', color: Cesium.Color.YELLOW},
    {lat: 33.562609, long: 35.36881, icon: 'campsite', color: Cesium.Color.YELLOW},
    {lat: 33.8124, long: 35.4912, icon: 'campsite', color: Cesium.Color.YELLOW},
  ]};
  
  mapData.data.forEach(pin => {
    Cesium.when(pinBuilder.fromMakiIconId(pin.icon, pin.color, 35), function(canvas) {
      return viewer.entities.add({
          position : Cesium.Cartesian3.fromDegrees(pin.long, pin.lat),
          billboard : {
              image : canvas.toDataURL(),
              verticalOrigin : Cesium.VerticalOrigin.BOTTOM
          }
      });
    });
  });

  /*var blueBox = viewer.entities.add({
      name : 'Blue box',
      position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 30000.0),
      box : {
          dimensions : new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
          material : Cesium.Color.BLUE
      }
  });

  var redBox = viewer.entities.add({
      name : 'Red box with black outline',
      position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 0.0),
      box : {
          dimensions : new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
          material : Cesium.Color.RED.withAlpha(0.5),
          outline : true,
          outlineColor : Cesium.Color.BLACK
      }
  });*/
//  viewer.zoomTo(viewer.entities);
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

  console.log(viewer);
  if(focus) {
    viewer.flyTo(viewer.entities);
  }

}
export function moveFar(viewerId){
  
  var center = Cesium.Cartesian3.fromDegrees(-82.5, 35.3);
  viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 4200000.0));
}