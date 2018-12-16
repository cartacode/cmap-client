import React from 'react';
import PropTypes from 'prop-types';
import { layerIdentifiers, layerLevels } from '../../../../map/viewer';
import LvSlider from '../../../reusable/Slider';

import './MapsPopupComponent.scss';

class MapsPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fusePopupOpen: false,
      sliderPercent: [
        100, // base
        50, // top
      ],
      menuClicked: [
        false, //
        false, //
        false, //
        false, //
        false, //
        false, //
      ],
      fuseItemClicked: [
        false, // base
        false, // top
      ]
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  showFusePopup = () => {
    this.setState({
      fusePopupOpen: !this.state.fusePopupOpen,
      fuseItemClicked: [true, false],
    });
  }

  onClickBase = (e) => {
    this.preventEvent(e);
    this.setState({
      fuseItemClicked: [true, false],
    });
  }

  onClickTop = (e) => {
    this.preventEvent(e);
    this.setState({
      fuseItemClicked: [false, true],
    });
  }

  onClickMenuItem = (index, e) => {
    this.preventEvent(e);
    let layer = layerLevels.base;

    if(this.state.fusePopupOpen && this.state.fuseItemClicked[1]) {
      layer = layerLevels.top;
    }

    this.setState({
      menuClicked: this.state.menuClicked.map((item, i) => {
        if (i === index) {
          return true;
        }
        return false;
      }),
    }, () => {
      if(index === 0) { // Aerial
        this.props.setMapLayer(layerIdentifiers.aerial, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if(index === 1) { // street
        this.props.setMapLayer(layerIdentifiers.road, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if(index === 4) { // aerial with labels
        this.props.setMapLayer(layerIdentifiers.aerialLabels, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if(index === 5) {
        this.showFusePopup();
      }
    });
  }

  onOpacityChange = (newPct) => {
    const basePct = this.state.sliderPercent[0];
    const topPct = this.state.sliderPercent[1];

    if(this.state.fuseItemClicked[0] === true) {
      this.setState({
        sliderPercent: [newPct, topPct],
      }, () => {
        this.props.setLayerTransparency(layerLevels.base, (newPct / 100));
      });
    } else if(this.state.fuseItemClicked[1] === true) {
      this.setState({
        sliderPercent: [basePct, newPct],
      }, () => {
        this.props.setLayerTransparency(layerLevels.top, (newPct / 100));
      });
    }
  }

  render() {
    const { menuClicked, fuseItemClicked } = this.state;
    return (
      <div className={'maps-popup-block right-popup-block' + (this.props.mapsPopupOpen ? ' opened' : '')}>
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
          <a href="#" className={'satellite-link' + (menuClicked[0] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(0, e)}>
            <span>Satellite</span>
          </a>
          <a href="#" className={'street-link' + (menuClicked[1] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(1, e)}>
            <span>Street</span>
          </a>
          { /*<a href="#" className={'sea-link' + (menuClicked[2] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(2, e)}>
            <span>Sea</span>
          </a>
          <a href="#" className={'air-link' + (menuClicked[3] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(3, e)}>
            <span>Air</span>
          </a>*/ }
          <a href="#" className={'columbus-link' + (menuClicked[4] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(4, e)}>
            <span>Satellite with Labels</span>
          </a>
          <a href="#" className={'fuse-link' + (menuClicked[5] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(5, e)}>
            <span>Fuse</span>
          </a>
        </div>

        <div className={'fuse-popup-menu sidebar-maps-block' + (this.state.fusePopupOpen ? ' opened' : '')}>
          <div className="title">Maps</div>
          <div className="select-map-block clearfix">
            <a href="#" className={(fuseItemClicked[0] ? 'active' : '')} id="base_layer" onClick={this.onClickBase}>Base</a>
            <a href="#" className={(fuseItemClicked[1] ? 'active' : '')} id="top_layer" onClick={this.onClickTop}>Top</a>
          </div>
          <div className="opacity-block">
            <div className="title">Opacity</div>
            <div>
              <LvSlider
                value={(!this.state.fusePopupOpen || this.state.fuseItemClicked[0]) ? this.state.sliderPercent[0] : this.state.sliderPercent[1]}
                min={1}
                max={100}
                suffix={'%'}
                onChange={this.onOpacityChange}
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
  setLayerTransparency: PropTypes.func,
  setMapLayer: PropTypes.func,
};

export default MapsPopupComponent;
