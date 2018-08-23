import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';

/**
 * The map of Cesium viewer sizes.
 * @static
 * @type  {Object.<number>}
 */
export const viewerSize = {
  small: 300,
  medium: 800,
  large: 1300,
}

export default class Map extends React.PureComponent {
  static propTypes = {
    size: PropTypes.string,
  }

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
    const { size = viewerSize.medium } = this.props;

    return (
      <div id={this._id} style={{ width: `${size}px` }}/>
    );
  }
}
