import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import React from 'react';
import uuid from 'uuid/v4';

Cesium.BingMapsApi.defaultKey =
  'KfV8wdPtnDWQhBokvFQu~XZLc5YQAVAZ9fPUgPdXJPg~At-c_UY2pdQYIGTUDYUL8ynhX4LXwO4TamJi-LhAny8yTUne6oPIjzttr1enFUez';

export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this._id = `Map_${uuid()}`;
    this._viewer = null;
  }

  componentDidMount() {
    this._viewer = new Cesium.Viewer(this._id, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      imageryProvider: Cesium.createOpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/',
      }),
      infoBox: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
    });

    this._viewer.canvas.style.height = '100%';
    this._viewer.canvas.style.width = '100%';

    this._viewer.cesiumWidget._creditContainer.parentNode.removeChild(this._viewer.cesiumWidget._creditContainer);
  }

  render() {
    return (
      <div id={this._id} style={{ height: '500px', width: '1300px' }}/>
    );
  }
}
