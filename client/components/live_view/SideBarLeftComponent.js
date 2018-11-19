import React from 'react';

import PlatformPopupComponent from './PlatformPopupComponent';

class SideBarLeftComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      hasBall: true,
      hasToggle: true,
    };
  }

  onPopup = (opened, event, hasBall, hasToggle) => {
    if (event) {
      event.preventDefault();
    }

    if (opened && this.state.popupOpen) {
      this.setState({
        popupOpen: false,
      }, ()=>{
        setTimeout(()=>{
          this.setState({
            popupOpen: true,
          });
        }, 300);
      });
    } else {
      this.setState({
        popupOpen: opened,
      });
    }

    if (hasBall !== undefined) {
      this.setState({
        hasBall,
      });
    }

    if (hasToggle !== undefined) {
      this.setState({
        hasToggle,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="sidebar-left-block sidebar-block">
          <a href="#" className="logo">
            <img src="../../assets/img/live_view/logo.png" alt="logo" />
          </a>

          <ul>
            <li className="home-link">
              <a href="#"><span>Home</span></a>
            </li>
            <li className="missions-link">
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true)}><span>Missions</span></a>
            </li>
            <li className="systems-link">
              <a href="#" onClick={(e)=>this.onPopup(true, e, false, false)}><span>Sources</span></a>
            </li>
            <li className="platforms-link">
              <a href="#" onClick={(e)=>this.onPopup(true, e, false, true)}><span>Platforms</span></a>
            </li>
            <li className="humint-link">
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true)}><span>Personnel</span></a>
            </li>
          </ul>
        </div>

        <PlatformPopupComponent
          popupOpen={this.state.popupOpen}
          onPopup={this.onPopup}
          hasBall={this.state.hasBall}
          hasToggle={this.state.hasToggle}
        />
      </div>
    );
  }
}

export default SideBarLeftComponent;
