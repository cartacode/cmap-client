import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../dictionary/constants';
import { defaultFilter } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';


class PedTaskingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.ATO,
      teamId: '',
      // showUnitType: false,
    };
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
  moveToPedTaskFromATOGeneration = (row) => {
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
      "PedTeamID": 0,
    };
    if (value !== undefined && value !== '0') {
      this.props.moveToPedTaskFromATOGeneration(missionId, data).then(() => {
        this.loadData();
      });
  };
 }

  moveToATOGenerationFromPedTask = (row) => {
    this.props.moveToATOGenerationFromPedTask(row.original.MissionId).then(() => {
      this.loadData();
    });
  };

  radioFilterSelect=(generatedData)=>{
    this.setState({
      teamId: generatedData.resourceId === '2' ? generatedData.value : '',
    });
  }

  onFind() {
    console.log('find');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const unitId = 25;
   
    const statusId = 22; // 'AAG'
    //LEFT SIDE TABLE
    this.props.fetchPedTasksATOGenerations(statusId, unitId);
    //RIGHT SIDE TABLE
    this.props.fetchPedTasks( statusId, unitId);

  };



  render() {

    const { translations } = this.props;
    //For Left Table
    const { pedTasksAtoGenerations } = this.props;
    //For Right Side Table
    const { pedTasks } = this.props;

    const resource = [
      { 'id': '2', 'description': translations.teams },
    ];

    

    
    //For Left Table
    const pedTasksAtoGenerationsColumns = [
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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Ped Task" onClick={() => this.moveToPedTaskFromATOGeneration(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            {/*  <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];

    //For Right Table
    const pedTasksColumns = [
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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToATOGenerationFromPedTask(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];
    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations['ped tasking']} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} />
        <div className="row mission-mgt" >
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={pedTasksAtoGenerations}
                    columns={pedTasksAtoGenerationsColumns}
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
                <FullHeaderLine headerText={translations.PedTask} />
                <div >
                  <ReactTable
                    data={pedTasks}
                    columns={pedTasksColumns}
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

PedTaskingComponent.propTypes = {
  children: PropTypes.element,

};

export default PedTaskingComponent;
