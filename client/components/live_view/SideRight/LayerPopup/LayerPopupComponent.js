import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PopupListingItem from '../PopupListingItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchLocationKMLs, fetchLocationTypes } from 'actions/location';
import './LayerPopupComponent.scss';

class LayerPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: true,
    };
  }

  componentDidMount() {
    this.props.fetchLocationKMLs();
    this.props.fetchLocationTypes();
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

  getFilterOptions = (data) => {
    const arrItems = data.map((item) => {
      return { value: item.id, label: item.description };
    });

    arrItems.push({ value: -1, label: 'Map Drawings' });
    return arrItems;
  }

  render() {
    const { locationKMLs, locationTypes } = this.props;

    return (
      <div className={'layers-popup-block popup-block scroll-pane' + ((this.props.layersPopupOpen) ? ' opened' : '')}>
        <div className="title-block">
          LAYERS
          <div
            className="btn-close"
            onClick={() => this.props.onPopup(false)}
          />
        </div>

        <div className="selectmenu-block">
          {
            <SelectBox
              options={ this.getFilterOptions(locationTypes) }
            />
          }
          {
            this.props.hasToggle &&
              <div className="d-flex justify-content-center">
                <span className="mr-4">Show All</span>
                <CheckBox
                  defaultValue={this.state.showAll}
                  onChangeState={this.onChangeShowAll}
                />
              </div>
          }
        </div>

        <div className="checklist-block">
          { locationKMLs && locationKMLs.map((item, index) => {
            return <PopupListingItem
              color={'#008000'}
              textValue={item.LocationName}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              popupText={'Location: ' + item.LocationName + ' Category: ' + item.Category}
              // lat={Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude)}
              // long={Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude)}
              uniqueID={item.LocationID}
              pinColor={'green'}
              pinType={'campsite'}
              // moveMap={this.props.moveMap}
              // addPin={this.props.addPin}
              // removePin={this.props.removePin}
              key={index}
              addKML={this.props.addKML}
              removeKML={this.props.removeKML}
              kmlSrc={item.KML}
              tooltipLabel={item.LocationName}
              tooltipText={'<img src="/assets/img/admin/aircraft.png" style="height:97%;float:left;margin-left:-10px;margin-right:5px;">' +
              item.Category + '<br/>' + item.LocationName + '<br/><br/><a style="color:#ff7c16;float:right;"><strong>Details</strong></a>'}
            />;
          }) }
        </div>
      </div>
    );
  }
}

LayerPopupComponent.propTypes = {
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
    locationTypes: state.locations.locationTypes,
    isTypesFetching: state.locations.isTypesFetching,
    locationKMLs: state.locations.locationKMLs,
    isKMLFetching: state.locations.isKMLFetching,
  };
};

const mapDispatchToProps = {
  fetchLocationKMLs,
  fetchLocationTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayerPopupComponent);
