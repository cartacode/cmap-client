import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchPersonnels } from 'actions/personnel';
import './PersonnelPopupComponent.scss';

class PersonnelPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      itemsToDisplay:null,
    };
  }

  componentDidMount() {
     this.props.fetchPersonnels();
  }

  onChangeShowAll = (state) => {
    this.setState({
      showAll: state,
    }, () => {
      if(state) {
        // this.props.addPin(0, 0, null, null, null, 'PERSONNEL-PARENT');
      } else {
        this.props.removePin('PERSONNEL-PARENT');
      }
    });
  }


 /**
   * Function will get called to filter data , Search Box in Personnel on Left Hand Side Toolbar on LIVE View
   */
  getFilteredList = (event) => {
    // Get All Personnel
    const { allPersonnels } = this.props;

    // By Default all the records will be here to display
    var updatedList = allPersonnels;
    // Update the updatedList Variable to display the filtered data
    updatedList = updatedList.filter(function(item){
      let searchItem = (item.rank !== 'Unknown' ? (item.rank + ' ') : '') + item.firstName + ' ' + item.lastName;
      return searchItem.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    // Set State
    this.setState({itemsToDisplay: updatedList});
  }

  render() {
    const { allPersonnels } = this.props;

    let itemsToDisplay = this.state.itemsToDisplay ? this.state.itemsToDisplay : allPersonnels;
    return (
      <div className={'personnel-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
        <div className="title-block">
          PERSONNEL
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
                  onChangeState={this.onChangeShowAll}
                />
              </span>
            </div>
          }
        </div>

        <div className="checklist-block">
          { itemsToDisplay && itemsToDisplay.map((item, index) => {
            // this.props.addPin(Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude),
            //   Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude),
            //   'campsite', null, 'orange', item.ID);

              // this.props.add3DPin(Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude),
              //                   Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude),
              //                   'people_logo', '', item.ID, '', '<img src="/assets/img/admin/photo_1_old.png" style="height:62%;float:left;margin-left:-10px;margin-right:5px;">' + item.firstName + ' ' + item.lastName +
              //                   '<br/>' + item.rank + '<br/>' + item.branchOfService + ' / ' + item.assignedUnit + '<br/>' + item.branchOfService + ' / ' + item.deployedUnit + '<br/>' +
              //                   item.location + '<br/>' + item.status + '<a style="position: absolute; right: 15px; color: #b8850c;"><strong>Details</strong></a>', false);

              /* this.props.add3DPin(Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude),
                                Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude),
                                'people_logo', '', item.ID, '', '<div style="    width: 170px; height: 162px;border-right:1px solid #fff; float: left; margin:-15px 0px 0px -15px;"><img width="170px" height="162px" src="/assets/img/admin/photo_1_old.png"  /></div><div style="float: left; width: 54%; line-height: 18px;"><ul><li>' + item.firstName + ' ' + item.lastName +
                                '</li><li>' + item.rank + '</li><li>' + item.branchOfService + ' / ' + item.assignedUnit + '' + item.branchOfService + ' / ' + item.deployedUnit + '</li><li>' +
                                item.location + '</li><li>' + item.status + '<a style="position: absolute; right: 15px; color: #b8850c;"><strong>Details</strong></a></li></ul></div>', false);
 */
let tooltipTextData = '<div style="width: 170px; height: 162px; border-right:1px solid #fff; float: left; margin:-15px 0px 0px -15px;"><img width="170px" height="162px" src="/assets/img/admin/photo_1_old.png"  /></div><div style="float: left; width: 54%; line-height: 18px;"><ul><li>' + item.firstName + ' ' + item.lastName +
'</li><li>' + item.rank + '</li><li>' + item.branchOfService + ' / ' + item.assignedUnit + '' + item.branchOfService + ' / ' + item.deployedUnit + '</li><li>' +
item.location + '</li><li>' + item.status + '<a style="position: absolute; right: 15px; color: #b8850c;"><strong>Details</strong></a></li></ul></div>';

            return <PlatformPopupItemComponent
              color={'#FFA500'}
              textValue={(item.rank !== 'Unknown' ? (item.rank + ' ') : '') + item.firstName + ' ' + item.lastName}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              popupText={(item.deployedUnit !== null ? 'Deployed Unit: ' + item.deployedUnit : (item.assignedUnit !== null ? 'Assigned Unit: ' + item.assignedUnit : ''))}
              lat={Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude)}
              long={Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude)}
              uniqueID={item.ID}
              pinColor={'people_logo'}
              pinType={'3D'}
              moveMap={this.props.moveMap}
              addPin={this.props.addPin}
              add3DPin={this.props.add3DPin}
              removePin={this.props.removePin}
              key={index}
              tooltipLabel={''}
              tooltipText={tooltipTextData}
            />;
          }) }
        </div>
      </div>
    );
  }
}

PersonnelPopupComponent.propTypes = {
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  menuClicked: PropTypes.bool,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    allPersonnels: state.personnels.allPersonnels,
    isLoading: state.personnels.isFetching,
  };
};

const mapDispatchToProps = {
  fetchPersonnels,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelPopupComponent);
