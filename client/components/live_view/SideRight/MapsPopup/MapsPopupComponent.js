import React from 'react';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';

import LvSlider from '../../../reusable/Slider';

import './MapsPopupComponent.scss';

class MapsPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fusePopupOpen: false,
      sliderPercent: 50,
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  showFusePopup = (e) => {
    this.preventEvent(e);
    this.setState({
      fusePopupOpen: !this.state.fusePopupOpen,
    });
  }

  onClickBase = (e) => {
    this.preventEvent(e);
    this.setState({
      sliderPercent: 100,
    });
  }

  onClickTop = (e) => {
    this.preventEvent(e);
    this.setState({
      sliderPercent: 50,
    });
  }

  render() {
    return (
      <div className={'maps-popup-block right-popup-block scroll-pane' + (this.props.mapsPopupOpen ? ' opened' : '')}>
        <div className="title-block">
          MAPS
          <div className="btn-control clearfix">
            <div className="btn-curtail" />
            <div className="btn-expand" />
            <div
              className="btn-close"
              onClick={() => this.props.onPopup(false, 'mapsPopupOpen')}
            />
          </div>
        </div>
        <div className="sidebar-maps-menu clearfix">
          <a href="#" className="satellite-link" onClick={this.preventEvent}>
            <span>Satellite</span>
          </a>
          <a href="#" className="street-link" onClick={this.preventEvent}>
            <span>Street</span>
          </a>
          <a href="#" className="sea-link" onClick={this.preventEvent}>
            <span>Sea</span>
          </a>
          <a href="#" className="air-link" onClick={this.preventEvent}>
            <span>Air</span>
          </a>
          <a href="#" className="columbus-link" onClick={this.preventEvent}>
            <span>Columbus</span>
          </a>
          <a href="#" className="fuse-link" onClick={this.showFusePopup}>
            <span>Fuse</span>
          </a>
        </div>

        <div className={'fuse-popup-menu sidebar-maps-block' + (this.state.fusePopupOpen ? ' opened' : '')}>
          <div className="title">Maps</div>
          <div className="select-map-block clearfix">
            <a href="#" id="base_layer" onClick={this.onClickBase}>Base</a>
            <a href="#" id="top_layer" onClick={this.onClickTop}>Top</a>
          </div>
          <div className="opacity-block">
            <div className="title">Opacity</div>
            <div>
              <LvSlider
                value={this.state.sliderPercent}
                min={1}
                max={100}
                suffix={'%'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MapsPopupComponent.propTypes = {
  mapsPopupOpen: PropTypes.bool,
  onPopup: PropTypes.func,
};

export default MapsPopupComponent;
