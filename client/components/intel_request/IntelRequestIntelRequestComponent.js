import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FullHeaderLine from '../reusable/FullHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';
import Dropdown from "../reusable/Dropdown";
import FormBlock from "../reusable/FormBlock";
import ModalFormBlock from "../reusable/ModalFormBlock";
import StatusTable from "../reusable/StatusTable";

import FilterDropdown from '../reusable/FilterDropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import TableRowDetailModal from '../reusable/TableRowDetailModal';


class IntelRequestIntelRequestComponent extends React.Component {

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
        PointofContact: '',
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
      intelReqEEI: {
        id: '',
        intelReqID: '',
        targetName: '',
        targetNum: '',
        threatGroupID: '',
        location: '',
        district: '',
        gridCoordinates: '',
        LIMIDS_Req: '',
        POI1_ID: '',
        POI2_ID: '',
        POI3_ID: '',
        EEIs: '',
        createDate: '',
        lastUpdateDate: '',
        objective: '',
        EEIThreat: '',
        LIMIDSReq: '',
        tableRowDetailModalOpen: false,
      },
      missionEEI: [{ eei: '0000-01', name: 'torani farmhouse', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-02', name: 'izz-al-din bed-down', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-18', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-03', name: 'mogzu road', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-22', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-04', name: 'zahani fields', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-13', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-05', name: 'madrasaye mosque', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', edit:'edit', del:'del' },
      { eei: '0000-06', name: 'gardez stadium', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-43', limids:'us/noforn', edit:'edit', del:'del' },]
    }

    // this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;

  }

  handleIntelRequest1 = (intelRequest1) => {
    const {intelRequest} = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        SupportedCommand: intelRequest1.SupportedCommand,
        NamedOperation: intelRequest1.NamedOperation,
        MissionType: intelRequest1.MissionType,
        ActiveDateTimeStart: intelRequest1.ActiveDateTimeStart
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  handleIntelRequest2 = (intelRequest2) => {
    const {intelRequest} = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityIntelRequirement: intelRequest2.PriorityIntelRequirement,
        PrimaryPayload: intelRequest2.PrimaryPayload,
        SecondaryPayload: intelRequest2.SecondaryPayload,
        Armed: intelRequest2.Armed

      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  handleIntelRequest3 = (intelRequest3) => {
    const {intelRequest} = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PointofContact: intelRequest3.PointofContact,
        DSN: intelRequest3.DSN,
        ReportClassification: intelRequest3.ReportClassification,
        EmailSIPR: intelRequest3.EmailSIPR
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  handleIntelEei1 = (intelEei1) => {
    const {intelReqEEI} = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        targetName: intelEei1.targetName,
        targetNum: intelEei1.targetNum,
        objective: intelEei1.objective,
        threatGroupID: intelEei1.threatGroupID
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelReqEEI);
    });
  }

  handleIntelEei2 = (intelEei2) => {
    const {intelReqEEI} = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        location: intelEei2.location,
        district: intelEei2.district,
        gridCoordinates: intelEei2.gridCoordinates,
        LIMIDS_Req: intelEei2.LIMIDS_Req
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelReqEEI);
    });
  }

  handleIntelEei3 = (intelEei3) => {
    const {intelReqEEI} = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        POI1_ID: intelEei3.POI1_ID,
        POI2_ID: intelEei3.POI2_ID,
        POI3_ID: intelEei3.POI3_ID,
        EEIs: intelEei3.Eei
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.intelReqEEI);
    });
  }

  handleIntelRequest = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.intelRequest);
    console.log()
    this.props.addIntelRequest(this.state.intelRequest);
    // this.resetForm();
  }

  handleIntelEEI = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.intelReqEEI);
    console.log()
    this.props.addIntelEei(this.state.intelReqEEI);
    // this.resetForm();
  }

  onClear(){
    console.log("clear");
  }

  onAdd(){
    console.log("add");
  }

  onSubmit(){
    console.log("submit");
  }

  tableRowDetailModal = () => {
		this.setState({
			tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
		})
  }

  deleteStuff = () => {

          console.log(this);
          var a = rowInfo.index;

          console.log(this.state.missionEEI);
          var array = [...this.state.missionEEI];
          array.splice(a, 1);

          console.log(array);

          this.setState({
            missionEEI: array
          });

  }

  render() {
    const langs = ['val 1', 'val 2'];

    const {translations} = this.props;

    const intelRequest1 = [
      {name: translations['Support Command'], type: 'dropdown', domID: 'dispCOCOM', ddID:'COCOM',valFieldID:'SupportedCommand'},
      {name: translations['Named Operation'], type: 'dropdown',domID: 'dispNamedOp',valFieldID:'NamedOperation'},
      {name: translations['Mission Type'], type: 'dropdown', ddID: 'MissionType', domID: 'dispMissionType', valFieldID: 'MissionType'},
      {name: translations['Active Date'], type: 'date', domID: 'ActiveDateTimeStart', valFieldID: 'ActiveDateTimeStart'},
    ];

    const intelRequest2 = [
      {name: translations['Priority Intel Req'], type: 'dropdown', domID: 'PriorityIntelRequirement', ddID: 'PriorityIntelRequirement', valFieldID:'PriorityIntelRequirement'},
      {name: translations['Primary Sensor'], type: 'dropdown',ddID: 'GetPayloads', domID:'dispPriSensor', valFieldID:'PrimaryPayload'},
      {name: translations['Secondary Sensor'], type: 'dropdown',ddID: 'GetPayloads', domID:'dispSecSensor', valFieldID:'SecondaryPayload'},
      {name: translations['Armed'], type: 'dropdown',ddID: 'GetMunitions', domID:'dispArmed', valFieldID:'Armed'},
    ];

    const intelRequest3 = [
      {name: translations['Point of Contact'], type: 'dropdown', domID: 'dispLocationPointofContact', ddID: 'Personnel',valFieldID:'PointofContact'},
      {name: translations['DSN'], type: 'input',domID:'DSN', valFieldID: 'DSN'},
      {name: translations['Report Classification'], type: 'dropdown',ddID:'Clearance',domID:'dispReportClass',valFieldID:'ReportClassification'},
      {name: translations['Email-SIPR'], type: 'input',domID:'EmailSIPR', valFieldID: 'EmailSIPR'},
    ];


    const eeiFiled1 = [
      {name: translations['Target Name'], type: 'input', domID: 'targetName',valFieldID: 'targetName'},
      {name: translations['Target#'], type: 'input', domID: 'targetNum', valFieldID: 'targetNum'},
      {name: translations['Objective'], type: 'dropdown', domID: 'dispObjective', ddID: 'objective', valFieldID: 'objective'},
      {name: translations['Threat Group'], type: 'dropdown',ddID:'EEIThreat',domID:'dispThreatGroups',valFieldID:'threatGroupID'},
    ];

    const eeiFiled2 = [
      {name: translations['Location'], type: 'input', domID: 'location', valFieldID: 'location'},
      {name: translations['District'], type: 'dropdown', domID: 'dispDistrict', ddID: 'Countries', valFieldID: 'district'},
      {name: translations['Grid Coordinates'], type: 'input', domID: 'gridCoordinates',  valFieldID: 'gridCoordinates'},
      {name: translations['LIMIDS Request'], type: 'dropdown',ddID:'LIMIDSReq',domID:'dispLIMIDS',valFieldID:'LIMIDS_Req'},
    ];

    const eeiFiled3 = [
      {name: translations['POIs'], type: 'input',domID:'POI1_ID', valFieldID: 'POI1_ID'},
      {name: translations['POIs'], type: 'input',domID:'POI2_ID', valFieldID: 'POI2_ID'},
      {name: translations['POIs'], type: 'input',domID:'POI3_ID', valFieldID: 'POI3_ID'},
      {name: translations['EEIs'], type: 'dropdown',domID:'dispEEIs', ddID: 'EEIs', valFieldID:'EEIs'},
    ];



    const missionColumns = [
      {
        Header: translations["eei#"],
        accessor: 'eei',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),

        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Name'],
        accessor: 'name',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['threat'],
        accessor: 'threat',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Location'],
        accessor: 'location',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['grid'],
        accessor: 'grid',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['POIs'],
        accessor: 'pois',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['LIMIDS Request'],
        accessor: 'limids',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['edit'],
        accessor: 'edit',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/pen_icon.png" /></span>// Custom cell components!
      },

      {
        Header: translations['del'],
        accessor: 'del',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/trash_icon.png" /></span>// Custom cell components!
      }
    ];

    const rowFields = [
			{name: translations['eei#'], type: 'input'},
			{name: translations['Name'], type: 'input'},
			{name: translations['threat'], type: 'input'},
			{name: translations['Location'], type: 'dropdown'},
			{name: translations['grid'], type: 'input'},
			{name: translations['POIs'], type: 'dropdown'},
			{name: translations['LIMIDS Request'], type: 'input'},
		];

    return (
      <div>
        <div className="row intel-request" >
          <div className="col-md-8 two-block" >
            <div className="img-header-line">
              <img src="/assets/img/status/theader_line.png" alt=""/>
              <div className="header-text">
                {translations["real-time intelligence/threat picture"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/status/theader_line.png" alt=""/>
            </div>
            <div className="two-block">
              <img className="photo" src="/assets/img/intel_request/request/request_pic.png"  alt="" />
            </div>
          </div>
          <div className="col-md-4 one-block">
            <ShortHeaderLine  headerText={translations["ccir/priorities intelligence requirements"]} />
            <div className="ccir-content">
              CCIR:
            </div>
            <ShortHeaderLine  headerText={translations["associate intelligence report"]} />
            <div className="associate-content">
            </div>
          </div>
        </div>
        <form action="" onSubmit={this.handleIntelRequest}>
          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations["intelligence request"]} />
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
              <FullHeaderLine headerText={translations["special instructions/notes"]} />
            </div>
            <div className="col-md-12">
              <textarea className="instruction" />
            </div>
          </div>

        </form>
        <form action="" onSubmit={this.handleIntelEEI}>
          <div className="row intel-request">
            <div className="col-md-12">
              <FullHeaderLine headerText={translations["eei generator"]} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled1} data={this.handleIntelEei1} initstate ={this.state.intelReqEEI} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled2} data={this.handleIntelEei2} initstate ={this.state.intelReqEEI} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled3} data={this.handleIntelEei3} initstate ={this.state.intelReqEEI} />
            </div>
          </div>
          <div className="row action-buttons" >
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                {translations["clear"]}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" type="submit">
                {translations["add"]}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </form>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["mission eei's"]} />
          </div>
          <div className="col-md-12">
            <ReactTable
              data={this.state.missionEEI}
              columns={missionColumns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: e =>{
                      console.log(column.Header);
                      if (column.Header == 'del')
                      {
                        var a = rowInfo.index;

                        console.log(this.state.missionEEI);
                        var array = [...this.state.missionEEI];
                        array.splice(a, 1);

                        console.log(array);

                        this.setState({
                          missionEEI: array
                        });
                      }

                      else if (column.Header == 'edit')
                      {
                        this.setState({
                          tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
                        });
                      }

                    }


                  };
                }}

            />
          </div>
        </div>

                  <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>

      </div>
    );
  }
}

IntelRequestIntelRequestComponent.propTypes = {
  children: PropTypes.element,

};

export default IntelRequestIntelRequestComponent;
