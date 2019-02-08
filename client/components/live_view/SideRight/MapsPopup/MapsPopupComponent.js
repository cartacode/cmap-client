import React from 'react';
import PropTypes from 'prop-types';
import { layerIdentifiers, layerLevels } from '../../../../map/viewer';
import LvSlider from '../../../reusable/Slider';
import { LocalMapLayer } from 'dictionary/constants';
import './MapsPopupComponent.scss';

class MapsPopupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fusePopupOpen: false, // for setting opacity of  base and top layers
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
      ],
      mapSelect: [
        false, // Local Map
        true  // Default Map
      ],
      localMapSelect: [
        false, // Geoserver Geotiff
        false, // Asia Server 
        false // Syria and Lebanon
      ]
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  showFusePopup = () => {
    this.setState({
      fusePopupOpen: !this.state.fusePopupOpen, // toggle the popup
      fuseItemClicked: [true, false], // by default the base layer is selected
    });
  }

  // activate base layer opacity functionality
  onClickBase = (e) => {
    this.preventEvent(e);
    this.setState({
      fuseItemClicked: [true, false],
    });
  }

  // activate top layer opacity functionality
  onClickTop = (e) => {
    this.preventEvent(e);
    this.setState({
      fuseItemClicked: [false, true],
    });
  }

  // selecting any of the 4 provided bing maps layers
  onClickMenuItem = (index, e) => {
    this.preventEvent(e);
    // initially selecting layer to be base layer
    let layer = layerLevels.base;

    // if fuse popup is opened and Top is selected 
    // then layer is top-layer
    if (this.state.fusePopupOpen && this.state.fuseItemClicked[1]) {
      layer = layerLevels.top;
    }

    this.setState({
      localMapSelect: this.state.localMapSelect.map(() => {
        return false;
      }),
      menuClicked: this.state.menuClicked.map((item, i) => {
        if (i === index)
          return true;
        else
          return false;
      }),
    }, () => {
      if (index === 0) { // Aerial
        this.props.setMapLayer(layerIdentifiers.aerial, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if (index === 1) { // street
        this.props.setMapLayer(layerIdentifiers.road, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if (index === 4) { // aerial with labels
        this.props.setMapLayer(layerIdentifiers.aerialLabels, layer);
        this.props.setLayerTransparency(layer, (this.state.sliderPercent[layer] / 100));
      } else if (index === 5) {
        this.showFusePopup();
      }
    });
  }

  // selecting geoserver map layers 
  onLocalSelectMap = (index, e) => {
    this.preventEvent(e);
    this.setState({
      menuClicked: this.state.menuClicked.map(() => {
        return false;
      }),
      localMapSelect: this.state.localMapSelect.map((item, i) => {
        if (i == index)
          return true;
        else
          return false;
      }),
    }, () => {
      if (index == 0) // World Map
        this.props.setMapLayer(LocalMapLayer.WORLD_MAP, 0); // 0 is for base layer, 1 is for top layer
      else if (index == 1) // Asia Server
        this.props.setMapLayer(LocalMapLayer.ASIA_CATEGORIZED, 0);
      else if (index == 2) // Syria-Lebanon
        this.props.setMapLayer(LocalMapLayer.SYRIA_LEBANON, 0);
    }
    );
  }

  // selecting b/w local-Internet maps
  onClickSelectMap = (index, e) => {
    this.preventEvent(e);
    this.setState({
      mapSelect: this.state.mapSelect.map((item, i) => {
        if (i === index)
          return true;
        else
          return false;
      }),
    });
  }

  onOpacityChange = (newPct) => {
    const basePct = this.state.sliderPercent[0];
    const topPct = this.state.sliderPercent[1];

    if (this.state.fuseItemClicked[0] === true) {
      this.setState({
        sliderPercent: [newPct, topPct],
      }, () => {
        this.props.setLayerTransparency(layerLevels.base, (newPct / 100));
      });
    } else if (this.state.fuseItemClicked[1] === true) {
      this.setState({
        sliderPercent: [basePct, newPct],
      }, () => {
        this.props.setLayerTransparency(layerLevels.top, (newPct / 100));
      });
    }
  }

  render() {
    const { menuClicked, fuseItemClicked, mapSelect, localMapSelect } = this.state;
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

        <div className='show-maps clearfix'>
          <ul>
            <li><a href="#" className={(mapSelect[0] ? 'active' : '')} onClick={(e) => this.onClickSelectMap(0, e)}>LOCAL</a></li>
            <li><a href="#" className={(mapSelect[1] ? 'active' : '')} onClick={(e) => this.onClickSelectMap(1, e)}>INTERNET</a></li>
          </ul>
        </div>
        <hr />

        <div className={'local-maps-menu' + (mapSelect[0] ? ' open' : '') + ' clearfix'}>
          <ul>
            <li><a href="#" className={(localMapSelect[0] ? 'active' : '')} onClick={(e) => this.onLocalSelectMap(0, e)}>WORLD</a></li>
            <li><a href="#" className={(localMapSelect[1] ? 'active' : '')} onClick={(e) => this.onLocalSelectMap(1, e)}>ASIA</a></li>
            <li><a href="#" className={(localMapSelect[2] ? 'active' : '')} onClick={(e) => this.onLocalSelectMap(2, e)}>SYRIA / LEBANON</a></li>
          </ul>
        </div>

        <div className={'sidebar-maps-menu' + (mapSelect[1] ? ' open' : '') + ' clearfix'}>
          {/* <a href="#" className={'satellite-link' + (menuClicked[0] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(0, e)}>
            <span>Satellite</span>
          </a> */}
          <a href="#" className={'columbus-link' + (menuClicked[0] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(0, e)}>
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
         {/*  <a href="#" className={'columbus-link' + (menuClicked[4] ? ' active' : '')} onClick={(e) => this.onClickMenuItem(4, e)}>
            <span>Satellite with Labels</span>
          </a> */}
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
