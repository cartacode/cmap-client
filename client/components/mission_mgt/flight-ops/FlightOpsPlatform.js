import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime, showAlert, getMinRowsForTable } from '../../../util/helpers';
import { flightOpsAtoPlatform, flightOpsPlatforms, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';
import Link from 'react-router-dom/Link';
import { NotificationManager } from 'react-notifications';
import ReactTooltip  from 'react-tooltip';

class FlightOpsPlatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.FOP,
      radioPlatformInvenotryId: '',      
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  // Move Left to Right
  // Updates PlatformInventoryId in mission
  moveRight = (row) => {
    const { translations } = this.props;
    const missionId = row.original.MissionId;
    const IntelReqID = row.original.IntelRequestID ;
    // const intelRequestID = row.original.IntelRequestID;
    if(this.state.radioPlatformInvenotryId !== undefined && this.state.radioPlatformInvenotryId !== 0 && this.state.radioPlatformInvenotryId !== '') {
      const data = {
        'Id': missionId,
        'IntelReqID': IntelReqID,
        'PlatformInventoryID': this.state.radioPlatformInvenotryId,
        'Type': 'Platform',
      };
      this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
        const { isBooked, error } = this.props;
        if(isBooked){
            NotificationManager.error(error,'Error', 5000);
        }else{
          this.loadData();
          this.timeLine.onFind();
        }
      });
    } else {
      showAlert('Please Select Platform');
    }
  }

  // Move Right to Left
  // Updates PlatformInventoryId to null in mission
  moveLeft = (row) => {
    const IntelReqID = row.original.IntelRequestID ;    
    const missionId = row.original.MissionId ;    
    const unitId  = row.original.UnitId ;
    if((IntelReqID !== undefined && IntelReqID !== 0) && (missionId !== undefined && missionId !== 0)) {
      const data = {
        'Id': missionId,
        IntelReqID,
        'PlatformInventoryID': null,
        'OwningUnit': unitId,
        'Type': 'Platform',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
          this.loadData();
          this.timeLine.onFind();
      });
    } else {
      showAlert('Please Select Platform');
    }
  
  }

  loadData = () => {
    // const unitId = 25;
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // Left Table: Status = AAG and Platfomr Id == null
    this.props.flightOpsAtoPlatform(unitId);
    // Right Table: Status = AAG and Platfomr Id != null
    this.props.flightOpsPlatforms(unitId);
  };

  radioFilterSelect=(value,platformInventoryID)=> {
    this.setState({
      radioPlatformInvenotryId: platformInventoryID,
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
        Cell: row =>  <div className = 'tooltip-custom'>
            <Link to={`${editurl}${row.original.IntelRequestID}`}  data-tip data-for={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
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
        Cell: row =>  <div className = 'tooltip-custom'>
          {/* <a href = "javascript:void('0');" title = {row.original.Status}><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a> */}
          <Link to={`${editurl}${row.original.IntelRequestID}`} data-tip data-for={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} data-multiline><span className="hand-cursor" >{row.value}</span></Link>
          <ReactTooltip id={row.original.IntelRequestID?row.original.IntelRequestID:'Not Found'} type="warning">
              <span>
                Mission: {row.original.MissionName ? row.original.MissionName : ''} <br/><br/>
                Platform: {row.original.PlatformName ? row.original.PlatformName + (row.original.TailNumber ? ' (' + row.original.TailNumber + ')' : '') : (row.original.SuggestedPlatformName ? row.original.SuggestedPlatformName : 'Not Found')}
                <br/><b>Flight Crew:</b> {row.original.CrewTeam ? row.original.CrewTeam : ''}
                <br/>PED Team: {row.original.PedTeam ? row.original.PedTeam : ''}
                <br/>Payloads: {row.original.PrimaryPayloadAbbreviation ? row.original.PrimaryPayloadAbbreviation : '' } / {row.original.SecondaryPayloadAbbreviation ? row.original.SecondaryPayloadAbbreviation : '' }
              </span>
          </ReactTooltip>
        </div>,
      },
      {
        Header: translations.tail,
        accessor: 'TailNumber',
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

    const { translations, fopPlatforms, fopPlatformAto } = this.props;
    const columnsATOGenerations = this.getLeftColumns();
    const columnsFlightOps = this.getRightColumns();
    let minRowsForTable = getMinRowsForTable(fopPlatforms.length,fopPlatformAto.length);
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
                    data={fopPlatformAto}
                    loading={this.props.isLoading}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    showPagination={true}
                    defaultFilterMethod={defaultFilter}
                    pageSizeOptions={[7, 10, 20, 25, 50, 100]}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS + ' (' + translations.platform + ')'} />
                <div >
                  <ReactTable
                    data={fopPlatforms}
                    loading={this.props.isLoading}
                    columns={columnsFlightOps}
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
        <div className="row mission-mgt">

        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} updateResource={this.props.updateResource} />
      </div>
      </div>
    );
  }
}

FlightOpsPlatform.propTypes = {
  children: PropTypes.element,
  updateResource: PropTypes.func,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    fopPlatformAto: state.mssionmgts.fopPlatformAto,
    fopPlatforms: state.mssionmgts.fopPlatforms,
    isLoading: state.mssionmgts.isFetching,
    isBooked: state.mssionmgts.isBooked,
    error: state.mssionmgts.error,
  };
};

const mapDispatchToProps = {
  flightOpsAtoPlatform,
  flightOpsPlatforms,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsPlatform);
