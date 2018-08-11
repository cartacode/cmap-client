import { uploadFile } from 'actions/file';
import { addPlatform, fetchPlatformById, fetchPlatforms, updatePlatform } from 'actions/platform';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';




class AddPlatformModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      isUpdated: false,
      platform: {
        //  PlatformID: '',
        //  PlatformWireframe: '',
        //  PlatformPhoto: '',
        //  Platform3D: '',
        //  PlatformIcon: '',
        //  Platform2525B: '',
        //  PlatformDatasheet: '',
        //  PlatformTailNumber: '',
        //  PlatformName: '',
        //  PlatformNomenclature: '',
        //  PlatformCategory: '',
        //  PlatformService: '',
        //  PlatformRole: '',
        //  PlatformManufacturer: '',
        //  PlatformExecutiveAgent: '',
        //  PlatformContractProgram: '',
        //  PlatformCost: '',
        //  PlatformCostNotes: '',
        //  PlatformIOCDate: '',
        //  // PlatformGroundStation: '',
        //  PlatformLength: '',
        //  PlatformWingspan: '',
        //  PlatformHeight: '',
        //  PlatformWeight: '',
        //  PlatformPowerPlant: '',
        //  PlatformFuelCapacity: '',
        //  PlatformCruisingSpeed: '',
        //  PlatformRange: '',
        //  PlatformCeiling: '',
        //  PlatformMaxTakeOff: '',
        //  // PlatformMinRunway: '',
        //  PlatformPayloadCapacity: '',
        //  PlatformPayloadCount: '',
        //  PlatformPayload1: '',
        //  PlatformPayload2: '',
        //  PlatformPayload3: '',
        //  PlatformPayload4: '',
        //  PlatformPayload5: '',
        //  PlatformPayload6: '',
        //  PlatformArmamentCapacity: '',
        //  PlatformArmamentCount: '',
        //  PlatformArmament1: '',
        //  PlatformArmament2: '',
        //  PlatformArmament3: '',
        //  // PlatformComs1: '',
        //  // PlatformComs2: '',
        //  PlatformFlightCrewReq: '',
        //  PlatformLineCrewReq: '',
        //  PlatformPayloadCrewReq: '',
        //  PlatformPEDCrewReq: '',
        //  PlatformFlightCrewMOS: '',
        //  PlatformLineCrewMOS: '',
        //  PlatformPayloadCrewMOS: '',
        //  PlatformPEDCrewMOS: ''
      },

      onePlatform: {},
    };
    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    // this.baseState = this.state;
  }

 
  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== undefined && editId !== '0') {
      this.props.fetchPlatformById(editId).then(() => {
        this.setState(
          { isUpdated: true,
            platform: this.props.onePlatform, 
          });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchPlatformById(editId).then(() => {
        this.setState(
          { isUpdated: true,
            platform: this.props.onePlatform, 
          });
      });
    }
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handlePlatformGeneralData = (generalData) => {
    const { platform } = this.state;
    console.log(generalData);
    this.setState({
      platform: {
        ...platform,
        PlatformName: generalData.PlatformName,
        PlatformNomenclature: generalData.PlatformNomenclature,
        PlatformCategory: generalData.PlatformCategory,
        PlatformService: generalData.PlatformService,
        PlatformRole: generalData.PlatformRole,
        PlatformManufacturer: generalData.PlatformManufacturer,
        PlatformExecutiveAgent: generalData.PlatformExecutiveAgent,
        PlatformContractProgram: generalData.PlatformContractProgram,
        PlatformCost: generalData.PlatformCost,
        PlatformCostNotes: generalData.PlatformCostNotes,
        PlatformIOCDate: generalData.PlatformIOCDate,
        // PlatformInventory: generalData.PlatformInventory,
        // PlatformGroundStation: generalData.PlatformGroundStation
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handlePlatformTechnicalData = (technicalData) => {
    const { platform } = this.state;
    console.log(technicalData);
    this.setState({
      platform: {
        ...platform,
        PlatformLength: technicalData.PlatformLength,
        PlatformWingspan: technicalData.PlatformWingspan,
        PlatformHeight: technicalData.PlatformHeight,
        PlatformWeight: technicalData.PlatformWeight,
        PlatformPowerPlant: technicalData.PlatformPowerPlant,
        PlatformFuelCapacity: technicalData.PlatformFuelCapacity,
        PlatformCruisingSpeed: technicalData.PlatformCruisingSpeed,
        PlatformRange: technicalData.PlatformRange,
        PlatformCeiling: technicalData.PlatformCeiling,
        PlatformMaxTakeOff: technicalData.PlatformMaxTakeOff,
        PlatformPayloadCapacity: technicalData.PlatformPayloadCapacity,
        PlatformPayloadCount: technicalData.PlatformPayloadCount,
        PlatformArmamentCapacity: technicalData.PlatformArmamentCapacity,
        PlatformArmamentCount: technicalData.PlatformArmamentCount,
        //  PlatformMinRunway: technicalData.PlatformMin

      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handlePlatformPayloadData = (payloadData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformPayloadCapacity: payloadData.PlatformPayloadCapacity,
        PlatformPayloadCount: payloadData.PlatformPayloadCount,
        // PlatformPayload1: payloadData.PlatformPayload1,
        // PlatformPayload2: payloadData.PlatformPayload2,
        // PlatformPayload3: payloadData.PlatformPayload3,
        PlatformArmamentCapacity: payloadData.PlatformArmamentCapacity,
        PlatformArmamentCount: payloadData.PlatformArmamentCount,
        // PlatformArmament1: payloadData.PlatformArmament1,
        // PlatformArmament2: payloadData.PlatformArmament2,
        // PlatformArmament3: payloadData.PlatformArmament3,
        // PlatformComs1: payloadData.PlatformComs1,
        // PlatformComs2: payloadData.PlatformComs2,

      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handlePlatformCrewData = (crewData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformFlightCrewReq: crewData.PlatformFlightCrewReq,
        PlatformLineCrewReq: crewData.PlatformLineCrewReq,
        PlatformPayloadCrewReq: crewData.PlatformPayloadCrewReq,
        PlatformPEDCrewReq: crewData.PlatformPEDCrewReq,
        PlatformFlightCrewMOS: crewData.PlatformFlightCrewMOS,
        PlatformLineCrewMOS: crewData.PlatformLineCrewMOS,
        PlatformPayloadCrewMOS: crewData.PlatformPayloadCrewMOS,
        PlatformPEDCrewMOS: crewData.PlatformPEDCrewMOS,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handlePlatformConfigData = (configData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformPayload1: configData.Payload1,
        PlatformPayload2: configData.Payload2,
        PlatformPayload3: configData.Payload3,
        PlatformPayload4: configData.Payload4,
        PlatformPayload5: configData.Payload5,
        PlatformPayload6: configData.Payload6
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handleUploadImgFile(event) {
    event.preventDefault();
    const { platform } = this.state;

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)

    this.setState({
      platform: {
        ...platform,
        PlatformWireframe: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.platform);
    });

    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);


    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
      console.log(response);
    });

  }

  handleUploadPhotoFile(event) {
    event.preventDefault();
    const { platform } = this.state;

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl2: reader.result
      });
    }
    reader.readAsDataURL(file);

    let parametername = event.target.id;
    this.setState({
      platform: {
        ...platform,
        [parametername]: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.platform);
    });

    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);


    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
      console.log(response);
    });

  }

  handleUpload3DFile(event) {
    event.preventDefault();
    const { platform } = this.state;

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    reader.readAsDataURL(file);

    this.setState({
      platform: {
        ...platform,
        Platform3D: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.platform);
    });

    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);


    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
      console.log(response);
    });

  }

  handleUploadIconFile(event) {
    event.preventDefault();
    const { platform } = this.state;

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    reader.readAsDataURL(file);

    this.setState({
      platform: {
        ...platform,
        PlatformIcon: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.platform);
    });

    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);


    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
      console.log(response);
    });

  }

  handleUploadDatasheetsFile(event) {
    event.preventDefault();
    const { platform } = this.state;

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    reader.readAsDataURL(file);

    this.setState({
      platform: {
        ...platform,
        PlatformDatasheet: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.platform);
    });

    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);

    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
      console.log(response);
    });

  }

  handleSubmit = event => {
    event.preventDefault();
    let { platform } = this.state;
    const { editId } = this.props;
    console.log('submitting'+JSON.stringify(platform));
    if (editId !== undefined && editId !== '0') {
      platform.PlatformID = editId;
      this.props.updatePlatform(editId, platform).then(() => {this.props.onClose('UPDATE');});
    } else {
      this.props.addPlatform(platform).then(() => {this.props.onClose('ADD'); });
    }
  }

  stopset = () => {
    this.setState({ clear: false });
  }


  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      this.setState({ clear: true });
    }
  }


  render() {
    // Render nothing if the "show" prop is false
    /* if (!this.props.show) {
      return null;
    } */

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
      $imagePreview2 = (<img src="/assets/img/admin/primoris_backgr.png" className="photo" alt="" />);
    }


    let nums = [{label:'--Select--', value:''}];
    for(let i = 20; i > 0; i--) {
      nums.push({ 'label': i, 'value': i });
    }

    //let { platform } = this.state;
    const { translations } = this.props;

    const generalFields = [
      /* { name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'PlatformTailNumber', required: true }, */
      { name: translations['Platform Name'], type: 'input', domID: 'PlatformName', valFieldID: 'PlatformName', required: true },
      { name: translations['Platform Nomenclature'], type: 'input', domID: 'PlatformNomenclature', valFieldID: 'PlatformNomenclature', required: true },
      { name: translations['Category'], type: 'dropdown', domID: 'Category', ddID: 'PlatformCategory', valFieldID: 'PlatformCategory', required: true },
      /* { name: translations['Branch'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID: 'PlatformService', required: true }, */
      { name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PlatformRoles', valFieldID: 'PlatformRole', required: true },
      { name: translations['Manufacture'], type: 'dropdown', domID: 'dispPlatformManufacture', ddID: 'Companies/GetCompanies', valFieldID: 'PlatformManufacturer', required: true },
      { name: translations['Service Executive Agent'], type: 'input', domID: 'PlatformExecutiveAgent', valFieldID: 'PlatformExecutiveAgent' },
      { name: 'Contact Program', type: 'input', domID: 'PlatformContractProgram', valFieldID: 'PlatformContractProgram' },
      { name: translations['Cost'], type: 'number', domID: 'PlatformCost', valFieldID: 'PlatformCost' },
      { name: translations['Cost notes'], type: 'input', domID: 'PlatformCostNotes', valFieldID: 'PlatformCostNotes' },
      { name: translations['Initial Op Capability'], type: 'date', domID: 'PlatformIOCDate', valFieldID: 'PlatformIOCDate' },
      // {name: translations['Inventory'], type: 'dropdown', domID: 'PlatformInventory', ddID: 'PlatformInventory'},
      // { name: translations['Ground Control Station'], type: 'dropdown', domID: 'PlatformGroundStation', ddID: 'PlatformGroundStation', valFieldID: 'PlatformGroundStation', valField: '18' }
    ];

    const technicalFields = [
      { name: translations['Length (ft.)'], type: 'number', domID: 'Length', valFieldID: 'PlatformLength', required: true },
      { name: translations['Wingspan (ft.)'], type: 'number', domID: 'Wingspan', valFieldID: 'PlatformWingspan', required: true },
      { name: translations['Height (ft.)'], type: 'number', domID: 'Height', valFieldID: 'PlatformHeight', required: true },
      { name: translations['Weight (lbs.)'], type: 'number', domID: 'Weight', valFieldID: 'PlatformWeight', required: true },
      { name: translations['Power Plant'], type: 'input', domID: 'PowerPlant', valFieldID: 'PlatformPowerPlant' },
      { name: translations['Fuel Capacity(lbs.)'], type: 'number', domID: 'FuelCapacity', valFieldID: 'PlatformFuelCapacity' },
      { name: translations['Cruising Speed(mph)'], type: 'number', domID: 'CruisingSpeed', valFieldID: 'PlatformCruisingSpeed' },
      { name: translations['Range(miles)'], type: 'number', domID: 'Range', valFieldID: 'PlatformRange', required: true },
      { name: translations['Ceiling(ft.)'], type: 'number', domID: 'Ceiling', valFieldID: 'PlatformCeiling', required: true },
      { name: translations['Max Takeoff Weight(lbs.)'], type: 'number', domID: 'MaxTakeoffWeight', valFieldID: 'PlatformMaxTakeOff', required: true },
      { name: translations['Payload Capacity(lbs.)'], type: 'number', domID: 'PlatformPayloadCapacity', valFieldID: 'PlatformPayloadCapacity', required: true },
      { name: translations['Payload Count'], type: 'number', domID: 'PlatformPayloadCount', valFieldID: 'PlatformPayloadCount' },
      { name: translations['Armament Capacity(lbs.)'], type: 'number', domID: 'PlatformArmamentCapacity', valFieldID: 'PlatformArmamentCapacity', required: true },
      { name: translations['Armament Count'], type: 'number', domID: 'PlatformArmamentCount', valFieldID: 'PlatformArmamentCount' },
      //  {name: translations['Min Runway(ft.)'], type: 'input', domID: 'MinRunway', valFieldID: 'PlatformMinRunway'},
    ];

    const payloadsFields = [
      { name: translations['Payload Capacity(lbs.)'], type: 'number', domID: 'PlatformPayloadCapacity', valFieldID: 'PlatformPayloadCapacity', required: true },
      { name: translations['Payload Count'], type: 'number', domID: 'PlatformPayloadCount', valFieldID: 'PlatformPayloadCount' },
      /* { name: translations['Payload #1'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload1', valFieldID: 'PlatformPayload1' },
      { name: translations['Payload #2'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload2', valFieldID: 'PlatformPayload2' },
      { name: translations['Payload #3'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload3', valFieldID: 'PlatformPayload3' },
      { name: translations['Payload #4'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload4', valFieldID: 'PlatformPayload4' },
      { name: translations['Payload #5'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload5', valFieldID: 'PlatformPayload5' },
      { name: translations['Payload #6'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload6', valFieldID: 'PlatformPayload6' }, */
      { name: translations['Armament Capacity(lbs.)'], type: 'number', domID: 'PlatformArmamentCapacity', valFieldID: 'PlatformArmamentCapacity', required: true },
      { name: translations['Armament Count'], type: 'number', domID: 'PlatformArmamentCount', valFieldID: 'PlatformArmamentCount' },
      /* { name: translations['Armament #1'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament1', valFieldID: 'PlatformArmament1' },
      { name: translations['Armament #2'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament2', valFieldID: 'PlatformArmament2' },
      { name: translations['Armament #3'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament3', valFieldID: 'PlatformArmament3' },
      { name: translations['Coms Type #1'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs1', valFieldID: 'PlatformComs1' },
      { name: translations['Coms Type #2'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs2', valFieldID: 'PlatformComs2' }, */

    ];

    const crewFields = [
      { name: translations['Flight Crew Req'], type: 'dropdown', domID: 'PlatformFlightCrewReq', valFieldID: 'PlatformFlightCrewReq', ddID: '', options: nums },
      { name: translations['Flight Crew Mos'], type: 'dropdown', domID: 'PlatformFlightCrewMOS', valFieldID: 'PlatformFlightCrewMOS', ddID: 'MOS', required: true },
      { name: translations['Line Crew Req'], type: 'dropdown', domID: 'PlatformLineCrewReq', valFieldID: 'PlatformLineCrewReq', ddID: '', options: nums },
      { name: translations['Line Crew Mos'], type: 'dropdown', domID: 'PlatformLineCrewMOS', valFieldID: 'PlatformLineCrewMOS', ddID: 'MOS', required: true },
      { name: translations['Payload Crew Req'], type: 'dropdown', domID: 'PlatformPayloadCrewReq', valFieldID: 'PlatformPayloadCrewReq', ddID: '', options: nums},
      { name: translations['Payload Crew Mos'], type: 'dropdown', domID: 'PlatformPayloadCrewMOS', valFieldID: 'PlatformPayloadCrewMOS', ddID: 'MOS', required: true },
      { name: translations['PED Crew Req'], type: 'dropdown', domID: 'PlatformPEDCrewReq', valFieldID: 'PlatformPEDCrewReq', ddID: '', options: nums },
      { name: translations['PED Crew Mos'], type: 'dropdown', domID: 'PlatformPEDCrewMOS', valFieldID: 'PlatformPEDCrewMOS', ddID: 'MOS', required: true },

    ];

    const configureFields = [
      { name: translations['Add Payload'] + " #1", type: 'dropdown', domID: 'AddPayload1', ddID: 'Payload/GetPayloads', valFieldID: 'PlatformPayload1' },
      { name: translations['Add Payload'] + " #2", type: 'dropdown', domID: 'AddPayload2', ddID: 'Payload/GetPayloads', valFieldID: 'PlatformPayload2' },
      { name: translations['Add Payload'] + " #3", type: 'dropdown', domID: 'AddPayload3', ddID: 'Payload/GetPayloads', valFieldID: 'PlatformPayload3' },
      //{name: translations['Add Munition']+" #1", type: 'dropdown', domID: 'AddMunition1', ddID: 'Munition/GetMunitions', valFieldID: 'Munition1' },
      // {name: translations['Add Munition']+" #2", type: 'dropdown', domID: 'AddMunition2', ddID: 'Munition/GetMunitions', valFieldID: 'Munition2'},
      // {name: translations['Add Munition']+" #3", type: 'dropdown', domID: 'AddMunition3', ddID: 'Munition/GetMunitions', valFieldID: 'Munition3'},
    ];


    

    // const nums = [
    //   { name: '0' },
    //   { name: '1' },
    //   { name: '2' },
    //   { name: '3' },
    //   { name: '4' },
    //   { name: '5' },
    //   { name: '6' },
    //   { name: '7' },
    //   { name: '8' },
    //   { name: '9' },
    //   { name: '10' },
    //   { name: '11' },
    //   { name: '12' },
    //   { name: '13' },
    //   { name: '14' },
    //   { name: '15' },
    //   { name: '16' },
    //   { name: '17' },
    //   { name: '18' },
    //   { name: '19' },
    //   { name: '20' }
    // ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="platform">
        <div className="payload-content">
          <div className="row personnel" >
            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                {translations["Platform Administration"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
            <div className="platform-and-munitions-content">
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
                    <input type="file" name="file" id="PlatformPhoto" onChange={this.handleUploadImgFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Wireframe Image']}
                    </div>
                    <input type="file" name="file" id="PlatformWireframe" onChange={this.handleUploadPhotoFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['3D Model']}
                    </div>
                    <input type="file" name="file" id="Platform3DModel" onChange={this.handleUpload3DFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Milspec Icon']}
                    </div>
                    <input type="file" name="file" id="PlatformMilspec" onChange={this.handleUploadIconFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                  </div>
                  <div className="upload-line">
                    <div>
                      {translations['Datasheets']}
                    </div>
                    <input type="file" name="file" id="file" onChange={this.handleUploadDatasheetsFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-personnel-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields} stopupd={this.stopUpdate} editFetched={this.state.isUpdated}
                data={this.handlePlatformGeneralData} initstate ={this.props.onePlatform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/>
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Technical specification"]} fields={technicalFields} stopupd={this.stopUpdate} editFetched={this.state.isUpdated}
                data={this.handlePlatformTechnicalData} initstate ={this.props.onePlatform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/>
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields} stopupd={this.stopUpdate} editFetched={this.state.isUpdated}
                data={this.handlePlatformCrewData} initstate={this.state.platform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/>
              {/* <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Payloads, Weapons & Coms"]} fields={payloadsFields} stopupd={this.stopUpdate} editFetched={this.state.isUpdated}
                data={this.handlePlatformPayloadData} initstate ={this.props.onePlatform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/> */}
            
            </div>
          </div>
          {/* <div className="row personnel" >
            <div className="under-personnel-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields} stopupd={this.stopUpdate} editFetched={this.state.isUpdated}
                data={this.handlePlatformCrewData} initstate={this.state.platform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/>

               <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Configure Aircraft"]} fields={configureFields}
                data={this.handlePlatformConfigData} initstate={this.state.platform} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)}/> 
            </div>
          </div> */}
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
              {(this.props.editId != undefined && this.props.editId !='0') ? translations['update']: translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddPlatformModal.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  
};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePlatform: state.platforms.onePlatform,
  };
};

const mapDispatchToProps = {
  addPlatform,
  uploadFile,
  fetchPlatforms,
  fetchPlatformById,
  updatePlatform,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlatformModal);
