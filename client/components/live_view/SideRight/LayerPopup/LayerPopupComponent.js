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
        this.toggle_data = {
            key : {
                count : 0,
                flag : false,
            }
        };
        this.state = {
            showAll: true,

            // toggle_data : {
            //     key : {
            //         count : 0,
            //         flag : false
            //     }
            // }
            // static_data : {
            //      air :{
            //          length : 25,
            //          imageId : 'airplane_logo'
            //      },
            //      maritime :{
            //          length : 50,
            //          imageId : 'boat'
            //      },
            //      personnel :{
            //          length : 30,
            //          imageId : 'people_logo'
            //      },
            //      sensor :{
            //          length : 90,
            //          imageId : 'bolt_logo'
            //      },
            //      blue_forces :{
            //          length : 10,
            //          imageId : 'horse_logo'
            //      },
            //      bases :{
            //          length : 12,
            //          imageId : 'house_logo'
            //      },
            //      intel_requirement :{
            //          length : 30,
            //          imageId : 'paper_list_logo'
            //      },
            //      pois :{
            //          length : 10,
            //          imageId : 'star_logo'
            //      },
            //      ci :{
            //          length : 25,
            //          imageId : 'eye_logo'
            //      },
            //      sigint :{
            //          length : 10,
            //          imageId : 'stats_logo'
            //      },
            //      oswt :{
            //          length : 20,
            //          imageId : 'megaphone_logo'
            //      },
            //      gmti :{
            //          length : 30,
            //          imageId : 'pointer_logo'
            //      },
            //      intel_request_collection_point :{
            //          length : 15,
            //          imageId : 'cross_logo'
            //      },
            //      observation :{
            //          length : 20,
            //          imageId : 'lens_logo'
            //      },
            //      media :{
            //          length : 12,
            //          imageId : 'photocamera_logo'
            //      }
            //  }
        };

        // Code to create the points
        // let arr =  this.props.allLayers;
        // alert(arr);
        // let key = Object.keys(this.state.static_data);
        // for(let i=0 ; i < key.length ; i++){
        //     let len = this.state.static_data[key[i]].length;
        //     for(let j=0;j<len;j++){
        //         let min=0;
        //         let max=200;
        //         let lat = Math.random() * (+max - +min) + +min;
        //         let lon = Math.random() * (+max - +min) + +min;
        //         let map_str = key[i] + "_" + j;
        //         // this.props.toggleMapLayer(map_str);
        //         //call 3D pin
        //         this.props.add3DPin(lat, lon, this.state.static_data[key[i]].imageId, '', map_str, '', '', true);
        //         console.log("3DPIN", map_str, lon, lat, this.state.static_data[key[i]].imageId);
        //     }
        //
        // }

        };


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

    // Simple function to replace string WHITESPACE with underscore and
    // Convert it into lowercase
    makeStr = (str) => {
        const temp = str.split(" ").join("_");
        const str_temp = temp.toLowerCase();
        return str_temp;
    }
    // Code to convert Latitude(s) & Longitude(s)
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

   /**
    * number : name that get display in the layers Right Side,
    * layerData: Data to display on Map,
    * selected: Check box value true/false
    */
    myFunction = ( number, layerData, selected) => {
        
        //console.log(number);
        const str = number.split(" ").join("_");
        const str_temp = str.toLowerCase();
        // alert(JSON.stringify(this.toggle_data));
       // check if data is here
        if(layerData.length > 0){
        if(str_temp in this.toggle_data){
            let x = this.toggle_data[str_temp];
            let length = x.count;
            for(let i = 0 ; i < length ; i++){
                this.props.toggleMapLayer(str_temp+'_'+i);
            }
        }


        // check checkbox status
        if(selected) {
            // if data is coming in API
             if(layerData.length > 0){
                 // read each record
                 layerData.map((d) => {
                     // if in location file path given
                     if(d.fileLocation != null && d.fileLocation != '' && d.fileLocation != undefined){
                         // load kml/kmz
                         this.props.addKML(d.fileLocation, number+'-PARENT');
                     }
                 });
             }
         } else {
               // if check box value false Remove KML data for that Layer
             this.props.removeKML(number+'-PARENT');
           }
 }
    else{
        // if no Data coming in API to display, Load KML File
        // if check box value true load KML file
       /* if(selected) {
            if(layerData.length > 0){
                layerData.map((d) => {
                    if(d.fileLocation != null && d.fileLocation != '' && d.fileLocation != undefined){
                        this.props.addKML('./assets/demo.kml', number+'-PARENT');
                    }
                });
            }
        } else {
              // if check box value false Remove KML data for that Layer
            this.props.removeKML(number+'-PARENT');
          } */
    } 

        //this.props.toggleMapLayer(map_str);
    }
    render() {

        const { locationKMLs, locationTypes, allLayers} = this.props;

        /* const listItem = ['Space', 'Air', 'Maritime', 'Blue Forces'
        , 'Observations',  'Intel Picture', 'SIGACTS', 'Weather','Airfield','Base Locationsnpm ','NAIs','POIs'];
        */
        //const { locationKML } = {'LocationName':'abdf','Category':'xyx', 'LocationLatitude':'76.22', 'LocationLongitude':'76.22','LocationID':'IND',   };
        let static_data = {
            air :{
                imageId : 'airplane_logo'
            },
            maritime :{
                imageId : 'boat'
            },
            personnel :{
                imageId : 'people_logo'
            },
            sensor :{
                imageId : 'bolt_logo'
            },
            blue_forces :{
                imageId : 'horse_logo'
            },
            bases :{
                imageId : 'house_logo'
            },
            intel_requirement :{
                imageId : 'paper_list_logo'
            },
            pois :{
                imageId : 'star_logo'
            },
            ci :{
                imageId : 'eye_logo'
            },
            sigint :{
                imageId : 'stats_logo'
            },
            oswt :{
                imageId : 'megaphone_logo'
            },
            gmti :{
                imageId : 'pointer_logo'
            },
            intel_request_collection_point :{
                imageId : 'cross_logo'
            },
            observation :{
                imageId : 'lens_logo'
            },
            media :{
                imageId : 'photocamera_logo'
            }
        }

        let data = {key : {
            value : 0,
            imageId : ''
        }};

        if(allLayers.length!=0){
            allLayers.forEach((list) => {
                //console.log("DATA",JSON.stringify(list));
                if(!(this.makeStr(list.name) in data)){

                    if(list.data.length >= 1 ){

                        let arr =[];
                        list.data.forEach((dat) => {

                            // if file location given ignore lat lng value
                            if(dat.latitude!='undefined' && dat.latitude!= null
                            && dat.latitude!= '' && dat.latitude <=360  && dat.latitude >=-360 &&
                            dat.longitude!='undefined' && dat.longitude!= null
                            && dat.longitude!= '' && dat.longitude <=360  && dat.longitude >=-360
                            && !(dat.fileLocation != '' && dat.fileLocation != undefined && dat.fileLocation != null ) ){

                                let temp = dat.latitude + ',' + dat.longitude;
                                let temp_map_data = this.getLatLongFromGridCoords(temp);
                                arr.push({lat :temp_map_data.latitude , lon : temp_map_data.longitude, allData : dat});

                            }
                        });
                        let image = "";
                        if(this.makeStr(list.name) in static_data){
                                image = static_data[this.makeStr(list.name)].imageId;
                                    }
                        else{
                                image = "info_logo";
                        }
                        data[this.makeStr(list.name)] = {
                            value : arr,
                            imageId : image
                        };
                    }
                    else {
                        //this.props.addKML('./assets/demo.kml', list.name+'-PARENT' , list.name+'-PARENT');
                    }
                }
                    else{
                        list.data.forEach((dat) => {

                            // if file location given ignore lat lng value
                            if(dat.latitude!='undefined' && dat.latitude!= null
                            && dat.latitude!= '' && dat.latitude <=360  && dat.latitude >=-360 &&
                            dat.longitude!='undefined' && dat.longitude!= null
                            && dat.longitude!= '' && dat.longitude <=360  && dat.longitude >=-360
                            && !(dat.fileLocation != '' && dat.fileLocation != undefined && dat.fileLocation != null ) ){
                                data[this.makeStr(list.name)].value.push({lat :dat.latitude , lon : dat.longitude, allData : dat });
                            }
                        });
                    }
                });
                let key = Object.keys(data);
                // key.forEach((k) => {
                //     console.log("CREATE PARENT ",k);
                //     this.props.createParentMarker(k);
                // });
                /* for(let i = 1; i< key.length ; i++ )
                {
                    console.log("CREATE PARENT ",key[i]);
                    this.props.createParentMarker(key[i]);
                } */
                for(let i = 1; i< key.length ; i++ )
                {
                        if(data[key[i]].value.length>=0 || data[key[i]].value.length!=null){
                            //add pin call
                            let image_id = data[key[i]].imageId;
                            let arr_of_point = data[key[i]].value;
                            let j =0;
                            if(!(key[i] in this.toggle_data)){
                            arr_of_point.forEach((pin) => {
                                let tooltipTextData = '<img src="/assets/img/live_view/map_layer/'+image_id+'.png" style="height:97%;float:left;padding-left:15px;padding-right:15px;background:black;margin-left:-10px;margin-right:5px;">' +
                                'Name : '+pin.allData.name+'<br/>'+'lat : ' + pin.lat + '<br/>' + 'long : '+pin.lon+ '<br/>' + 'Description : '+pin.allData.description +
                                '<br/><br/><a style="color:#ff7c16;float:right;"><strong>Details</strong></a>';
                                this.props.add3DPin(pin.lat,pin.lon,image_id,'',key[i] + '_' + j,pin.allData.name,tooltipTextData,false);
                                j++
                            });
                            this.toggle_data[key[i]] = {
                                count : j,
                                flag : true
                            }
                            //var x = toggle_data[key[i]];
                            // this.setState({
                            //     ...state,
                            //     [toggle_data[key[i]]] : {
                            //         count : j,
                            //         flag : true
                            //     }
                            // });
                        }
                        }
                    };

                }

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
                {number.name} <CheckBox onChangeState={this.myFunction.bind(this, number.name, number.data)}/>
                {
                number.subCategories !=null && number.subCategories != '' && number.subCategories != undefined
                && number.subCategories.map((subCategory) =>
               <div className="popup-item sub-nav-option">{subCategory.name} <CheckBox  onChangeState={this.myFunction.bind(this,subCategory.name, '')}/> </div>
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
