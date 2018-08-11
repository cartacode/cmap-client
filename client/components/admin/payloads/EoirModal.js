import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
import CustomDatePicker from '../../reusable/CustomDatePicker';
import DropDownButton from '../../reusable/DropDownButton';
import StatusTable from '../../reusable/StatusTable';

import { uploadFile } from 'actions/file';
import { addPayload, fetchPayloads, fetchPayloadsById, updatePayload, deletePayloadsById } from 'actions/payload';

class EoirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      clear: false,
      editFetched: false,
      payload: {
        // PayloadID: '',
        // PayloadReferenceCode: '',
        // PaylodWireframe: '',
        // PayloadPhoto: '',
        // Payload3D: '',
        // PayloadIcon: '',
        // Payload2525B: '',
        // PayloadDatasheet: '',
        // PayloadSerialNumber: '',
        // PayloadName: '',
        // PayloadNomenclature: '',
        // PayloadRole: '',
        // PayloadManufacturer: '',
        // PayloadExecutiveAgent: '',
        // PayloadContractProgram: '',
        // PayloadCost: '',
        // PayloadCostNotes: '',
        // PayloadLength: '',
        // PayloadWidth: '',
        // PayloadHeight: '',
        // PayloadWeight: '',
        // PayloadPower: '',
        // PayloadConnector1: '',
        // PayloadConnector2: '',
        // PayloadDaySpotter: '',
        // PayloadThermalImager: '',
        // PayloadLaserDesginator: '',
        // PayloadContinuousZoom: '',
        // PayloadStabalization: '',
        // PayloadVibrationIsolation: '',
        // PayloadAutoTracker: '',
        // PayloadGPSTimeSync: '',
        // PayloadInternalGPS: '',
        // PayloadInternalINS: '',
        // PayloadMetadata: '',
        // PayloadCrewCount: '',
        // PayloadMOS1: '',
        // PayloadMOS2: '',
        // PayloadMOS3: '',
        // PayloadType: '',
        // PayloadCOCOM: '2',
        // PayloadLocation: 'd0386ac6-1609-444e-aa7f-91a17f5a42aa',
      },
      onePayload: {},
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }
  
  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
    if(editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    
  }

  stopUpdate = () => {
    this.setState({editFetched:false});
  }

  editComponent = (editId) => {
    this.props.fetchPayloadsById(editId).then(() => {
      this.setState({
        editFetched: true,
        payload: this.props.onePayload,
      });
    });
  }




  handlePayloadGeneralData = (generalData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        // PayloadSerialNumber: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        MissionRole: generalData.MissionRole,
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
    const { payload } = this.state;
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
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadDaySpotter: featureData.PayloadDaySpotter,
        PayloadThermalImager: featureData.PayloadThermalImager,
        PayloadLaserDesginator: featureData.PayloadLaserDesginator,
        PayloadContinuousZoom: featureData.PayloadContinuousZoom,
        PayloadStabalization: featureData.PayloadStabalization,
        PayloadVibrationIsolation: featureData.PayloadVibrationIsolation,
        PayloadAutoTracker: featureData.PayloadAutoTracker,
        PayloadGPSTimeSync: featureData.PayloadGPSTimeSync,
        PayloadInternalGPS: featureData.PayloadInternalGPS,
        PayloadInternalINS: featureData.PayloadInternalINS,
        PayloadMetadata: featureData.PayloadMetadata
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }
  handlePayloadCrewData = (crewData) => {
    const { payload } = this.state;
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


  handleUploadFile(event) {
    event.preventDefault();
    const { payload } = this.state;
    if (event.target.id == "PayloadPhoto") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }

    else if (event.target.id == "PaylodWireframe") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl2: reader.result
        });
      }
      reader.readAsDataURL(file)
    }

    let parametername = event.target.id;

    this.setState({
      payload: {
        ...payload,
        [parametername]: event.target.files[0].name
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
  
    let { payload } = this.state;
    const { editId, payloadTypeId } = this.props;
    
    payload.PayloadType = payloadTypeId;
    console.log('submitting'+JSON.stringify(payload));
    if (editId !== undefined && editId !== '0') {
      payload.PayloadID = editId;
      this.props.updatePayload(editId, payload).then(() => { this.props.onClose('UPDATE'); });
    } else {
      this.props.addPayload(payload).then(() => { this.props.onClose('ADD'); });
    }
  }

  deletePayload= ()=> {
    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      this.props.deletePayloadsById(editId).then(() => { this.props.onClose('DELETE'); });
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
      document.getElementById('payloadform').reset();
    }
  }


  render() {

    let { imagePreviewUrl } = this.state;

    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt="" />);
    }
    else {
      $imagePreview = (<img src="/assets/img/admin/aircraft.png" className="photo" alt="" />);
    }

    let { imagePreviewUrl2 } = this.state;
    let $imagePreview2 = '';

    if (imagePreviewUrl2) {
      $imagePreview2 = (<img src={imagePreviewUrl2} alt="" className="photo" alt="" />);
    }
    else {
      $imagePreview2 = (<img src="/assets/img/admin/r2d2-1.png" className="photo" alt="" />);
    }

    const { translations } = this.props;

    const generalFields = [
      /* { name: translations['Serial#'], type: 'number', domID: 'PayloadSerial', valFieldID: 'PayloadSerial', required: true }, */
      /* { name: translations['Owning Unit'], type: 'dropdown', domID: 'PayloadOwningUnit', ddID: 'Units', valFieldID: 'PayloadOwningUnit' }, */
      { name: translations['Payload Name'], type: 'input', domID: 'PayloadName', valFieldID: 'PayloadName', required: true },
      { name: translations['Payload Nomenclature'], type: 'input', domID: 'PayloadNomenclature', valFieldID: 'PayloadNomenclature', required: true },
      { name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PayloadRoles/GetPayloadRoles', valFieldID: 'MissionRole', required: true },
      { name: translations['Manufacture'], type: 'dropdown', domID: 'PayloadManufacture', ddID: 'Companies/GetCompanies', valFieldID: 'PayloadManufacturer', required: true },
      { name: translations['Service Executive Agent'], type: 'input', domID: 'PayloadExecutiveAgent', valFieldID: 'PayloadExecutiveAgent', required: true },
      { name: translations['Contract Program'], type: 'input', domID: 'PayloadContractProgram', valFieldID: 'PayloadContractProgram', required: true },
      { name: translations['Cost'], type: 'number', domID: 'PayloadCost', valFieldID: 'PayloadCost' },
      { name: translations['Cost notes'], type: 'input', domID: 'PayloadCostNotes', valFieldID: 'PayloadCostNotes' },
    ];

    const technicalFields = [
      { name: translations['Length (in.)'], type: 'number', domID: 'PayloadLength', valFieldID: 'PayloadLength', required: true },
      { name: translations['Width (in.)'], type: 'number', domID: 'PayloadWidth', valFieldID: 'PayloadWidth', required: true },
      { name: translations['Height (in.)'], type: 'number', domID: 'PayloadHeight', valFieldID: 'PayloadHeight', required: true },
      { name: translations['Weight (lbs.)'], type: 'number', domID: 'PayloadWeight', valFieldID: 'PayloadWeight', required: true },
      { name: translations['Power(W)'], type: 'number', domID: 'PayloadPower', valFieldID: 'PayloadPower', required: true },
      { name: translations['Connector'] + "1", type: 'input', domID: 'PayloadConnector1', valFieldID: 'PayloadConnector1' },
      { name: translations['Connector'] + "2", type: 'input', domID: 'PayloadConnector2', valFieldID: 'PayloadConnector2' },
    ];

    const payloadFields = [
      { name: translations['Day Spotter'], type: 'checkbox', domID: 'PayloadDaySpotter', valFieldID: 'PayloadDaySpotter' },
      { name: translations['Thermal Imager'], type: 'checkbox', domID: 'PayloadThermalImager', valFieldID: 'PayloadThermalImager' },
      { name: translations['Laser Designator'], type: 'checkbox', domID: 'PayloadLaserDesignator', valFieldID: 'PayloadLaserDesignator' },
      { name: translations['Continuous Zoom'], type: 'checkbox', domID: 'PayloadContinuousZoom', valFieldID: 'PayloadContinuousZoom' },
      { name: translations['Stabilization'], type: 'checkbox', domID: 'PayloadStabilization', valFieldID: 'PayloadStabilization' },
      { name: translations['Vibration Isolation'], type: 'checkbox', domID: 'PayloadVibrationIsolation', valFieldID: 'PayloadVibrationIsolation' },
      { name: translations['Auto-Tracker'], type: 'checkbox', domID: 'PayloadAutoTracker', valFieldID: 'PayloadAutoTracker' },
      { name: translations['GPS Time Sync'], type: 'checkbox', domID: 'PayloadGPSTimeSync', valFieldID: 'PayloadGPSTimeSync' },
      { name: translations['Internal GPS'], type: 'checkbox', domID: 'PayloadInternalGPS', valFieldID: 'PayloadInternalGPS' },
      { name: translations['Internal INS'], type: 'checkbox', domID: 'PayloadInternalINS', valFieldID: 'PayloadInternalINS' },
      { name: translations['Metadata'], type: 'checkbox', domID: 'PayloadMetadata', valFieldID: 'PayloadMetadata' },

    ];

    const crewFields = [
      { name: translations['Payload Crew Count'], type: 'number', domID: 'PayloadCrewCount', valFieldID: 'PayloadCrewCount', required: true },
      { name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'PayloadMOS1', required: true },
      { name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'PayloadMOS2', required: true },
      { name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'PayloadMOS3', required: true },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="payloadform">

        {/*  <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div> */}
        <div className="payload-content">
          <div className="row personnel" >
            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                {translations["eo/ir payloads administration"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
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
                    <input type="file" name="file" id="PayloadPhoto" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Wireframe Image']}
                    </div>
                    <input type="file" name="file" id="PaylodWireframe" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['3D Model']}
                    </div>
                    <input type="file" name="file" id="Payload3D" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['2D Icon']}
                    </div>
                    <input type="file" name="file" id="PayloadIcon" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Milspec Icon']}
                    </div>
                    <input type="file" name="file" id="Payload2525B" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Datasheets']}
                    </div>
                    <input type="file" name="file" id="PayloadDatasheet" onChange={this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-payload-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadGeneralData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["size, weight, power, connect"]} fields={technicalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadTechnicalData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock bigBackground={true} headerLine="/assets/img/admin/upload_1.png" title={translations["payload features"]} fields={payloadFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadFeatureData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadCrewData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
            </div>
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
            <button type="submit" className='highlighted-button'>
            {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

EoirModal.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayload: state.payloads.onePayload,
  };
};

const mapDispatchToProps = {
  addPayload,
  deletePayloadsById,
  fetchPayloads,
  fetchPayloadsById,
  uploadFile,
  updatePayload,
};

export default connect(mapStateToProps, mapDispatchToProps)(EoirModal);

