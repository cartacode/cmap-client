import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';

import ModalFormBlock from '../reusable/ModalFormBlock';

import 'react-table/react-table.css';
import IntelEEI from './IntelEEI';
import { fetchIntelRequestById } from 'actions/intel';

import ReactTable from 'react-table';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

class RequestForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      intelRequest: {
        AreaOfOperations: '',
        SupportedCommand: '',
        SupportedUnit: '',
        NamedOperation: '',
        MissionType: '',
        SubMissionType: '',
        ActiveDateTimeStart: '',
        ActiveDateTimeEnd: '',
        BestCollectionTime: '',
        LatestTimeIntelValue: '',
        PriorityIntelRequirement: '',
        SpecialInstructions: '',
        PrimaryPayload: '',
        SecondaryPayload: '',
        Armed: '',
        PointofContact: 'UserProfile',
        DSN: 'UserProfile',
        EmailSIPR: 'UserProfile',
        ReportClassification: '',
        LIMIDSRequest: '',
        IC_ISM_Classifications: '',
        IntelReqStatus: '',
        MissionType1: '',
        MissionType2: '',
        Payload: '',
        Payload1: '',
        Unit: '',
      },
    };

    // this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;

  }

  componentDidMount = () =>{

    // this.props.fetchIntelRequestById(intelId);
  }

  handleIntelRequest1 = (intelRequest1) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        SupportedCommand: intelRequest1.SupportedCommand,
        NamedOperation: intelRequest1.NamedOperation,
        MissionType: intelRequest1.MissionType,
        ActiveDateTimeStart: intelRequest1.ActiveDateTimeStart,
      },
    });
  }

  handleIntelRequest2 = (intelRequest2) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityIntelRequirement: intelRequest2.PriorityIntelRequirement,
        PrimaryPayload: intelRequest2.PrimaryPayload,
        SecondaryPayload: intelRequest2.SecondaryPayload,
        Armed: intelRequest2.Armed,

      },
    });
  }

  handleIntelRequest3 = (intelRequest3) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        BestCollectionTime: intelRequest3.BestCollectionTime,
        LatestTimeIntelValue: intelRequest3.LatestTimeIntelValue,
        ReportClassification: intelRequest3.ReportClassification,
        PointofContact: intelRequest3.PointofContact,
        DSN: intelRequest3.DSN,        
        EmailSIPR: intelRequest3.EmailSIPR,
      },
    });
  }

  handleIntelRequest4 = (intelRequest4) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PointofContact: intelRequest4.PointofContact,
        DSN: intelRequest4.DSN,        
        EmailSIPR: intelRequest4.EmailSIPR,
      },
    });
  }

  handleIntelRequest = event => {
    event.preventDefault();
    console.log(this.state.intelRequest);
    this.props.addIntelRequest(this.state.intelRequest);
    // this.resetForm();
  }

  deleteStuff = () => {

    console.log(this);
    let a = rowInfo.index;

    console.log(this.state.missionEEI);
    let array = [...this.state.missionEEI];
    array.splice(a, 1);

    console.log(array);

    this.setState({
      missionEEI: array,
    });

  }

  render() {
    const langs = ['val 1', 'val 2'];

    const armedOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No'}];

    const { translations } = this.props;

    const intelRequest1 = [
      { name: translations['Support Command'], type: 'dropdown', domID: 'dispCOCOM', ddID: 'COCOM', valFieldID: 'SupportedCommand' },
      { name: translations['Named Operation'], type: 'input', domID: 'dispNamedOp', valFieldID: 'NamedOperation' },
      { name: translations['Mission Type'], type: 'dropdown', ddID: 'MissionType', domID: 'dispMissionType', valFieldID: 'MissionType' },
      { name: translations['Active Date'], type: 'date', domID: 'ActiveDateTimeStart', valFieldID: 'ActiveDateTimeStart' },
      { name: translations['Priority Intel Req'], type: 'dropdown', domID: 'PriorityIntelRequirement', ddID: 'PriorityIntelRequirement', valFieldID: 'PriorityIntelRequirement' },
    ];

    const intelRequest2 = [

      { name: translations['Primary Sensor'], type: 'dropdown', ddID: '/PayloadType/GetPayloadTypes', domID: 'dispPriSensor', valFieldID: 'PrimaryPayload' },
      { name: translations['Secondary Sensor'], type: 'dropdown', ddID: '/PayloadType/GetPayloadTypes', domID: 'dispSecSensor', valFieldID: 'SecondaryPayload' },
      { name: translations.Armed, type: 'dropdown', ddID: '', domID: 'dispArmed', valFieldID: 'Armed', options: armedOptions },
      { name: translations['Best Collection Time'], type: 'input', domID: 'BestCollectionTime', valFieldID: 'BestCollectionTime' },
      { name: translations['Latest Time of Intel Value'], type: 'input', domID: 'LatestTimeIntelValue', valFieldID: 'LatestTimeIntelValue' },
    ];

    const intelRequest3 = [
      { name: translations['Report Classification'], type: 'dropdown', ddID: 'Clearance', domID: 'dispReportClass', valFieldID: 'ReportClassification' },
      // {name: translations['LIMIDS Request'], type: 'input', domID: 'LIMIDSRequest', valFieldID: 'LIMIDSRequest'},
      { name: translations['originator'], type: 'input', domID: 'dispLocationPointofContact', ddID: '', valFieldID: 'PointofContact' },
      { name: translations.DSN, type: 'input', domID: 'DSN', valFieldID: 'DSN' },
      { name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'EmailSIPR' },
    ];

    // Following fields is visible only to Collection manager and also only in case of edit
    const intelRequest4 = [
      { name: translations['originator'], type: 'dropdown', domID: 'dispLocationPointofContact', ddID: 'Personnel', valFieldID: 'PointofContact', readonly: true },
      { name: translations.DSN, type: 'input', domID: 'DSN', valFieldID: 'DSN', readonly: true },
      { name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'EmailSIPR', readonly: true },
    ];

    const priorityOptions = [];
    for(let i = 1; i <= 25; i++) {
      priorityOptions.push({ label: i, value: i });
    }

    const intelRequest5 = [
      
      { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', valFieldID: 'statusCode' },
      { name: translations['OrganicUnit'], type: 'dropdown', domID: 'organicUnt', ddID: 'Units/GetUnits', valFieldID: 'organicUnit' },
      { name: translations['NextHigherUnit'], type: 'dropdown', domID: 'nextHigherUnit', ddID: 'Units/GetUnits', valFieldID: 'routingUnit' }
    ];

    const intelRequest6 = [
      ,
      { name: translations.Priority, type: 'dropdown', domID: 'intelPriority', ddID: '', valFieldID: 'priority', options: priorityOptions },
      { name: translations['special instructions/notes'], type: 'textarea',  valFieldID: 'notes', domID: 'notes' },
    ]

    return (
      <div>
        <div className="row intel-request" >
          <div className="col-md-8 two-block" >
            <div className="img-header-line">
              <img src="/assets/img/status/theader_line.png" alt=""/>
              <div className="header-text">
                {translations['real-time intelligence/threat picture']}
              </div>
              <img className="mirrored-X-image" src="/assets/img/status/theader_line.png" alt=""/>
            </div>
            <div className="two-block">
              <img className="photo" src="/assets/img/intel_request/request/request_pic.png" alt="" />
            </div>
          </div>
          <div className="col-md-4 one-block">
            <ShortHeaderLine headerText={translations['ccir/priorities intelligence requirements']} />
            <div className="ccir-content">
              CCIR:
            </div>
            <ShortHeaderLine headerText={translations['associate intelligence report']} />
            <div className="associate-content" />
          </div>
        </div>
        <form action="" onSubmit={this.handleIntelRequest}>
          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations['intelligence request']} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest1} data={this.handleIntelRequest1} initstate ={this.state.intelRequest}/>
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest2} data={this.handleIntelRequest2} initstate ={this.state.intelRequest}/>
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest3} data={this.handleIntelRequest3} initstate ={this.state.intelRequest}/>
            </div>
          </div>

          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations.route} />
            </div>
            {/* <div className="col-md-4">
               <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest1} initstate ={this.state.intelRequest}/> }
            </div> */}
            <div className="col-md-6">
              <ModalFormBlock fields={intelRequest5} data={this.handleIntelRequest2} initstate ={this.state.intelRequest}/>
            </div>
            <div className="col-md-6">
            
             <ModalFormBlock fields={intelRequest6} data={this.handleIntelRequest2} initstate ={this.state.intelRequest}/>
            </div>

          </div>

          {/* <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations['special instructions/notes']} />
            </div>
            <div className="col-md-12">
               <input type="text" className="instruction" /> 
              <textarea className="instruction"/>
            </div>
          </div> */}

        </form>

        <IntelEEI intelId = {this.state.intelId} translations={this.props.translations}/>

      </div>
    );
  }
}

RequestForm.propTypes = {
  children: PropTypes.element,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
