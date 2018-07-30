import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
import CustomDatePicker from '../../reusable/CustomDatePicker';
import DropDownButton from '../../reusable/DropDownButton';
import StatusTable from '../../reusable/StatusTable';

import { uploadFile } from 'actions/file';
import { addPayload, fetchPayloads } from 'actions/payload';

class SargmtiModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: '',
        imagePreviewUrl: '',
        imagePreviewUrl2: '',
        payload: {
          PayloadID: '',
          PayloadReferenceCode: '',
          PaylodWireframe: '',
          PayloadPhoto: '',
          Payload3D: '',
          PayloadIcon: '',
          Payload2525B: '',
          PayloadDatasheet: '',
          PayloadName: '',
          PayloadNomenclature: '',
          PayloadRole: '',
          PayloadManufacturer: '',
          PayloadExecutiveAgent: '',
          PayloadContractProgram: '',
          PayloadCost: '',
          PayloadCostNotes: '',
          PayloadLength: '',
          PayloadWidth: '',
          PayloadHeight: '',
          PayloadWeight: '',
          PayloadPower: '',
          PayloadConnector1: '',
          PayloadConnector2: '',
          PayloadDaySpotter: '',
          PayloadThermalImager: '',
          PayloadLaserDesginator: '',
          PayloadContinuousZoom: '',
          PayloadStabalization: '',
          PayloadVibrationIsolation: '',
          PayloadAutoTracker: '',
          PayloadGPSTimeSync: '',
          PayloadInternalGPS: '',
          PayloadInternalINS: '',
          PayloadMetadata: '',
          PayloadCrewCount: '',
          PayloadMOS1: '',
          PayloadMOS2: '',
          PayloadMOS3: '',
        }
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }
  componentWillMount(){
    console.log("---hereis eoirmodal---------");
    //this.props.fetchPayloads();
  }

  handlePayloadGeneralData = (generalData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadSerial: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        PayloadRole: generalData.PayloadRole,
        PayloadManufacturer: generalData.PayloadManufacturer,
        PayloadExecutiveAgent: generalData.PayloadExecutiveAgent,
        PayloadContractProgram: generalData.PayloadContractProgram,
        PayloadCost: generalData.PayloadCost,
        PayloadCostNotes: generalData.PayloadCostNotes,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadTechnicalData = (technicalData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadLength: technicalData.PayloadLength,
        PayloadWidth: technicalData.PayloadWidth,
        PayloadHeight: technicalData.PayloadHeight,
        PayloadWeight: technicalData.PayloadWeight,
        PayloadPower: technicalData.PayloadPower,
        PayloadConnector1: technicalData.PayloadConnector1,
        PayloadConnector2: technicalData.PayloadConnector2,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadFeatureData = (featureData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadFrequencyRange: featureData.PayloadFrequencyRange,
        PayloadScanCoverage: featureData.PayloadScanCoverage,
        PayloadMaximumRange: featureData.PayloadMaximumRange,
        PayloadMapResolution: featureData.PayloadMapResolution,
        PayloadGroundMapping: featureData.PayloadGroundMapping,
        PayloadStripSAR: featureData.PayloadStripSAR,
        PayloadSpotlightSAR: featureData.PayloadSpotlightSAR,
        PayloadCCEOIR: featureData.PayloadCCEOIR,
        PayloadGeoReferencing: featureData.PayloadGeoReferencing,
        PayloadChangeDetect: featureData.PayloadChangeDetect
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }
  handlePayloadCrewData = (crewData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadCrewCount: crewData.PayloadCrewCount,
        PayloadMOS1: crewData.PayloadMOS1,
        PayloadMOS2: crewData.PayloadMOS2,
        PayloadMOS3: crewData.PayloadMOS3
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }


  handleUploadFile(event){
      event.preventDefault();
      const {payload} = this.state;
      if(event.target.id == "PayloadPhoto") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
      }

      else if(event.target.id == "PaylodWireframe") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                imagePreviewUrl2: reader.result
            });
        }
        reader.readAsDataURL(file)
      }

      let parametername = event.target.id;

      this.setState({
          payload: {
              ...payload,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.payload);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      // this.props.uploadFile(data);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.payload);
    this.props.addPayload(this.state.payload);
    this.props.fetchPayloads();
  }


  resetForm(){
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        if (item.id != 'dropdown1')
        {
        item.value = '';
        }
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

    let {imagePreviewUrl} = this.state;
    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview = (<img src="/assets/img/admin/aircraft.png" className="photo" alt=""/>);
    }

    let {imagePreviewUrl2} = this.state;
    let $imagePreview2 = '';

    if (imagePreviewUrl2) {
      $imagePreview2 = (<img src={imagePreviewUrl2} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview2 = (<img src="/assets/img/admin/r2d2-1.png" className="photo" alt=""/>);
    }

    const {payload} = this.state;
    const {translations: {translations}} = this.props;

    const generalFields = [
      {name: translations['Serial#'], type: 'input', domID: 'PayloadSerial', valFieldID: 'PayloadSerial' },
      {name: translations['Owning Unit'], type: 'dropdown', domID: 'PayloadOwningUnit', ddID: 'Units', valFieldID: 'PayloadOwningUnit'},
      {name: translations['Payload Name'], type: 'input', domID: 'PayloadName', valFieldID: 'PayloadName'},
      {name: translations['Payload Nomenclature'], type: 'input', domID: 'PayloadNomenclature', valFieldID: 'PayloadNomenclature'},
      {name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PayloadRoles', valFieldID: 'PayloadRole'},
      {name: translations['Manufacture'], type: 'input', domID: 'PayloadManufacture', valFieldID: 'PayloadManufacturer'},
      {name: translations['Service Executive Agent'], type: 'input', domID: 'PayloadExecutiveAgent', valFieldID: 'PayloadExecutiveAgent'},
      {name: translations['Contract Program'], type: 'input', domID: 'PayloadContractProgram', valFieldID: 'PayloadContractProgram'},
      {name: translations['Cost'], type: 'input', domID: 'PayloadCost', valFieldID: 'PayloadCost'},
      {name: translations['Cost notes'], type: 'input', domID: 'PayloadCostNotes', valFieldID: 'PayloadCostNotes'},
    ];

    const technicalFields = [
      {name: translations['Length (in.)'], type: 'number', domID: 'PayloadLength', valFieldID: 'PayloadLength'},
      {name: translations['Width (in.)'], type: 'number', domID: 'PayloadWidth', valFieldID: 'PayloadWidth'},
      {name: translations['Height (in.)'], type: 'number', domID: 'PayloadHeight', valFieldID: 'PayloadHeight'},
      {name: translations['Weight (lbs.)'], type: 'number', domID: 'PayloadWeight', valFieldID: 'PayloadWeight'},
      {name: translations['Power(W)'], type: 'number', domID: 'PayloadPower', valFieldID: 'PayloadPower'},
      {name: translations['Connector']+ "1", type: 'input', domID: 'PayloadConnector1', valFieldID: 'PayloadConnector1'},
      {name: translations['Connector']+ "2", type: 'input', domID: 'PayloadConnector2', valFieldID: 'PayloadConnector2'},
    ];

    const payloadFields = [
      {name: 'Frequency Range:', type: 'input', domID: 'PayloadFrequencyRange', valFieldID: 'PayloadFrequencyRange'},
      {name: 'Scan Coverage:', type: 'input', domID: 'PayloadScanCoverage', valFieldID: 'PayloadScanCoverage'},
      {name: 'Maximum Range:', type: 'input', domID: 'PayloadMaximumRange', valFieldID: 'PayloadMaximumRange'},
      {name: 'Map Resolution:', type: 'input', domID: 'PayloadMapResolution', valFieldID: 'PayloadMapResolution'},
      {name: 'Ground Mapping:', type: 'checkbox', domID: 'PayloadGroundMapping', valFieldID: 'PayloadGroundMapping'},
      {name: 'Strip SAR:', type: 'checkbox', domID: 'PayloadStripSAR', valFieldID: 'PayloadStripSAR'},
      {name: 'Spotlight SAR:', type: 'checkbox', domID: 'PayloadSpotlightSAR', valFieldID: 'PayloadSpotlightSAR'},
      {name: 'Cross-cue EO/IR:', type: 'checkbox', domID: 'PayloadCCEOIR', valFieldID: 'PayloadCCEOIR'},
      {name: 'Geo-Referencing:', type: 'checkbox', domID: 'PayloadGeoReferencing', valFieldID: 'PayloadGeoReferencing'},
      {name: 'Change Detect:', type: 'checkbox', domID: 'PayloadChangeDetect', valFieldID: 'PayloadChangeDetect'},
    ];

    const crewFields = [
      {name: translations['Payload Crew Count'], type: 'number', domID: 'PayloadCrewCount', valFieldID: 'PayloadCrewCount'},
      {name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'MOS1'},
      {name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'MOS2'},
      {name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'MOS3'},
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >

          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="payload-content">
            <div className="row personnel" >
              <div className="header-line">
                <img src="/assets/img/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  sar/gmti payloads administration
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
              </div>
              <div className="personnel-content">
              <div className="col-md-4 image-block">
                  {$imagePreview}
                </div>
                <div className="col-md-4 image-block">
                {$imagePreview2}
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
                      <input type="file"  name="file" id="PayloadPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Wireframe Image']}
                      </div>
                      <input type="file"  name="file" id="PaylodWireframe" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['3D Model']}
                      </div>
                      <input type="file"  name="file" id="Payload3D" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['2D Icon']}
                      </div>
                      <input type="file"  name="file" id="PayloadIcon" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Milspec Icon']}
                      </div>
                      <input type="file"  name="file" id="Payload2525B" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Datasheets']}
                      </div>
                      <input type="file"  name="file" id="PayloadDatasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-payload-content">
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title="general" fields={generalFields}
                data={this.handlePayloadGeneralData} initstate ={this.state.payload}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title="size, weight, power, connect" fields={technicalFields}
                data={this.handlePayloadTechnicalData} initstate ={this.state.payload}/>
                <ContentBlock bigBackground={true} headerLine="/assets/img/admin/upload_1.png" title="capabilities" fields={payloadFields}
                data={this.handlePayloadFeatureData} initstate ={this.state.payload}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title="crew requirements" fields={crewFields}
                data={this.handlePayloadCrewData} initstate ={this.state.payload}/>
              </div>
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

SargmtiModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPayload: (payload) => {
      dispatch(addPayload(payload));
    },

    fetchPayloads: () => {
      dispatch(fetchPayloads());
    },

    uploadFile: (fileData) => {
      dispatch(uploadFile(fileData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SargmtiModal);
