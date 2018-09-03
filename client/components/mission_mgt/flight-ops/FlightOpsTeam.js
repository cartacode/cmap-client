import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime } from '../../../util/helpers';
import { flightOpsAtoCrew, flightOpsCrew, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';

class FlightOpsTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.FOP,
      radioTeamId: '',
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
  moveToFlightOpTeam = (row) => {
    
    const missionId = row.original.MissionId;    
    if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0) {
      const data = {
        'Id': missionId,
        'CrewTeamId': this.state.radioTeamId,
        'Type': 'Teams',
      };
      this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
        this.loadData();
      });
    } else {
      alert('Please Select Team');
    }
  }

  // Move Right to Left
  // Updates CrewTeamId to null in mission
  moveToAtoTeam = (row) => {
    this.props.moveToATOFromFlightOPS(row.original.MissionId).then(() => {
      this.loadData();
    });
  }

  loadData = () => {
    const unitId = 25;
    // Left Table: Status = AAG and Crew Team Id == null
    this.props.flightOpsAtoCrew(unitId);
    // Right Table: Status = AAG and Crew Team Id != null
    this.props.flightOpsCrew(unitId);
  };

  radioFilterSelect=(value)=> {
    this.setState({
      radioTeamId: value,
    });
  }

  render() {

    const { translations, fopCrews, fopCrewAto } = this.props;

    const columnsATOGenerations = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
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
        accessor: 'IsArmed',
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
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Flight Ops" onClick={() => this.moveToFlightOpTeam(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];

    const columnsFlightOps = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
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
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToAtoTeam(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];

    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} updateResource={this.props.updateResource}/>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={fopCrewAto}
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
                    data={fopCrews}
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

FlightOpsTeam.propTypes = {
  children: PropTypes.element,
  updateResource: PropTypes.func,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    fopCrewAto: state.mssionmgts.fopCrewAto,
    fopCrews: state.mssionmgts.fopCrews,
  };
};

const mapDispatchToProps = {
  flightOpsAtoCrew,
  flightOpsCrew,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsTeam);
