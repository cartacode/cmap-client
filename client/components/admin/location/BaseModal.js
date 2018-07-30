import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import { uploadFile } from 'actions/file';
import { addLocation, fetchLocations } from 'actions/location';

class BaseModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      locationPhotoPreviewUrl: '',
      mapImagePreviewUrl: '',
      location: {
        LocationID: '',
        LocationReferenceCode: '',
        LocationPhoto: '',
        LocationDocument: '',
        LocationMapImage: '',
        LocationName: '',
        LocationStreet: '',
        LocationCity: '',
        LocationPostalCode: '',
        LocationCountry: '',
        LocationCOCOM: '',
        LocationRegion: '',
        LocationLatitude: '',
        LocationLongitude: '',
        LocationMGRS: '',
        LocationElevation: '',
        LocationPointofContact: '',
        LocationFrequency: '',
        KML: '',
      }
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    // console.log("---hereis eoirmodal---------");
    // this.props.fetchLocations();
  }

  handleLocationGeneralData = (generalData) => {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        LocationName: generalData.LocationName,
        LocationStreet: generalData.LocationStreet,
        LocationCity: generalData.LocationCity,
        LocationCountry: generalData.LocationCountry,
        LocationCOCOM: generalData.LocationCOCOM,
        LocationRegion: generalData.LocationRegion,

      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.location);
    });
  }

  handleLocationPositionData = (positionData) => {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        LocationLatitude: positionData.LocationLatitude,
        LocationLongitude: positionData.LocationLongitude,
        LocationMGRS: positionData.LocationMGRS,
        LocationElevation: positionData.LocationElevation,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.location);
    });
  }

  handleLocationInfoData = (infoData) => {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        LocationPointofContact: infoData.LocationPointofContact,
        LocationDSN: infoData.LocationDSN,
        LocationEmailNIPR: infoData.LocationEmailNIPR,
        LocationEmailSIPR: infoData.LocationEmailSIPR,
        LocationFrequency: infoData.LocationFrequency,
        LocationChatID: infoData.LocationChatID
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.location);
    });
  }


  handleUploadFile(event){
      event.preventDefault();
      const {location} = this.state;
      if(event.target.id == "LocationPhoto") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                locationPhotoPreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
      }

      if(event.target.id == "LocationMapImage") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                mapImagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
      }

      let parametername = event.target.id;

      this.setState({
          location: {
              ...location,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.location);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

    //  this.props.uploadFile(data);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.location);
    this.props.addLocation(this.state.location);
    this.props.fetchLocations();
  }

  resetForm(){
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        item.value = '';
      }
      for (let item of drops) {
        item.value = 0;
      }
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    let {locationPhotoPreviewUrl, mapImagePreviewUrl} = this.state;
    let $locationPhoto = '';
    let $mpaImage = '';

    if (locationPhotoPreviewUrl) {
      $locationPhoto = (<img src={locationPhotoPreviewUrl} alt="" className="photo" alt=""/>);
    }
    else {
      $locationPhoto = (<img src="/assets/img/admin/map2.png" className="photo" alt=""/>);
    }

    if (mapImagePreviewUrl) {
      $mpaImage = (<img src={mapImagePreviewUrl} alt="" className="photo" alt=""/>);
    }
    else {
      $mpaImage = (<img src="/assets/img/admin/map1.png" className="photo" alt=""/>);
    }

    const {munition} = this.state;
    const {translations: {translations}} = this.props;


    const generalFields = [
      {name: translations['Name'], type: 'input', domID: 'LocationName', valFieldID: 'LocationName'},
      {name: translations['Street/Road'], type: 'input', domID: 'LocationStreet', valFieldID: 'LocationStreet'},
      {name: translations['City/Town'], type: 'input', domID: 'LocationCity', valFieldID: 'LocationCity'},
      {name: translations['Country'], type: 'dropdown', domID: 'dispLocationCountry', ddID: 'Countries', valFieldID: 'LocationCountry'},
      {name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'LocationCOCOM'},
      {name: translations['Region'], type: 'dropdown', domID: 'dispLocationRegion', ddID: 'Regions', valFieldID: 'LocationRegion'},
    ];

    const locationFields = [
      {name: translations['Lat'], type: 'number', domID: 'LocationLat', valFieldID: 'LocationLatitude'},
      {name: translations['Lon'], type: 'number', domID: 'LocationLon', valFieldID: 'LocationLongitude'},
      {name: translations['Elevation'], type: 'number', domID: 'LocationElevation', valFieldID: 'LocationElevation'},
      {name: translations['MGRS'], type: 'input', domID: 'LocationMGRS', valFieldID: 'LocationMGRS'},

    ];

    const contactFields = [
      {name: translations['Point of Contact'], type: 'input', domID: 'dispLocationPointofContact', valFieldID:'LocationPointofContact'},
      {name: translations['DSN'], type: 'input', domID: 'DSN', valFieldID: 'LocationDSN'},
      {name: translations['Email-NIPR'], type: 'input', domID: 'EmailNIPR', valFieldID: 'LocationEmailNIPR'},
      {name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'LocationEmailSIPR'},
      {name: translations['Frequency'], type: 'number', domID: 'LocationFrequency', valFieldID: 'LocationFrequency'},
      {name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'LocationChatID'},
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >

          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="row personnel" >
            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" style={{width:"35%"}}/>
              <div className="header-text" style={{width:"30%"}}>
                {translations["Base Location Administration"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" style={{width:"35%"}}/>
            </div>
            <div className="personnel-content">
              <div className="col-md-4 image-block">
                 {$locationPhoto}
              </div>
              <div className="col-md-4 image-block">
              {$mpaImage}
              </div>
              <div className="col-md-4 upload-block">
                <div className="upload-imagery">
                  <img src="/assets/img/admin/upload_1.png" alt=""/>
                  <div className="header-text">
                    upload imagery & datasheets
                  </div>
                  <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
                </div>
                <div className="upload-content">
                  <div className="upload-line">
                    <div>
                      {translations['Photo Image']}
                    </div>
                    <input type="file"  name="file" id="LocationPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Document']}
                    </div>
                    <input type="file"  name="file" id="LocationDocument" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Map Image']}
                    </div>
                    <input type="file"  name="file" id="LocationMapImage" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-location-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields}
              data={this.handleLocationGeneralData} initstate ={this.state.location}/>
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Location"]} fields={locationFields}
              data={this.handleLocationPositionData} initstate ={this.state.location}/>
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Contact Information"]} fields={contactFields}
              data={this.handleLocationInfoData} initstate ={this.state.location}/>
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
                {translations['clear']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className='highlighted-button'>
                {translations['Delete']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="submit" className='highlighted-button'>
                {translations['save']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>

      </form>

    );
  }
}

BaseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = {
  addLocation,
  fetchLocations,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseModal);
