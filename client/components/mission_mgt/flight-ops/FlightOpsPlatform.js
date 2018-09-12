import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime } from '../../../util/helpers';
import { flightOpsAtoPlatform, flightOpsPlatforms, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';

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
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      alert('Please Select Platform');
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
        'IntelReqID': IntelReqID,
        'PlatformInventoryID': null,
        'OwningUnit': unitId,
        'Type': 'Platform',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      alert('Please Select Platform');
    }
  
  }

  loadData = () => {
    const unitId = 25;
    // Left Table: Status = AAG and Platfomr Id == null
    this.props.flightOpsAtoPlatform(unitId);
    // Right Table: Status = AAG and Platfomr Id != null
    this.props.flightOpsPlatforms(unitId);
  };

  radioFilterSelect=(value)=> {
    this.setState({
      radioPlatformInvenotryId: value,
    });
  }

  getLeftColumns = () => {
    const { translations } = this.props;
    return [
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
    const { translations } = this.props;
    return [
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
        Header: translations.tail,
        accessor: 'TailNumber',
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

    return (
      <div>
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} updateResource={this.props.updateResource} />
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={fopPlatformAto}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS + ' (' + translations.platform + ')'} />
                <div >
                  <ReactTable
                    data={fopPlatforms}
                    columns={columnsFlightOps}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
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
  };
};

const mapDispatchToProps = {
  flightOpsAtoPlatform,
  flightOpsPlatforms,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsPlatform);
