import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchPlatformInventory } from 'actions/platforminventory';
import './PlatformPopupComponent.scss';

class PlatformPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      itemsToDisplay:null,
    };
  }

  componentDidMount() {
    this.props.fetchPlatformInventory();
  }

  /**
   * Function will get called to filter data , Search Box in Platform on Left Hand Side Toolbar on LIVE View
   */
  getFilteredList = (event) => {
    // Get All Platform 
    const { allPlatformInventory } = this.props;
   
    // By Default all the records will be here to display
    var updatedList = allPlatformInventory;
    // Update the updatedList Variable to display the filtered data 
    updatedList = updatedList.filter(function(item){
      let searchItem = item.name;
      return searchItem.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    // Set State
    this.setState({itemsToDisplay: updatedList});
  }

  onChangeShowAll = (state) => {
    this.setState({
      showAll: state,
    }, () => {
      if(state) {
        this.props.addPin(0, 0, null, null, null, 'PLATFORMS-PARENT');
      } else {
        this.props.removePin('PLATFORMS-PARENT');
      }
    });
  }

  render() {
    const { allPlatformInventory } = this.props;
    let itemsToDisplay = this.state.itemsToDisplay ? this.state.itemsToDisplay : allPlatformInventory;
    return (
      <div className={'platforms-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
        <div className="title-block">
          PLATFORMS
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
            let tooltipLabelData = '';//item.name;
            let tooltipTextData =  '<div class="div-image" style="width: 36%; border-right:1px solid #fff; float: left; margin:-15px 0px 0px -15px;"><img width="100%" src="/assets/img/admin/aircraft.png" /></div>' +
            '<div style="float: left; width: 54%;padding: 5px 10px; line-height: 18px;">' +
            item.name + '<br/>' + item.branchOfService + ' / ' + (item.DeployedUnit ? item.DeployedUnit : item.owningUnit) + '<br/>' + item.location + '<br/>' + item.StatusAbbrev +
            '<a style="position: absolute; right: 15px; color: #b8850c;" class="action_detail"><strong> Details </strong></a></div>';
            //  this.props.add3DPin(Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude),
            //                    Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude),
            //                    'airplane_logo', '', item.id, tooltipLabelData, tooltipTextData, false);
                              

             return <PlatformPopupItemComponent
              color={'#008000'}
              textValue={item.name}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              popupText={'Location: ' + item.location + ' Tail #: ' + item.tailNbr + ' Status: ' + item.StatusAbbrev}
              lat={Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude)}
              long={Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude)}
              uniqueID={item.id}
              pinColor={'airplane_logo'}
              pinType={'3D'}
              moveMap={this.props.moveMap}
              addPin={this.props.addPin}
              add3DPin={this.props.add3DPin}
              removePin={this.props.removePin}
              key={index}
              tooltipLabel={tooltipLabelData}
              tooltipText={tooltipTextData}
            />;
          }) }
        </div>
      </div>
    );
  }
}

PlatformPopupComponent.propTypes = {
  add3DPin: PropTypes.func,
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  menuClicked: PropTypes.bool,
  moveMap: PropTypes.func,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    allPlatformInventory: state.platforminventory.allPlatformInventory,
    isLoading: state.platforminventory.isFetching,
  };
};

const mapDispatchToProps = {
  fetchPlatformInventory,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformPopupComponent);
