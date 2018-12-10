import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchMissionSummary } from 'actions/mssionmgt';
import { formatDateTime } from '../../../../util/helpers';
import './MissionPopupComponent.scss';

class MissionPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: true,
    };
  }

  componentDidMount() {
    this.props.fetchMissionSummary();
  }

  onChangeState = (state) => {
    this.setState({
      showAll: state,
    }, () => {
      if(state) {
        this.props.addKML('', 'MISSIONS-PARENT');
      } else {
        this.props.removeKML('MISSIONS-PARENT');
      }
    });
  }

  convertDMSToDD = (degrees, minutes, seconds, direction) => {
    let dd = Number(degrees) + (minutes / 60) + (seconds / 3600);

    if (direction === 'S' || direction === 'W') {
      dd *= -1;
    } // Don't do anything for N or E

    return Number(dd);
  }

  getLatLongFromGridCoords = (gridCoords) => {
    const returnObj = {
      latitude: 0,
      longitude: 0,
    };

    if(!gridCoords) {
      return returnObj;
    }

    if(gridCoords.includes('°')) {
      const parts = gridCoords.split(/[^\d\w]+/);

      returnObj.latitude = this.convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
      returnObj.longitude = this.convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    } else if(gridCoords.includes(',')) {
      const parts = gridCoords.split(',');
      returnObj.latitude = Number(parts[0]);
      returnObj.longitude = Number(parts[1]);
    } 

    return returnObj;
  }

    render() {
        const { allMissionSummary } = this.props;
      return (
        <div className={'mission-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
          <div className="title-block">
            MISSIONS
            <div
              className="btn-close"
              onClick={() => this.props.onPopup(false)}
            />
          </div>
  
          <div className="selectmenu-block">
            {/*
            <SelectBox
              options={[
                { value: 'by Mission', label: 'by Mission' },
                { value: 'by Type', label: 'by Type' },
                { value: 'by Payload', label: 'by Payload' },
                { value: 'by AD', label: 'by AD' }
              ]}
            />
            */}
            {
              this.props.hasToggle &&
                <div className="d-flex justify-content-center">
                  <span className="mr-4">Show All</span>
                  <CheckBox
                    defaultValue={this.state.showAll}
                    onChangeState={this.onChangeState}
                  />
                </div>
            }
          </div>
  
          <div className="checklist-block">
              { allMissionSummary && allMissionSummary.map((item, index) => {
                  if((new Date(item.EndDate) < (new Date()))) { return; }
                  const latLong = this.getLatLongFromGridCoords(item.GridCoordinates);

                  if(latLong.latitude !== 0 && latLong.longitude !== 0) {
                    this.props.addPin(latLong.latitude, latLong.longitude, 'marker', item.MissionId.toString(), 'red', item.ID);
                  }

                  return <PlatformPopupItemComponent
                  color={'#FF0000'}
                  textValue={item.MissionName}
                  checked={this.state.showAll}
                  hasColorBall={this.props.hasBall}
                  popupText={'Start: ' + formatDateTime(item.StartDate) + ' End: ' + formatDateTime(item.EndDate) + ' Status: ' + item.Status}
                  lat={latLong.latitude}
                  long={latLong.longitude}
                  uniqueID={'MISSION-' + item.MissionId}
                  pinColor={'red'}
                  pinType={'marker'}
                  pinText={item.MissionId.toString()}
                  moveMap={this.props.moveMap}
                  addPin={this.props.addPin}
                  removePin={this.props.removePin}
                  key={index}
                  addKML={this.props.addKML}
                  removeKML={this.props.removeKML}
                  kmlSrc={item.FlightPlan}
                  tooltipText={'<img src="/assets/img/admin/branch_unit_logos/u39.png" style="height:97%;float:left;padding-left:15px;padding-right:15px;background:black;margin-left:-10px;margin-right:5px;">' +
                  item.MissionName + '<br/>' + item.Platform + '<br/>' + item.MissionType + '<br/>' + item.SupportedUnit +
                  '<br/><br/><a style="color:#ff7c16;float:right;"><strong>Details</strong></a>'}
              />;
              }) }
          </div>
        </div>
      );
    }
  }
  
  MissionPopupComponent.propTypes = {
    addKML: PropTypes.func,
    addPin: PropTypes.func,
    hasBall: PropTypes.bool,
    hasToggle: PropTypes.bool,
    menuClicked: PropTypes.bool,
    moveMap: PropTypes.func,
    onPopup: PropTypes.func,
    popupOpen: PropTypes.bool,
    removeKML: PropTypes.func,
    removePin: PropTypes.func,
  };



const mapStateToProps = state => {
    return {
      allMissionSummary: state.mssionmgts.allMissionSummary,
      isLoading: state.mssionmgts.isFetching,
    };
  };
  
  const mapDispatchToProps = {
    fetchMissionSummary,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MissionPopupComponent);
  