import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PopupListingItem from '../PopupListingItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchLocationKMLs, fetchLocationTypes } from 'actions/location';
import { fetchMapLayers } from 'actions/liveview';

import './LayerPopupComponent.scss';

class LayerPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    // Static data to load map layer icons
    this.state = {
      showAll: true,
     static_data : {
          space :{
             length : 0
          },
          air :{
              length : 3
          },
          maritime :{
              length : 2
          },
          personnel :{
              length : 3
          },
          sensor :{
              length : 3
          },
          blue_forces :{
              length : 3
          },
          bases :{
              length : 1
          },
          intel_requirement :{
              length : 1
          },
          sigact :{
              length : 3
          },
          pois :{
              length : 2
          },
          ci :{
              length : 3
          },
          sigint :{
              length : 2
          },
          oswt :{
              length : 1
          },
          gmti :{
              length : 1
          },
          intel_request_collection_point :{
              length : 2
          },
          observation :{
              length : 2
          },
          image :{
              length : 2
          },
          media :{
              length : 0
          },
          terrestrial :{
              length : 0
          },
          weather :{
              length : 0
          },
          base_locations :{
              length : 0
          },
          nais :{
              length : 0
          },
          missions :{
              length : 0
          },
          intel_report :{
              length : 0
          }
      }
    };
  }

  componentDidMount() {
    //this.props.fetchLocationKMLs();
    this.props.fetchLocationTypes();
    // Fetch All Layers to Display in the right side tool bar Layers Button
    this.props.fetchMapLayers();
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
    if(data) {
      const arrItems = data.map((item) => {
        return { value: item.id, label: item.description };
      });

      arrItems.push({ value: -1, label: 'Map Drawings' });
      return arrItems;
    } else {
      return [];
    }
  }
  myFunction = (number) => {
      const str = number.split(" ").join("_");
      const str_temp = str.toLowerCase();

      if(str_temp in this.state.static_data)
      {
          const length = this.state.static_data[str_temp].length;
          for(let i=0;i<length;i++){
              const map_str = str_temp + "_" + i;
              this.props.toggleMapLayer(map_str);
          }
      }
  }
  render() {

    const { locationKMLs, locationTypes, allLayers} = this.props;
    //console.log("VISHAL",this.props.allLayers);

    /* const listItem = ['Space', 'Air', 'Maritime', 'Blue Forces'
      , 'Observations',  'Intel Picture', 'SIGACTS', 'Weather','Airfield','Base Locationsnpm ','NAIs','POIs'];
 */
  //const { locationKML } = {'LocationName':'abdf','Category':'xyx', 'LocationLatitude':'76.22', 'LocationLongitude':'76.22','LocationID':'IND',   };

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
            // <SelectBox
            //   options={ this.getFilterOptions(locationTypes) }
            // />
          }
        </div>
        <div>
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
          { /*locationKMLs && locationKMLs.map((item, index) => {
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
          }) */}
          {
            allLayers.map((number) =>
              <div className="popup-item">

              {number.name} <CheckBox onChangeState={this.myFunction.bind(this,number.name)}/>
                  {
                    number.subCategories !=null && number.subCategories != '' && number.subCategories != undefined
                  && number.subCategories.map((subCategory) => 
                    <div className="popup-item">{subCategory.name} <CheckBox onChangeState={this.myFunction.bind(this,subCategory.name)} /> </div>
                )
              }
                  </div>
          )

          }

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
    //locationKMLs: state.locations.locationKMLs,
    isKMLFetching: state.locations.isKMLFetching,
    allLayers: state.locations.allLayers
  };
};

const mapDispatchToProps = {
  fetchLocationKMLs,
  fetchLocationTypes,
  fetchMapLayers,

};

export default connect(mapStateToProps, mapDispatchToProps)(LayerPopupComponent);
