import React from 'react';
import PropTypes from 'prop-types';

import DrawingPopupAddMarkerComponent from '../DrawingPopupAddMarker';
import DrawingPopupAddPolygonComponent from '../DrawingPopupAddPolygon';
import DrawingPopupAddCircleComponent from '../DrawingPopupAddCircle';
import DrawingPopupAddPathComponent from '../DrawingPopupAddPath';

import './DrawingPopupComponent.scss';

class DrawingPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addPopOpens: [
        false, // addMarkerOpen
        false, // addPolygonOpen
        false, // addCircleOpen
        false, // addPathOpen
        false, // addDropOpen
      ]
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  onShowAddPanel = (addStateIndex, event) => {
    this.preventEvent(event);
    this.setState({
      addPopOpens: this.state.addPopOpens.map((item, i) => {
        if (i === addStateIndex) {
          return true;
        }
        return false;
      }),
    });
  }

  render() {
    const { addPopOpens } = this.state;
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
            <div id="drawingToolsRight" className="figures-block primary-list-block clearfix">
              
            </div>
          </div>

          <div>
            <DrawingPopupAddMarkerComponent
              showOpen={addPopOpens[0]}
            />
            <DrawingPopupAddPolygonComponent
              showOpen={addPopOpens[1]}
            />
            <DrawingPopupAddCircleComponent
              showOpen={addPopOpens[2]}
            />
            <DrawingPopupAddPathComponent
              showOpen={addPopOpens[3]}
            />
          </div>
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
