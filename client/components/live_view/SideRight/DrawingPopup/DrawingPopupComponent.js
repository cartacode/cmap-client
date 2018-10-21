import React from 'react';
import PropTypes from 'prop-types';

import DrawingPopupAddMarkerComponent from '../DrawingPopupAddMarker';

import './DrawingPopupComponent.scss';

class DrawingPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addMarkerOpen: false,
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  onShowAddPanel = (addState, event) => {
    this.preventEvent(event);
    this.setState({
      [addState]: true,
    });
  }

  render() {
    return (
      <div className={'drawing-popup-block right-popup-block' + (this.props.drawingPopupOpen ? ' opened' : '')}>
        <div className="scroll-pane">
          <div className="title-block">
            DRAWING & ANNOTATION
            <div className="btn-control clearfix">
              <div className="btn-curtail" />
              <div className="btn-expand" />
              <div
                className="btn-close"
                onClick={() => this.props.onPopup(false, 'drawingPopupOpen')}
              />
            </div>
          </div>
          
          <div className="primary-tools-menu">
            <div className="figures-block primary-list-block clearfix">
              <div className="rectangle-link">
                <a href="#" onClick={(e) => this.onShowAddPanel('addMarkerOpen', e)}>Rectangle</a>
              </div>
              <div className="polygon-link">
                <a href="#">Polygon</a>
              </div>
              <div className="circle-link">
                <a href="#">Circle</a>
              </div>
              <div className="line-link">
                <a href="#">Line</a>
              </div>
              <div className="path-link">
                <a href="#">Path</a>
              </div>
            </div>
          </div>

          <div>
            <DrawingPopupAddMarkerComponent
              addMarkerOpen={this.state.addMarkerOpen}
            />
          </div>
        </div>

        <div className="buttons-control buttons-block clearfix">
          <button className="btn-clear">Clear</button>
          <button className="btn-delete">Delete</button>
          <button className="btn-save">Save</button>
        </div>
      </div>
    );
  }
}

DrawingPopupComponent.propTypes = {
  drawingPopupOpen: PropTypes.bool,
  onPopup: PropTypes.func,
};

export default DrawingPopupComponent;
