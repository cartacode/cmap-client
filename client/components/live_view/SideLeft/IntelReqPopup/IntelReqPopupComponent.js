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
      showAll: false,
      itemsToDisplay:null
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

  /**
   * Function will get called to filter data , Search Box in Intel on Left Hand Side Toolbar on LIVE View
   */
  getFilteredList = (event) => {
    // Get All Requests
    const { allRequests } = this.props;
    // IRData to get final data , All Records.
    const IRData = (this.props.intelReqData ? this.props.intelReqData : allRequests);
    // By Default all the records will be here to display
    var updatedList = IRData;
    // Update the updatedList Variable to display the filtered data
    updatedList = updatedList.filter(function(item){
      let searchItem = 'Intel Request #'+item.ReqUserFrndlyID;
      return searchItem.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    // Set State
    this.setState({itemsToDisplay: updatedList});
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

    let itemsToDisplay = this.state.itemsToDisplay ? this.state.itemsToDisplay : IRData;
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
            <div>
              <span>
                <input type="search" placeholder="Search" className="col-md-6" onChange={this.getFilteredList} />
              </span>
              <span className="d-flex justify-content-end">
                <span className="mr-4">Show All</span>
                <CheckBox
                  defaultValue={this.state.showAll}
                  onChangeState={this.onChangeState}
                />
              </span>
              </div>
          }
        </div>
        <div className="checklist-block">
          { itemsToDisplay && itemsToDisplay.map((item, index) => {
            // only display current and future items
            if((new Date(item.ActiveDateTimeEnd) < (new Date()))) { return; }
            //console.log("ITEM",item.GridCoordinates);
            const latLong = this.getLatLongFromGridCoords(item.GridCoordinates);

            
            // if(latLong.latitude !== 0 && latLong.longitude !== 0) {
            //   //this.props.addPin(latLong.latitude, latLong.longitude, 'circle', item.ReqUserFrndlyID.toString(), (item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? 'lightGreen' : 'yellow'), item.ID, null, null, 'circle');
            //   this.props.add3DPin(latLong.latitude, latLong.longitude, 'cross_logo', '', item.IntelRequestID, '', tooltipTextData, false);
            // }

            let tooltipTextData = '<div class="div-image" style="width: 170px; height: 162px; border-right:1px solid #fff; float: left; margin:-15px 0px 0px -15px;"><img width="170px" height="162px" src="/assets/img/admin/branch_unit_logos/u39.png" ></div>' +
            '<div style="float: left; width: 54%;padding: 5px 10px; line-height: 18px;"><ul ><li>Intel Request #' + item.ReqUserFrndlyID + '</li><li>' + item.MissionTypeText + '</li><li>' + item.SupportedUnitName +
            '<a style="position: absolute; right: 15px; color: #b8850c;"><strong>Details</strong></a></li></ul></div>';
           /*  if(latLong.latitude !== 0 && latLong.longitude !== 0) {
              //this.props.addPin(latLong.latitude, latLong.longitude, 'circle', item.ReqUserFrndlyID.toString(), (item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? 'lightGreen' : 'yellow'), item.ID, null, null, 'circle');
              this.props.add3DPin(latLong.latitude, latLong.longitude, 'cross_logo', '', item.IntelRequestID, '', tooltipTextData, false);
            } */

            return <PlatformPopupItemComponent
              color={(item.IsInCollectionPlan || (item.StatusId !== 1 && item.StatusId !== 21) ? '#90EE90' : '#FFFF00')}
              textValue={'Intel Request #' + item.ReqUserFrndlyID}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              lat={latLong.latitude}
              long={latLong.longitude}
              uniqueID={'INTELREQ-' + item.IntelRequestID}
              pinColor={'cross_logo'}
              pinType={'3D'}
              pinText={item.ReqUserFrndlyID.toString()}
              moveMap={this.props.moveMap}
              addPin={this.props.addPin}
              add3DPin={this.props.add3DPin}
              removePin={this.props.removePin}
              key={index}
              addKML={this.props.addKML}
              removeKML={this.props.removeKML}
              tooltipLabel={''}
              tooltipText={tooltipTextData}
            />;
          }) }
        </div>
      </div>
    );
  }
}

IntelReqPopupComponent.propTypes = {
  add3DPin: PropTypes.func,
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
