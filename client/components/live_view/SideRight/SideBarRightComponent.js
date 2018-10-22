import React from 'react';

import MapsPopupComponent from './MapsPopup';
import DrawingPopupComponent from './DrawingPopup';
import RulerPopupComponent from './RulerPopup';
import SearchPopupComponent from './SearchPopup';

import './SideBarRightComponent.scss';

class SideBarRightComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapsPopupOpen: false,
      drawingPopupOpen: false,
      rulerPopupOpen: false,
      searchPopupOpen: false,
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
            <li className="maps-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'mapsPopupOpen', e)}><span>Maps</span></a>
            </li>
            <li className="layers-link">
              <a href="#" onClick={this.preventEvent}><span>Layers</span></a>
            </li>
            <li className="drawing-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'drawingPopupOpen', e)}><span>Drawing</span></a>
            </li>
            <li className="measure-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'rulerPopupOpen', e)}><span>Ruler</span></a>
            </li>
            <li className="search-link">
              <a href="#" onClick={(e)=>this.onPopup(true, 'searchPopupOpen', e)}><span>Search</span></a>
            </li>
          </ul>
        </div>
        <MapsPopupComponent
          onPopup={this.onPopup}
          mapsPopupOpen={this.state.mapsPopupOpen}
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
          onPopup={this.onPopup}
          searchPopupOpen={this.state.searchPopupOpen}
        />
      </div>
    );
  }
}

export default SideBarRightComponent;
