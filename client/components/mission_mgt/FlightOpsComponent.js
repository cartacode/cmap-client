import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import { defaultFilter, getIntelRequestStatusCodeColor } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';
import { NotificationManager } from 'react-notifications';

class FlightOpsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: '0',
      tab: 'FLIGHT_OPS',
      platformInvenotryId: '',
      teamId: '',
      showUnitType: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  deleteApprovedIntelRequests = (value) => {
 
  };

  getColor= (row)=>{
    return getIntelRequestStatusCodeColor(row.original.Abbreviation);
  }


  /**
   * sample request Body:-
   *    /**
     * {
        "Id": 0,
        "IntelReqID": "string",
        "OwningUnit": 0,
        "PlatformInventoryID": "string",
        "CrewTeamID": 0,
        "PedTeamID": 0,
        "ATOIssueDate": "2018-08-31T08:23:15.380Z"
      }
     */

  moveToFlightOPSFromATOGeneration = (row) => {

    const value = row.value;
    const missionId = row.original.MissionId;
    const intelRequestID = row.original.IntelRequestID;
    const owningUnit = row.original.UnitId;
    const platformInventoryID = row.original.PlatformInventoryID;
    //@Note:- owningUnit or UnitId should be selected of Radio Button.
    const data = {
      "Id": missionId,
      'IntelReqID': intelRequestID,
      'OwningUnit': owningUnit,
    };
    if (value !== undefined && value !== '0') {
        this.props.moveToFlightOPSFromATOGeneration(missionId, data).then(() => {
          this.loadData();
        });
    }
  };
 
  moveToATOGenerationFromFlightOPS = (row) => {
    this.props.moveToATOGenerationFromFlightOPS(row.original.MissionId).then(() => {
      this.loadData();
    });

  };

  loadData = () => {
    let unitId = 25;
    let statusId = 10; // 'APR'
    this.props.flightOpsATOGenerations(statusId, unitId);

    statusId = 22; // 'AAG'
    this.props.fetchFlightOps(statusId, unitId);
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD === actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else if (NoticeTypee.MOVE_TO_COLLECTION === actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_INTEL_REQUEST === actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.DELETE === actionType) {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
    }
  };
  onFind() {
    console.log('find');
  }


  radioFilterSelect=(generatedData)=>{
    this.setState({
      platformInvenotryId: generatedData.resourceId === '1' ? generatedData.value : '',
      teamId: generatedData.resourceId === '2' ? generatedData.value : '',
    });
  }

  

  render() {

    const { translations } = this.props;
    const { opsAtoGenerations } = this.props;
    const { flightOps } = this.props;

    const resource = [
      { 'id': '1', 'description': translations.platform },
      { 'id': '2', 'description': translations.teams },
    ];

    const columnsATOGenerations = [
      {
        Header: 'Request#',
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: 'Command',
        accessor: 'COCOMText',
      },
      {
        Header: 'Mission Type',
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Flight Ops" onClick={() => this.moveToFlightOPSFromATOGeneration(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];

    const columnsFlightOps = [
      {
        Header: 'Request#',
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: 'Command',
        accessor: 'COCOMText',
      },
      {
        Header: 'Mission Type',
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToATOGenerationFromFlightOPS(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];

    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} resource={resource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} showUnitType={this.state.showUnitType}/>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={opsAtoGenerations}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS} />
                <div >
                  <ReactTable
                    data={flightOps}
                    columns={columnsFlightOps}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

FlightOpsComponent.propTypes = {
  children: PropTypes.element,

};

export default FlightOpsComponent;
