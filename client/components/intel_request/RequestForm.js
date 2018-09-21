import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import FullHeaderLine from 'components/reusable/FullHeaderLine';
import ShortHeaderLine from 'components/reusable/ShortHeaderLine';

import Map from 'components/reusable/Map';
import ModalFormBlock from 'components/reusable/ModalFormBlock';
import { viewerIdentifiers } from 'map/viewer';

import 'react-table/react-table.css';
import { NotificationManager } from 'react-notifications';
import  { NoticeType } from 'dictionary/constants';
import IntelEEI from './IntelEEI';
import { fetchIntelRequestById, addIntelRequest, updateIntelRequest } from 'actions/intel';
import { Redirect } from 'react-router-dom';
import Loader from '../reusable/Loader'

import { baseUrl } from 'dictionary/network';
import {fetchCcirPirs} from 'actions/ccirpir';

import {fetchLocations} from 'actions/location';

import uuid from 'uuid/v4';

class RequestForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      CCIRPIR:[],
      updatedLocation:'',
      toSummary: false,
      editFetched: false,
      clear: false,

      intelRequest: {
        IntelRequestID: '',
        MissionId: null,
        // AreaOfOperations: '',
        // SupportedCommand: '',
        // SupportedUnit: '',
        // NamedOperation: '',
        // MissionType: '',
        // SubMissionType: '',
        ActiveDateTimeStart: new Date(),
        // ActiveDateTimeEnd: '',
        BestCollectionTime: new Date(),
        LatestTimeIntelValue: new Date(),
        // PriorityIntelRequirement: '',
        // SpecialInstructions: '',
        // PrimaryPayload: '',
        // SecondaryPayload: '',
        //Armed: '',
        PointofContact: 'UserProfile',
        DSN: 'UserProfile',
        EmailSIPR: 'UserProfile',
        // ReportClassification: '',
        // LIMIDSRequest: '',
        // IC_ISM_Classifications: '',
        // IntelReqStatus: '',
        // MissionType1: '',
        // MissionType2: '',
        // Payload: '',
        // Payload1: '',
        // Unit: '',
      },
      loading:false,
      ccirPirOptions: [],
      pirs: {},
    };

    // this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.setCCIRPIR = this.setCCIRPIR.bind(this);

    this.setOneLocation = this.setOneLocation.bind(this);

  }

  componentDidMount = () =>{

    const { match: { params } } = this.props;
    const editId = params.editId;

    this.props.fetchLocations(2).then(()=>{
      const {allLocations}=this.props;
      localStorage.setItem('NAI', JSON.stringify(allLocations));

    });
    this.props.fetchLocations(3).then(()=>{
      const {allLocations}=this.props;
      localStorage.setItem('POI', JSON.stringify(allLocations));

    });

    this.props.fetchCcirPirs().then(() =>{
      const { allCcirPirs } = this.props;
      localStorage.setItem('KMLdata', JSON.stringify(allCcirPirs));
      const ccirPirOptions = [{'label': '--Select Item--', 'value': ''}];
      const pirs = {};
      allCcirPirs.map(item => {
        let val = item.CCIRPIRId;
        if(typeof val === 'string') {
          val = val.trim();
        }
        ccirPirOptions.push({ 'label': item.MissionName, 'value': val });
        const pirOptions = [
          { 'value': 'Description5', 'label': item.Description5 },
          { 'value': 'Description6', 'label': item.Description6 },
          { 'value': 'Description7', 'label': item.Description7 },
          { 'value': 'Description8', 'label': item.Description8 },
        ];
        pirs[item.CCIRPIRId] = pirOptions;

      });

      this.setState({
        ccirPirOptions,
        pirs,
      }, () => {
        this.updateCCIROptions(ccirPirOptions, '');
        
      });
    });
    
    if(editId !== undefined && editId !== '') {
      this.props.fetchIntelRequestById(editId).then(()=> {
        const { oneIntelRequest} = this.props
        this.setState(
          {
            intelRequest: oneIntelRequest,
            editFetched: true,
          });

        this.updatePirOptions(this.state.pirs[oneIntelRequest.NamedOperation], oneIntelRequest.PriorityIntelRequirement);
      });

    }
  
  }

  //  getKMLdata = () =>{
  //   const apiUrl = `${baseUrl}/CCIRPIR/GetCCIRPIRData`;
  //   axios.get(apiUrl).
  //  }
  // componentDidUpdate = (prevProps) => {
  //   const { oneIntelRequest } = this.props;
  //   const { intelRequest } = this.state;
  //   if(intelRequest.IntelRequestID !== oneIntelRequest.IntelRequestID) {
  //     this.setState(
  //       {
  //         intelRequest: oneIntelRequest,
  //       });
  //   }
  // }

  handleIntelRequest1 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        SupportedCommand: ir.SupportedCommand,
        NamedOperation: ir.NamedOperation,
        MissionType: ir.MissionType,
        ActiveDateTimeStart: ir.ActiveDateTimeStart,
        PriorityIntelRequirement: ir.PriorityIntelRequirement,
      },
    });
    this.updatePirOptions(this.state.pirs[ir.NamedOperation], 'Description5');
  }

  handleIntelRequest2 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PrimaryPayload: ir.PrimaryPayload,
        SecondaryPayload: ir.SecondaryPayload,
        Armed: (ir.Armed == undefined || ir.Armed == "" || ir.Armed == null )? true: ir.Armed,
        BestCollectionTime: ir.BestCollectionTime,
        LatestTimeIntelValue: ir.LatestTimeIntelValue,
      },
    });
  }

  handleIntelRequest3 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        ReportClassification: ir.ReportClassification,
        AssetId: ir.AssetId,
        // PointofContact: intelRequest3.PointofContact,
        // DSN: intelRequest3.DSN,
        // EmailSIPR: intelRequest3.EmailSIPR,
      },
    });
  }

  handleIntelRequest4 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        // OrganicUnit: ir.OrganicUnit,
        StatusId: ir.StatusId,
        NextHigherUnitId: ir.NextHigherUnitId,
      },
    });
  }

  handleIntelRequest5 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityId: ir.PriorityId,
        SpecialInstructions: ir.SpecialInstructions,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let { intelRequest } = this.state;
    intelRequest.Armed = (intelRequest.Armed == undefined || intelRequest.Armed == null || intelRequest.Armed == '') ? 'true' : intelRequest.Armed;
    const { match: { params } } = this.props;
    const editId = params.editId;
    const session = JSON.parse(localStorage.getItem('session'));
    console.log('session '+session);
  console.log('session personnel id'+session.PersonnelID);
    intelRequest.OrginatorPersonnelID = session.PersonnelID; // id of user from session
    // intelRequest.OrginatorPersonnelID = '16e5eb94-41c1-4385-84da-e52bd843d17d'; // id of user from session

    console.log(" Intel Update ==> " +JSON.stringify(intelRequest));
    if(editId !== undefined && editId !== '0') {
      this.setState({loading: true});
      intelRequest.IntelRequestID = editId;
      this.props.updateIntelRequest(editId, intelRequest).then(() => {
        this.setState({loading: false});
        this.notify(NoticeType.UPDATE);
        this.setState({
          toSummary: true,
        });
      });
    } else {
      this.setState({loading: true});

      this.props.addIntelRequest(intelRequest).then(() => {
        this.setState({loading: false});
        this.notify(NoticeType.ADD);
        this.setState({
          toSummary: true,
        });
      });
    }

  }

notify = (type) => {
  const { translations  } = this.props;

  if(type === NoticeType.ADD) {
    NotificationManager.success(translations['AddedSuccesfully'], translations['intel request'], 5000);
  } else if(type === NoticeType.UPDATE) {
    NotificationManager.success(translations['UpdatedSuccesfully'], translations['intel request'], 5000);
  } else if(type === NoticeType.DELETE) {
    NotificationManager.success(translations['DeletedSuccesfully'], translations['intel request'], 5000);
  }
}

stopUpdate = () => {
  this.setState({editFetched:false});
}

stopset = () => {
  this.setState({ clear: false });
}
setCCIRPIR = (ccirpirObj) =>{
  const { intelRequest } = this.state;
  this.setState({
    intelRequest: {
      ...intelRequest,
      NamedOperation: ccirpirObj.CCIRPIRId,
    },

    editFetched: true,
    CCIRPIR: ccirpirObj.CCIRPIR,
  });
}
setOneLocation = (location, currentLatLong) =>{
  const updatedLocation = {
    location,
    uid: uuid(),
    currentLatLong,
  }
  this.setState({
    updatedLocation
  })
}

resetForm() {
  // this.setState(this.baseState);
  console.log("FORM RESET DONE");
  if (confirm("Do you want to clear all data from this form?")) {
    this.setState({clear:true});
    document.getElementById('personnelform').reset();
  }
}

updateCCIROptions = (items, ccirid) => {

  if(items !== null && items !== undefined) {
    const nameOperationSelect = document.getElementsByName('NamedOperation')[0];
    nameOperationSelect.length = 0;

    items.forEach((element) => {
      let selected = false;
      if(ccirid && element.value === ccirid) {
        selected = true;
      }
      nameOperationSelect.add(new Option(element.label, element.value, selected, selected));
    });

  }
}

updatePirOptions = (items, pirdesc) => {
  if(items !== null && items !== undefined) {
    const pirSelect = document.getElementsByName('PriorityIntelRequirement')[0];
    pirSelect.length = 0;
    items.forEach((element) => {
      let selected = false;
      if(pirdesc && element.value === pirdesc) {
        selected = true;
      }
      pirSelect.add(new Option(element.label, element.value, selected, selected));
    });

  }
}
renderCCIRPIR = () =>{
  if(this.state.CCIRPIR) {
  const ccirpir = (
    <ul>
      {this.state.CCIRPIR.map((item, i) =>
        <li key={i.toString()}>
            {item}
        </li>
      )}
    </ul>);
    return ccirpir;
  }
}

render() {
  

  const armedOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No'}];

  const { translations } = this.props;


  const { match: { params } } = this.props;
  const editId = params.editId;

  let { intelRequest } = this.state;

  

  const intelRequest1 = [
    { name: translations['Support Command'], type: 'dropdown', domID: 'dispCOCOM', ddID: 'COCOM', valFieldID: 'SupportedCommand', required: true },
    { name: translations['Named Operation'], type: 'dropdown', domID: 'dispNamedOp', valFieldID: 'NamedOperation', required: true, options: [{ label: '--Loading--', value: '' }] },
    { name: translations['Mission Type'], type: 'dropdown', ddID: 'MissionType', domID: 'dispMissionType', valFieldID: 'MissionType', required: true },
    { name: translations['Active Date'], type: 'date', domID: 'ActiveDateTimeStart', valFieldID: 'ActiveDateTimeStart', required: true },
    { name: translations['Priority Intel Req'], type: 'dropdown', domID: 'PriorityIntelRequirement', valFieldID: 'PriorityIntelRequirement', required: true, options: [{ label: '--Select Named Operation First--', value: '' }] },
  ];

  const intelRequest2 = [

    { name: translations['Primary Sensor'], type: 'dropdown', ddID: 'PayloadType/GetPayloadTypes', domID: 'dispPriSensor', valFieldID: 'PrimaryPayload', required: true },
    { name: translations['Secondary Sensor'], type: 'dropdown', ddID: 'PayloadType/GetPayloadTypes', domID: 'dispSecSensor', valFieldID: 'SecondaryPayload', required: true },
    { name: translations.Armed, type: 'dropdown', ddID: '', domID: 'dispArmed', valFieldID: 'Armed', options: armedOptions },
    { name: translations['Best Collection Time'], type: 'date', domID: 'BestCollectionTime', valFieldID: 'BestCollectionTime', required: true },
    { name: translations['Latest Time of Intel Value'], type: 'date', domID: 'LatestTimeIntelValue', valFieldID: 'LatestTimeIntelValue', required: true },
  ];


  // Following fields is visible only to Collection manager and also only in case of edit
  const intelRequest3 = [
    { name: translations['Asset'], type: 'dropdown', domID: 'AssetId', ddID: 'AssetTypes/GetAssetTypes', valFieldID: 'AssetId', required: true, required: true },
    { name: translations['Report Classification'], type: 'dropdown', ddID: 'Clearance/GetIC_ISM_Classifications', domID: 'dispReportClass', valFieldID: 'ReportClassification', required: true },
    // {name: translations['LIMIDS Request'], type: 'input', domID: 'LIMIDSRequest', valFieldID: 'LIMIDSRequest'},
    { name: translations['originator'], type: 'input', domID: 'dispLocationPointofContact', ddID: '', valFieldID: 'OriginatorFirstName', readOnly: true },
    { name: translations.DSN, type: 'input', domID: 'DSN', valFieldID: 'OriginatorDSN', readOnly: true },
    { name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'OriginatorEmail', readOnly: true },
  ];


  let intelRequest4 = [

    { name: translations['DispositionStaus'], type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: intelRequest.MissionId , valFieldID: 'StatusId' , required:true},
    { name: translations['OrganicUnit'], type: 'dropdown', domID: 'organicUnt', ddID: 'Units/GetUnits', valFieldID: 'UnitId', disabled: true  },
    { name: translations['NextHigherUnit'], type: 'dropdown', domID: 'nextHigherUnit', ddID: 'Units/GetUnits', valFieldID: 'NextHigherUnitId' }
  ];

  const intelRequest5 = [
    { name: translations['Priority'], type: 'dropdown', domID: 'intelPriority', ddID: 'Priority', valFieldID: 'PriorityId', required:true  /* options: priorityOptions */ },
    { name: translations['special instructions/notes'], type: 'textarea',  valFieldID: 'SpecialInstructions', domID: 'SpecialInstructions' },
  ]

  const { editFetched } = this.state;

  return (
    <div>

      <div className="row intel-request" >
        <div className="col-md-8 two-block" >
          <Loader loading={this.state.loading} />
          <div className="img-header-line">
            <img src="/assets/img/status/theader_line.png" alt=""/>
            <div className="header-text">
              {translations['real-time intelligence/threat picture']}
            </div>
            <img className="mirrored-X-image" src="/assets/img/status/theader_line.png" alt=""/>
          </div>
          <div className="two-block">
            <Map viewerId={viewerIdentifiers.intelRequest} setCCIRPIR={this.setCCIRPIR} setOneLocation={this.setOneLocation} toolBarOptions={{kmlLookUp: true, naipoiLookUp: true}} />
          </div>
        </div>
        <div className="col-md-4 one-block">
          <ShortHeaderLine headerText={translations['ccir/priorities intelligence requirements']} />
          <div className="ccir-content">
            <div className="fw-800">CCIR:</div>
              {this.renderCCIRPIR()}
          </div>
          <ShortHeaderLine headerText={translations['associate intelligence report']} />
          <div className="associate-content" />
        </div>
      </div>
      <form action="" onSubmit={this.handleSubmit} id='personnelform'>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['intelligence request']} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest1} data={this.handleIntelRequest1} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest2} data={this.handleIntelRequest2} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest3} data={this.handleIntelRequest3} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
        </div>

        {editId != undefined && editId !== '0' ?
          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations.route} />
            </div>
            {/* <div className="col-md-4">
                <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest1} initstate ={this.state.intelRequest} stopupd={this.stopUpdate} /> }
              </div> */}
            <div className="col-md-6">
              <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest4} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
            </div>
            <div className="col-md-6">
              <ModalFormBlock fields={intelRequest5} data={this.handleIntelRequest5} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear}  />
            </div>

          </div>
          : null
        }
        {/* <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations['special instructions/notes']} />
            </div>
            <div className="col-md-12">
               <input type="text" className="instruction" />
              <textarea className="instruction"/>
            </div>
          </div> */}

        {this.state.intelRequest.MissionId === null ?
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className='btn btn-warning'  onClick={this.resetForm.bind(this)}>
                {translations['clear']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="submit" className='btn btn-warning'>
                {translations['submit']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
          : '' }
      </form>

      { (this.state.intelRequest.IntelRequestID !== '') ?
        <IntelEEI nearestNAIPOI={this.state.updatedLocation} missionId={this.props.oneIntelRequest.MissionId} intelId = {this.props.oneIntelRequest.IntelRequestID} eeis={this.props.oneIntelRequest.IntelReqEEIs} />
        : null }
      {this.state.toSummary ? <Redirect to="/intel-request/request" /> : null }

    </div>
  );
}
}

RequestForm.propTypes = {
  editId: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneIntelRequest: state.intelrequest.oneIntelRequest,
    allCcirPirs: state.ccirpir.allCcirPirs,
    allLocations: state.locations.allLocations,
  };
};

const mapDispatchToProps = {
  addIntelRequest,
  fetchIntelRequestById,
  updateIntelRequest,
  fetchCcirPirs,
  fetchLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
