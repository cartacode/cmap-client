import { uploadFile } from 'actions/file';
import { addPayload, fetchPayloads, fetchPayloadsById, updatePayload } from 'actions/payload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";



class EquipmentModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      clear: false,
      editFetched: false,
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
      this.props.editComponent(editId);
    }
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
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


  // componentDidMount = () => {
  //   const { editId } = this.props;
  //   if (editId !== undefined && editId !== '0') {
  //     this.props.fetchPayloadsById(editId);
  //   } else {
  //     // this.setState({ onePayload: {} });
  //   }
  //   console.log("variable" + editId);
  // }

  handlePayloadGeneralData = (generalData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        // PayloadSerial: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        PayloadRole: generalData.PayloadRole,
        PayloadManufacturer: generalData.PayloadManufacturer,
        PayloadExecutiveAgent: generalData.PayloadExecutiveAgent,
        PayloadContractProgram: generalData.PayloadContractProgram,
        PayloadCost: generalData.PayloadCost,
        PayloadCostNotes: generalData.PayloadCostNotes,
        MissionRole: generalData.MissionRole,        
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
        PayloadLensCount: featureData.PayloadlensCount
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
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }

    else if (event.target.id == "PaylodWireframe") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
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
    /*  console.log('---here--');
     console.log(this.state.payload);
     this.props.addPayload(this.state.payload).then( () => {this.props.onClose();}); */

    console.log(this.state.payload);
    const { payload } = this.state;
    const { editId, payloadTypeId } = this.props;
    payload.PayloadType = payloadTypeId;
    if (editId !== undefined && editId !== '0') {
      payload.PayloadID = editId;
      this.props.updatePayload(editId, payload).then(() => { this.props.onClose('UPDATE'); });
    } else {
      this.props.addPayload(payload).then(() => { this.props.onClose('ADD'); });
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
    else {

    }
  }


  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

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

    /* const {payload} = this.state; */
    const { translations } = this.props;


    const generalFields = [
      // { name: translations['Serial#'], type: 'number', domID: 'PayloadSerial', valFieldID: 'PayloadSerial', required: true },
      // { name: translations['Owning Unit'], type: 'dropdown', domID: 'PayloadOwningUnit', ddID: 'Units', valFieldID: 'PayloadOwningUnit' },
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

    const itemDescription = [
      { name: 'Lens Count:', type: 'number', domID: 'PayloadLensCount', valFieldID: 'PayloadLensCount' },
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
                equipment payloads administration
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
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title="general" fields={generalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadGeneralData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title="size, weight, power, connect" fields={technicalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadTechnicalData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock bigBackground={true} headerLine="/assets/img/admin/upload_1.png" title="Item Description" fields={itemDescription} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadFeatureData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

EquipmentModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayload: state.payloads.onePayload,
  };
};

const mapDispatchToProps = {
  addPayload,
  fetchPayloads,
  uploadFile,
  updatePayload,
  fetchPayloadsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentModal);
