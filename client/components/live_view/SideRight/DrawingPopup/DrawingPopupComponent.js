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
            <div className="figures-block primary-list-block clearfix">
              <div className={'drop-poi-link' + (addPopOpens[4] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(4, e)}>Drop</a>
              </div>
              <div className={'rectangle-link' + (addPopOpens[0] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(0, e)}>Rectangle</a>
              </div>
              <div className={'polygon-link' + (addPopOpens[1] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(1, e)}>Polygon</a>
              </div>
              <div className={'circle-link' + (addPopOpens[2] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(2, e)}>Circle</a>
              </div>
              <div className={'path-link' + (addPopOpens[3] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(3, e)}>Path</a>
              </div>
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
