import React from 'react';

import MapsPopupComponent from './MapsPopup';
import DrawingPopupComponent from './DrawingPopup';
import RulerPopupComponent from './RulerPopup';
import SearchPopupComponent from './SearchPopup';
import KmlPopupComponent from './KmlPopup';
import LayersPopupComponent from './LayerPopup';

import './SideBarRightComponent.scss';
//import LayerPopupComponent from './LayerPopup/LayerPopupComponent';

class SideBarRightComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapsPopupOpen: false,
      drawingPopupOpen: false,
      rulerPopupOpen: false,
      searchPopupOpen: false,
      kmlPopupOpen: false,
      layersPopupOpen: false,
    };
  }

  onPopup = (opened, popupType, event) => {
    if (event) {
      this.preventEvent(event);
    }
    this.setState({
      mapsPopupOpen: false,
      drawingPopupOpen: false,
      rulerPopupOpen: false,
      searchPopupOpen: false,
      kmlPopupOpen: false,
      layersPopupOpen: false,
    }, () => {
      setTimeout(()=>{
        this.setState({
          [popupType]: opened,
        });
      }, 300);
    });
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="sidebar-right-block sidebar-block">
          <ul>
            <li className={'maps-link' + (this.state.mapsPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'mapsPopupOpen', e)}><span>Maps</span></a>
            </li>
            <li className={'layers-link' + (this.state.layersPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'layersPopupOpen', e)}><span>Layers</span></a>
            </li>
            <li className={'drawing-link' + (this.state.drawingPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'drawingPopupOpen', e)}><span>Drawing</span></a>
            </li>
            <li className={'measure-link' + (this.state.rulerPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'rulerPopupOpen', e)}><span>Ruler</span></a>
            </li>
            <li className={'kmlkmz-link' + (this.state.kmlPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'kmlPopupOpen', e)}><span>Upload</span></a>
            </li>
            <li className={'search-link' + (this.state.searchPopupOpen ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, 'searchPopupOpen', e)}><span>Fly To</span></a>
            </li>
          </ul>
        </div>
        <MapsPopupComponent
          onPopup={this.onPopup}
          mapsPopupOpen={this.state.mapsPopupOpen}
          setMapLayer={this.props.setMapLayer}
          setLayerTransparency={this.props.setLayerTransparency}
        />
        <LayersPopupComponent
          onPopup={this.onPopup}
          layersPopupOpen={this.state.layersPopupOpen}
          add3DPin={this.props.add3DPin}
          addKML={this.props.addKMLToMap}
          removeKML={this.props.removeKML}
          onPopup={this.onPopup}
          toggleMapLayer={this.props.toggleMapLayer}
        />
        <DrawingPopupComponent
          onPopup={this.onPopup}
          drawingPopupOpen={this.state.drawingPopupOpen}
        />
        <RulerPopupComponent
          onPopup={this.onPopup}
          rulerPopupOpen={this.state.rulerPopupOpen}
        />
        <SearchPopupComponent
          setContainer={this.props.setContainer}
          onPopup={this.onPopup}
          searchPopupOpen={this.state.searchPopupOpen}
        />
        <KmlPopupComponent
          onPopup={this.onPopup}
          addKML={this.props.addKMLToMap}
          kmlPopupOpen={this.state.kmlPopupOpen}
        />
      </div>
    );
  }
}

export default SideBarRightComponent;
