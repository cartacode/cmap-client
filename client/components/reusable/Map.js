import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';
import { createViewer, destroyViewer, } from 'map/viewer';
import ToolBar from 'map/ToolBar';
import {UTILS} from 'map/Utils';
import {addKML} from 'map/kml';
import {addPoint,} from 'map/viewer';

import SideBarLeftComponent from '../live_view/SideBarLeftComponent';
import SideBarRightComponent from '../live_view/SideBarRightComponent';


/**
 * The map of Cesium viewer sizes.
 * @static
 * @type  {Object.<number>}
 */
export const viewerSize = {
  medium: 100,
};

export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="liveview-map">
        <SideBarLeftComponent />
        <SideBarRightComponent />
      </div>
    );
  }
}