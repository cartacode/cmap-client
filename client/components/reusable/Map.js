import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';

import { createViewer, destroyViewer, } from 'map/viewer';
import ToolBar from 'map/ToolBar';

/**
 * The map of Cesium viewer sizes.
 * @static
 * @type  {Object.<number>}
 */
export const viewerSize = {
  small: 300,
  medium: 100,
  large: 1300,
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
    this.center = [];
  }

  componentDidMount() {
    this._viewer = createViewer(this.props.viewerId, this._elementId, this.props.handleClick);
  }

  componentWillUnmount() {
    destroyViewer(this.props.viewerId);
    this._viewer = null;
  }

  render() {
    const { size = viewerSize.medium } = this.props;

    return (
      <div id={this._elementId} className="map-wrapper" style={{ width: `${size}%` }}>
        <ToolBar></ToolBar>
      </div>
    );
  }
}
