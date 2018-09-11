import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid/v4';

import { createViewer, destroyViewer, addPoint } from 'map/viewer';

import { addKML } from '../../map/kml';

import { getCoordinates } from '../../map/processKML';

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
    this._viewer = createViewer(this.props.viewerId, this._elementId);
    if(this.props.kmlDataSource){
        ObjectfromXML(this.props.kmlDataSource[0]).then(function(res){
         return processsXML(res);
      }).then(res=>{ 
        console.log("ress", res);

        var arr = res;
        if(JSON.parse(localStorage.getItem("centerPoints"))){
          arr = JSON.parse(localStorage.getItem("centerPoints"));
          arr[arr.length-1] = res;
        }

        //JSON.parse(localStorage.getItem("centerPoints")).length > 0 ? JSON.parse(localStorage.getItem("centerPoints")).push(res) : "";
        localStorage.setItem("centerPoints", JSON.stringify(arr));
        
        for(let i =0; this.props.kmlDataSource[i];i++){
          addKML(this.props.kmlDataSource[i], this.props.viewerId);
        }
        
        
        
      });
        
     
    }

  }

  componentWillUnmount() {
    destroyViewer(this.props.viewerId);
    this._viewer = null;
  }

  render() {
    const { size = viewerSize.medium } = this.props;

    return (
      <div id={this._elementId} style={{ width: `${size}%` }}/>
    );
  }
}
