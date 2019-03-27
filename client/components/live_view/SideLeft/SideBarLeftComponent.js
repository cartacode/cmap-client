import React from 'react';

import PlatformPopupComponent from './PlatformPopup';
import PersonnelPopupComponent from './PersonnelPopup';
import MissionPopupComponent from './MissionPopup';
import IntelReqPopupComponent from './IntelReqPopup';

import './SideBarLeftComponent.scss';

class SideBarLeftComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      hasBall: true,
      hasToggle: true,
      menuClicked: [
        true,
        false,
        false,
        false,
        false,
      ]
    };
  }

  onPopup = (opened, event, hasBall, hasToggle, menuIndex) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      popupOpen: opened,
    });

    // if (opened && this.state.popupOpen) {
    //   this.setState({
    //     popupOpen: false,
    //   }, ()=>{
    //     setTimeout(()=>{
    //       this.setState({
    //         popupOpen: true,
    //       });
    //     }, 300);
    //   });
    // } else {
    //   this.setState({
    //     popupOpen: opened,
    //   });
    // }

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

    if (menuIndex !== undefined) {
      this.setState({
        menuClicked: this.state.menuClicked.map((item, i) => {
          if (i === menuIndex) {
            return true;
          }
          return false;
        }),
      });
    }
  }

  onHomeButton = (event, menuIndex) => {
    event.preventDefault();
    $(".cesium-home-button").click();
    if (menuIndex !== undefined) {
      this.setState({
        menuClicked: this.state.menuClicked.map((item, i) => {
          if (i === menuIndex) {
            return true;
          }
          return false;
        }),
      });
    }
  }

  render() {
    const { menuClicked } = this.state;
   // const {toolbar_show} = this.props;
    return (
      <div style={{background: 'rgba(40, 72, 98, 0.7)' }}>
        {<div className="sidebar-left-block sidebar-block">
          <a href="#" className="logo">
            <img src="../../../../assets/img/live_view/logo.png" alt="logo" />
          </a>

          <ul>
            <li className={'home-link' + (menuClicked[0] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onHomeButton(e, 0)}><span>Home</span></a>
            </li>
            <li className={'intel-req-link' + (menuClicked[2] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true, 2)}><span>Intel Requests</span></a>
            </li>
            <li className={'missions-link' + (menuClicked[1] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true, 1)}><span>Missions</span></a>
            </li>
            { /* <li className={'systems-link' + (menuClicked[2] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, e, false, false, 2)}><span>Sources</span></a>
              </li> */
            }
            <li className={'platforms-link' + (menuClicked[3] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true, 3)}><span>Platforms</span></a>
            </li>
            <li className={'humint-link' + (menuClicked[4] ? ' active' : '')}>
              <a href="#" onClick={(e)=>this.onPopup(true, e, true, true, 4)}><span>Personnel</span></a>
            </li>
          </ul>
        </div>
        }

        <PlatformPopupComponent
          popupOpen={this.state.popupOpen}
          menuClicked={this.state.menuClicked[3]}
          onPopup={this.onPopup}
          hasBall={this.state.hasBall}
          hasToggle={this.state.hasToggle}
          moveMap={this.props.moveMap}
          addPin={this.props.addPin}
          add3DPin={this.props.add3DPin}
          removePin={this.props.removePin}
        />

        <PersonnelPopupComponent
          popupOpen={this.state.popupOpen}
          menuClicked={this.state.menuClicked[4]}
          onPopup={this.onPopup}
          hasBall={this.state.hasBall}
          hasToggle={this.state.hasToggle}
          moveMap={this.props.moveMap}
          addPin={this.props.addPin}
          add3DPin={this.props.add3DPin}
          removePin={this.props.removePin}
        />

        <MissionPopupComponent
          popupOpen={this.state.popupOpen}
          menuClicked={this.state.menuClicked[1]}
          onPopup={this.onPopup}
          hasBall={this.state.hasBall}
          hasToggle={this.state.hasToggle}
          moveMap={this.props.moveMap}
          addPin={this.props.addPin}
          add3DPin={this.props.add3DPin}
          removePin={this.props.removePin}
          addKML={this.props.addKMLToMap}
          removeKML={this.props.removeKML}
        />

        <IntelReqPopupComponent
          popupOpen={this.state.popupOpen}
          menuClicked={this.state.menuClicked[2]}
          onPopup={this.onPopup}
          hasBall={this.state.hasBall}
          hasToggle={this.state.hasToggle}
          moveMap={this.props.moveMap}
          addPin={this.props.addPin}
          add3DPin={this.props.add3DPin}
          removePin={this.props.removePin}
          intelReqData={this.props.intelReqData}
        />
      </div>
    );
  }
}

export default SideBarLeftComponent;
