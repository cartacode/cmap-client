import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime, showAlert, getMinRowsForTable } from '../../../util/helpers';
import { assignTeams, flightOpsAtoCrew, flightOpsCrew, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';
import Link from 'react-router-dom/Link';
import { NotificationManager } from 'react-notifications';
import ReactTooltip  from 'react-tooltip';

class FlightOpsTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.FOP,
      selectedTeams: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  // Move Left to Right
  // Updates CrewId in mission
  moveRight = (row) => {
    const { translations } = this.props;
    const IntelReqID = row.original.IntelRequestID;
    const missionId = row.original.MissionId;
    // if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0 && this.state.radioTeamId !== '') {
    //   const data = {
    //     'Id': missionId,
    //     IntelReqID,
    //     'CrewTeamId': this.state.radioTeamId,
    //     'Type': 'Crew',
    //   };
    //   this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
    //     const { isBooked, error } = this.props;
    //     if(isBooked) {
    //       NotificationManager.error(error, 'Error', 5000);
    //     }else{
    //       this.loadData();
    //       this.timeLine.onFind();
    //     }
    //   });
    // }
    if(this.state.selectedTeams.length > 0) {
      const data = {
        'Id': missionId,
        IntelReqID,
        'TeamIDs': this.state.selectedTeams,
        'Type': 'Crew',
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
      showAlert('Please Select Atleast One Team');
    }
  }

  // Move Right to Left
  // Updates CrewTeamId to null in mission
  moveLeft = (row) => {
    const IntelReqID = row.original.IntelRequestID ;    
    const missionId = row.original.MissionId ;    
    if((IntelReqID !== undefined && IntelReqID !== 0) && (missionId !== undefined && missionId !== 0)) {
      const data = {
        'Id': missionId,
        IntelReqID,
        'CrewTeamID': null,
        'Type': 'Crew',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      showAlert('Please Select Team');
    }
  }

  loadData = () => {
    // const unitId = 25;
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // Left Table: Status = AAG and Crew Team Id == null
    this.props.flightOpsAtoCrew(unitId);
    // Right Table: Status = AAG and Crew Team Id != null
    this.props.flightOpsCrew(unitId);
  };

  // radioFilterSelect=(value,platformInventoryID)=> {
  //   this.setState({
  //     radioTeamId: value,
  //   });
  // }

  onTeamSelect = (teams) => {
    this.setState({
      selectedTeams: teams,
    });
  }

  getLeftColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 70,
        Cell: row => <div>
          <Link to={`${editurl}${row.original.IntelRequestID}`} data-tip data-for={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
          <ReactTooltip id={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} type='warning'>
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
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations['Armed'],
        accessor: 'Armed',
        maxWidth: 80,
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations['status'],
        accessor: 'Status',
        minWidth: 150,
      },
      {
        Header: translations.Assign,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 70,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Flight Ops" onClick={() => this.moveRight(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
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
        Cell: row => <div>
          {/* <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp; */}
          <Link to={`${editurl}${row.original.IntelRequestID}`} data-tip data-for={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
          <ReactTooltip id={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} type='warning'>
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
        Header: translations['CrewTeam'],
        accessor: 'CrewTeam',
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
        Header: translations['status'],
        accessor: 'Status',
        minWidth: 150,
      },
      {
        Header: translations.Unassign,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 80,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveLeft(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];
  }

  render() {
    const { translations, fopCrews, fopCrewAto } = this.props;
    const columnsATOGenerations = this.getLeftColumns();
    const columnsFlightOps = this.getRightColumns();
    let minRowsForTable = getMinRowsForTable(fopCrews.length,fopCrewAto.length);
    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);

    return (
      <div>
       
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={fopCrewAto}
                    loading={this.props.isLoading}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS + ' (' + translations.team + ')'} />
                <div >
                  <ReactTable
                    data={fopCrews}
                    loading={this.props.isLoading}
                    columns={columnsFlightOps}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                   defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div >
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} checkBoxSelect={this.onTeamSelect} updateResource={this.props.updateResource}/>
       </div>
      </div>
    );
  }
}

FlightOpsTeam.propTypes = {
  children: PropTypes.element,
  updateResource: PropTypes.func,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    fopCrewAto: state.mssionmgts.fopCrewAto,
    fopCrews: state.mssionmgts.fopCrews,
    isLoading: state.mssionmgts.isFetching,
    isBooked: state.mssionmgts.isBooked,
    error: state.mssionmgts.error,
  };
};

const mapDispatchToProps = {
  assignTeams,
  flightOpsAtoCrew,
  flightOpsCrew,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,
};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsTeam);
