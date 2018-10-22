import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import { createViewer, destroyViewer, } from 'map/viewer';
import ToolBar from 'map/ToolBar';
import {UTILS} from 'map/Utils';
import {addKML} from 'map/kml';
import {addPoint,} from 'map/viewer';

import SideBarLeftComponent from '../live_view/SideLeft';
import SideBarRightComponent from '../live_view/SideRight';


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
    };
  }

  componentDidMount() {
    this._viewer = createViewer(this.props.viewerId, this._elementId, this.props.enableLiveViewToolBar);
  }

  componentWillUnmount() {
    destroyViewer(this.props.viewerId);
    this._viewer = null;
  }

  lookUpMode = (mode, isSet) =>{
    this.mapOperatingMode = isSet && mode;
  }

  render() {
    const { size = viewerSize.medium } = this.props;
    return (
      <div className="d-flex">
        <SideBarLeftComponent />
        <div id={this._elementId} className="map-wrapper" style={{ width: `${size}%`, marginLeft: '36px', marginRight: '36px' }} />
        <SideBarRightComponent />
      </div>
    );
  }
}