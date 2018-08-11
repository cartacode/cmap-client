import { uploadFile } from 'actions/file';
import { addLocation, fetchLocationById, fetchLocations, updateLocation } from 'actions/location';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import qs from 'qs';





class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear: false,
      locationPhotoPreviewUrl: '',
      mapImagePreviewUrl: '',
      editFetched:false,
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
        LocationCategory: '',
        LocationDescription: '',
        LastUpdate: '',
        LocationNai: '',
        StateAbbrev: '',
        webAddress: '',
        IATA: '',
        ICAO: '',
        FAA: ''
      },
      oneLocation: {},
      locationPhotoFile: null,
      locationMapFile: null,
      locationDocumentFile: null,
      locationKMLFile: null,
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const { editId } = this.props;
    this.setState({
      clear: true,
    });
    if (editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
  }

  editComponent = (editId) => {
    this.props.fetchLocationById(editId).then(() => {
      this.setState(
        {
          editFetched:true,
          location: this.props.oneLocation,
        });
    });
  }

  stopupd = () => {
    this.setState({editFetched:false});
  }

  handleLocationGeneralData = (generalData) => {
    const { location } = this.state;
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
    const { location } = this.state;
    this.setState({
      location: {
        ...location,
        LocationCategory: positionData.LocationCategory,
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
    const { location } = this.state;
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


  handleUploadFile = (event) => {
    event.preventDefault();
   
    //PHOTO IMAGE
    if (event.target.id == "LocationPhotoFile") {
      this.setState({ locationPhotoFile: event.target.files[0] })
    }
    //MAP IMAGE
    if (event.target.id == "LocationMapFile") {
      this.setState({ locationMapFile: event.target.files[0] })
    }
    //DOCUMENT
    if (event.target.id == "LocationDocumentFile") {
      this.setState({ locationDocumentFile: event.target.files[0] })
    }
    //KML
    if (event.target.id == "LocationKMLFile") {
      this.setState({ locationKMLFile: event.target.files[0] })
    }
    /* const {location} = this.state;
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
    data.append('name', event.target.files[0].name); */

    //  this.props.uploadFile(data);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { location } = this.state;
    const { editId } = this.props;

    //We are going to upload files with JSON request body.
    const formData = new FormData();
  
    if(this.state.locationPhotoFile) {
      formData.append('locationPhotoFile', this.state.locationPhotoFile, this.state.locationPhotoFile.name);
    }

    if(this.state.locationMapFile) {
      formData.append('locationMapFile', this.state.locationMapFile, this.state.locationMapFile.name);
    }

    if(this.state.locationDocumentFile) {
      formData.append('locationDocumentFile', this.state.locationDocumentFile, this.state.locationDocumentFile.name);
    }
    
    if(this.state.locationKMLFile) {
      formData.append('locationKMLFile', this.state.locationKMLFile, this.state.locationKMLFile.name);
    }
    
    
    if (editId !== undefined && editId !== '0') {
       location.LocationID = editId;
       formData.append("locationFormData",qs.stringify(location));
       //TODO: When upload files api will work thn we will pass formData.
       this.props.updateLocation(editId, location).then(() => {
         this.props.onClose();
       });
     } else {
       formData.append("locationFormData", qs.stringify(location));
      //TODO: When upload files api will work thn we will pass formData.
       this.props.addLocation(location).then(() => {
         this.props.onClose();
       });
     }
  }

  stopset() {
    this.setState({ clear: false });
  }

  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      this.setState({ clear: true });
      document.getElementById('locationform').reset();
    }
    else {

    }
  }

  render() {
    // Render nothing if the "show" prop is false

    let { locationPhotoPreviewUrl, mapImagePreviewUrl } = this.state;
    let $locationPhoto = '';
    let $mpaImage = '';

    if (locationPhotoPreviewUrl) {
      $locationPhoto = (<img src={locationPhotoPreviewUrl} alt="" className="photo" alt="" />);
    }
    else {
      $locationPhoto = (<img src="/assets/img/admin/map2.png" className="photo" alt="" />);
    }

    if (mapImagePreviewUrl) {
      $mpaImage = (<img src={mapImagePreviewUrl} alt="" className="photo" alt="" />);
    }
    else {
      $mpaImage = (<img src="/assets/img/admin/map1.png" className="photo" alt="" />);
    }

    const { translations } = this.props;


    const generalFields = [
      { name: translations['Name'], type: 'input', domID: 'LocationName', valFieldID: 'LocationName', required: true },
      { name: translations['Street/Road'], type: 'input', domID: 'LocationStreet', valFieldID: 'LocationStreet' },
      { name: translations['City/Town'], type: 'input', domID: 'LocationCity', valFieldID: 'LocationCity' },
      { name: translations['Country'], type: 'dropdown', domID: 'dispLocationCountry', ddID: 'Countries', valFieldID: 'LocationCountry', required: true },
      { name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM', valFieldID: 'LocationCOCOM', required: true },
      { name: translations['Region'], type: 'dropdown', domID: 'dispLocationRegion', ddID: 'Regions', valFieldID: 'LocationRegion', required: true },
    ];

    const locationFields = [
      { name: translations['LocationType'], type: 'dropdown', domID: 'LocationType', ddID: 'LocationCategory', valFieldID: 'LocationCategory' },
      // { name: translations['Location ID'], type: 'dropdown', domID: 'LocationID', ddID: '', valFieldID: 'LocationID' },
      { name: translations['Lat'], type: 'number', domID: 'LocationLat', valFieldID: 'LocationLatitude' },
      { name: translations['Lon'], type: 'number', domID: 'LocationLon', valFieldID: 'LocationLongitude' },
      { name: translations['Elevation'], type: 'number', domID: 'LocationElevation', valFieldID: 'LocationElevation' },
      { name: translations['MGRS'], type: 'input', domID: 'LocationMGRS', valFieldID: 'LocationMGRS' },
      
    ];

    const contactFields = [
      { name: translations['Point of Contact'], type: 'input', domID: 'dispLocationPointofContact', valFieldID: 'LocationPointofContact' },
      { name: translations['DSN'], type: 'input', domID: 'DSN', valFieldID: 'LocationDSN' },
      { name: translations['Email-NIPR'], type: 'email', domID: 'EmailNIPR', valFieldID: 'LocationEmailNIPR' },
      { name: translations['Email-SIPR'], type: 'email', domID: 'EmailSIPR', valFieldID: 'LocationEmailSIPR' },
      { name: translations['Frequency'], type: 'number', domID: 'LocationFrequency', valFieldID: 'LocationFrequency' },
      { name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'LocationChatID' },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="locationform">
        <div className="close-button change-cursor-to-pointer" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div>
        <div className="row personnel" >
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" style={{ width: "35%" }} />
            <div className="header-text" style={{ width: "30%" }}>
              {translations["Base Location Administration"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" style={{ width: "35%" }} />
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
                <img src="/assets/img/admin/upload_1.png" alt="" />
                <div className="header-text">
                  upload imagery & datasheets
                  </div>
                <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt="" />
              </div>
              <div className="upload-content">
                <div className="upload-line">
                  <div>
                    {translations['Photo Image']}
                  </div>
                  <input type="file" name="file" id="LocationPhotoFile" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['Map Image']}
                  </div>
                  <input type="file" name="file" id="LocationMapFile" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['Document']}
                  </div>
                  <input type="file" name="file" id="LocationDocumentFile" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['KML Marker']}
                  </div>
                  <input type="file" name="file" id="LocationKMLFile" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="row personnel" >
          <div className="under-location-content">
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields}
              data={this.handleLocationGeneralData} initstate={this.props.oneLocation} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Location"]} fields={locationFields}
              data={this.handleLocationPositionData} initstate={this.props.oneLocation} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Contact Information"]} fields={contactFields}
              data={this.handleLocationInfoData} initstate={this.props.oneLocation} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button className='highlighted-button'>
              {translations['Delete']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className='highlighted-button'>
              {translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

BaseModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneLocation: state.locations.oneLocation
  };
};

const mapDispatchToProps = {
  addLocation,
  updateLocation,
  fetchLocations,
  fetchLocationById,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseModal);
