import React from 'react';
import PropTypes from 'prop-types';

import KmlPopupAddKmlComponent from '../KmlPopupAddKml';

import './KmlPopupComponent.scss';

class KmlPopupComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'kml-popup-block right-popup-block' + (this.props.kmlPopupOpen ? ' opened' : '')}>
        <div className="scroll-pane">
          <div className="title-block">
            Add KML/KMZ
            <div className="btn-control clearfix">
              <div className="btn-curtail" />
              <div className="btn-expand" />
              <div
                className="btn-close"
                onClick={() => this.props.onPopup(false, 'kmlPopupOpen')}
              />
            </div>
          </div>

          <div>
            <KmlPopupAddKmlComponent />
          </div>
        </div>
      </div>
    );
  }
}

KmlPopupComponent.propTypes = {
  kmlPopupOpen: PropTypes.bool,
  onPopup: PropTypes.func,
};

export default KmlPopupComponent;
