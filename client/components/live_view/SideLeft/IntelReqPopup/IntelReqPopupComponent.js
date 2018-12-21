import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchIntelRequests } from 'actions/intel';
import { formatDateTime } from '../../../../util/helpers';
import './IntelReqPopupComponent.scss';

class IntelReqPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: true,
    };
  }

  componentDidMount() {
    if(!this.props.intelReqData) {
      this.props.fetchIntelRequests();
    }
  }

  onChangeState = (state) => {
    this.setState({
      showAll: state,
    }, () => {
      /*if(state) {
        this.props.addPin(latLong.latitude, latLong.longitude, 'marker', item.IntelRequestID.toString(), 'yellow', item.ID, 'circle');
      } else {
        this.props.removeKML('MISSIONS-PARENT');
      }*/
    });
  }

  convertDMSToDD = (degrees, minutes, seconds, direction) => {
    let dd = Number(degrees) + (minutes / 60) + (seconds / 3600);

    if (direction === 'S' || direction === 'W') {
      dd *= -1;
    } // Don't do anything for N or E

    return Number(dd);
  };

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
  };

  render() {
    const { allRequests } = this.props;
    const IRData = (this.props.intelReqData ? this.props.intelReqData : allRequests);
    return (
      <div className={'intelReq-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
        <div className="title-block">
          INTEL REQUESTS
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
          { IRData && IRData.map((item, index) => {
            // only display current and future items
            if((new Date(item.ActiveDateTimeEnd) < (new Date()))) { return; }
            const latLong = this.getLatLongFromGridCoords(item.GridCoordinates);

            if(latLong.latitude !== 0 && latLong.longitude !== 0) {
              this.props.addPin(latLong.latitude, latLong.longitude, 'circle', item.ReqUserFrndlyID.toString(), (item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? 'lightGreen' : 'yellow'), item.ID, null, null, 'circle');
            }

            return <PlatformPopupItemComponent
              color={(item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? '#90EE90' : '#FFFF00')}
              textValue={'Intel Request #' + item.ReqUserFrndlyID}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              lat={latLong.latitude}
              long={latLong.longitude}
              uniqueID={'INTELREQ-' + item.IntelRequestID}
              pinColor={(item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? 'lightGreen' : 'yellow')}
              pinType={'circle'}
              pinText={item.ReqUserFrndlyID.toString()}
              moveMap={this.props.moveMap}
              addPin={this.props.addPin}
              removePin={this.props.removePin}
              key={index}
              addKML={this.props.addKML}
              removeKML={this.props.removeKML}
              tooltipText={'<img src="/assets/img/admin/branch_unit_logos/u39.png" style="height:97%;float:left;padding-left:15px;padding-right:15px;background:black;margin-left:-10px;margin-right:5px;">' +
              'Intel Request #' + item.ReqUserFrndlyID + '<br/>' + item.MissionTypeText + '<br/>' + item.SupportedUnitName +
              '<br/><br/><a style="color:#ff7c16;float:right;"><strong>Details</strong></a>'}
            />;
          }) }
        </div>
      </div>
    );
  }
}

IntelReqPopupComponent.propTypes = {
  addKML: PropTypes.func,
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  intelReqData: PropTypes.array,
  menuClicked: PropTypes.bool,
  moveMap: PropTypes.func,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removeKML: PropTypes.func,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    allRequests: state.intelrequest.allRequests,
    isLoading: state.intelrequest.isFetching,
  };
};

const mapDispatchToProps = {
  fetchIntelRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelReqPopupComponent);
