import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, formatDateTime, getIntelStatusColor, showAlert, getMinRowsForTable } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';
import Link from 'react-router-dom/Link';
import ReactTooltip from 'react-tooltip';

import { missionPEDUser } from '../../dictionary/auth';
import { NotificationManager } from 'react-notifications';

class PedTaskingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.PED,
      radioTeamId: '',
      selectedTeams: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  //  Move Intel from ATO table to PED table . i.e Left -> Right.
 moveRight = (row) => {
   const IntelReqID = row.original.IntelRequestID;
   const missionId = row.original.MissionId;
   //  if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0 && this.state.radioTeamId !== '') {
   //    const data = {
   //      'Id': missionId,
   //      IntelReqID,
   //      'PedTeamID': this.state.radioTeamId,
   //      'Type': 'Ped',
   //    };
   //    this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
   //      this.loadData();
   //      this.timeLine.onFind();
   //    });
   //  }
   if(this.state.selectedTeams.length > 0) {
     const data = {
       'Id': missionId,
       IntelReqID,
       'TeamIDs': this.state.selectedTeams,
       'Type': 'Ped',
     };
     this.props.assignTeams(data).then(() => {
       const { isBooked, error } = this.props;
       if(isBooked) {
         NotificationManager.error(error, 'Error', 5000);
       }else{
         this.loadData();
         this.timeLine.onFind();
       }
     });
   } else {
     showAlert('Please Select Ped Team.');
   }
 }

  //  Move Intel from PED tabe to ATO table. i.e Right -> Left.
  moveLeft = (row) => {
    const { translations } = this.props;
    const IntelReqID = row.original.IntelRequestID;
    const missionId = row.original.MissionId;
    if(missionId !== undefined && missionId !== 0 && missionId !== '') {
      const data = {
        Id: missionId,
        IntelReqID,
        PedTeamID: null,
        Type: 'Ped',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
        const { isBooked, error } = this.props;
        if(isBooked) {
          NotificationManager.error(error, 'Error', 5000);
        }else{
          this.loadData();
          this.timeLine.onFind();
        }
      });
    }
  };

  radioFilterSelect=(value, platformInventoryID)=> {
    this.setState({
      radioTeamId: value,
    });
  }

  onTeamSelect = (teams) => {
    this.setState({
      selectedTeams: teams,
    });
  }

  loadData = () => {
    // const unitId = 25;
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // const statusId = IntelConstants.STATUS.AAG.id; // 'AAG'

    // LEFT SIDE TABLE = Where PedTeamId = null and Status Is = AAG
    this.props.fetchPedTasksATO(unitId);

    // RIGHT SIDE TABLE = Where PedTeamId != null and Status Is = AAG
    this.props.fetchPedTasks(unitId);
  };

  getLeftColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 70,
        Cell: row => <div className = "tooltip-custom">
          <Link to={`${editurl}${row.original.IntelRequestID}`} data-tip data-for={row.original.IntelRequestID ? row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
          <ReactTooltip id={row.original.IntelRequestID ? row.original.IntelRequestID:'Not Found'} type="warning">
            <span>
                Mission: {row.original.MissionName ? row.original.MissionName : ''} <br/><br/>
                Platform: {row.original.PlatformName ? row.original.PlatformName + (row.original.TailNumber ? ' (' + row.original.TailNumber + ')' : '') : (row.original.SuggestedPlatformName ? row.original.SuggestedPlatformName : 'Not Found')}
              <br/>Flight Crew: {row.original.CrewTeam ? row.original.CrewTeam : ''}
              <br/>PED Team: {row.original.PedTeam ? row.original.PedTeam : ''}
              <br/>Payloads: {row.original.PrimaryPayloadAbbreviation ? row.original.PrimaryPayloadAbbreviation : '' } / {row.original.SecondaryPayloadAbbreviation ? row.original.SecondaryPayloadAbbreviation : '' }
            </span>
          </ReactTooltip>
        </div>,
      },
      {
        Header: translations.missionUnit,
        accessor: 'MissionUnit',
        minWidth: 150,
      },
      {
        Header: translations.Location,
        accessor: 'MissionUnitLocation',
        maxWidth: 80,
      },
      {
        Header: translations.platform,
        id: 'PlatformName',
        accessor: r => {
          return (r.PlatformName ? r.PlatformName : r.SuggestedPlatformName);
        },
        maxWidth: 150,
      },
      {
        Header: translations.payload,
        accessor: 'PrimaryPayloadAbbreviation',
        maxWidth: 85,
      },
      {
        Header: translations.payload,
        accessor: 'SecondaryPayloadAbbreviation',
        maxWidth: 85,
      },
      {
        Header: translations.Armed,
        id: 'Armed',
        maxWidth: 60,
        accessor: r => {
          return ((r.PlatformName) ? ((r.AssgnPlatformArm1 === null && r.AssgnPlatformArm2 === null && r.AssgnPlatformArm3 === null) ? 'No' : 'Yes')
            : ((r.SuggstdPlatformArm1 === null && r.SuggstdPlatformArm2 === null && r.SuggstdPlatformArm3 === null) ? 'No' : 'Yes'));
        },
      },
      {
        Header: translations.Assign,
        accessor: 'missionId',
        filterable: false,
        maxWidth: 70,
        Cell: row => (
          <div>
            <a href="Javascript:void('0');" className="btn btn-primary" title="Move To Ped Task" onClick={() => this.moveRight(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            {/*  <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];
  }

  getRightColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 70,
        Cell: row => <div className = "tooltip-custom">
          {/* <a href = "javascript:void('0');" title = {row.original.Status}><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a> */}
          <Link to={`${editurl}${row.original.IntelRequestID}`} data-tip data-for={row.original.IntelRequestID ? row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
          <ReactTooltip id={row.original.IntelRequestID ? row.original.IntelRequestID:'Not Found'} type="warning">
            <span>
                Mission: {row.original.MissionName ? row.original.MissionName : ''} <br/><br/>
                Platform: {row.original.PlatformName ? row.original.PlatformName + (row.original.TailNumber ? ' (' + row.original.TailNumber + ')' : '') : (row.original.SuggestedPlatformName ? row.original.SuggestedPlatformName : 'Not Found')}
              <br/>Flight Crew: {row.original.CrewTeam ? row.original.CrewTeam : ''}
              <br/>PED Team: {row.original.PedTeam ? row.original.PedTeam : ''}
              <br/>Payloads: {row.original.PrimaryPayloadAbbreviation ? row.original.PrimaryPayloadAbbreviation : '' } / {row.original.SecondaryPayloadAbbreviation ? row.original.SecondaryPayloadAbbreviation : '' }
            </span>
          </ReactTooltip>
        </div>,
      },
      {
        Header: translations.PedTeam,
        accessor: 'PedTeam',
        minWidth: 150,
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
        maxWidth: 80,

      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
        maxWidth: 150,
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.status,
        accessor: 'Status',
        minWidth: 150,
      },

      {
        Header: translations.Unassign,
        accessor: 'missionId',
        filterable: false,
        maxWidth: 80,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveLeft(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];
  }

  render() {
    const { pedTasksAtoGenerations, pedTasks, translations } = this.props;
    // For Left Table
    const pedTasksAtoGenerationsColumns = this.getLeftColumns();
    // For Right Table
    const pedTasksColumns = this.getRightColumns();

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = ses.UserRoles;
    const roles2 = JSON.parse(roles);
    const access = roles2.some(v => missionPEDUser.includes(v));
    const minRowsForTable = getMinRowsForTable(pedTasksAtoGenerations.length, pedTasks.length);



    return (access ? (
      <div>

        <div className="row mission-mgt" >
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={pedTasksAtoGenerations}
                    loading={this.props.isLoading}
                    columns={pedTasksAtoGenerationsColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    defaultFilterMethod={defaultFilter}
                    pageSizeOptions={[7, 10, 20, 25, 50, 100]}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.PedTaskHeader} />
                <div >
                  <ReactTable
                    data={pedTasks}
                    loading={this.props.isLoading}
                    columns={pedTasksColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    defaultFilterMethod={defaultFilter}
                    pageSizeOptions={[7, 10, 20, 25, 50, 100]}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations['ped tasking']} defaultResource={this.state.defaultResource} tab={this.state.tab} checkBoxSelect={this.onTeamSelect} />
      </div>) : null
    );
  }
}

PedTaskingComponent.propTypes = {
  children: PropTypes.element,

};

export default PedTaskingComponent;
