import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, formatDateTime } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';


class PedTaskingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.PED,
      radioTeamId: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  //  Move Intel from ATO table to PED table . i.e Left -> Right.
 moveRight = (row) => {
   const IntelReqID = row.original.IntelRequestID ;
   const missionId = row.original.MissionId;    
   if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0 && this.state.radioTeamId !== '') {
     const data = {
       'Id': missionId,
       IntelReqID,
       'PedTeamID': this.state.radioTeamId,
       'Type': 'Ped',
     };
     this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
       this.loadData();
       this.timeLine.onFind();
     });
   } else {
     alert('Please Select Ped Team.');
   }
 }
  
  //  Move Intel from PED tabe to ATO table. i.e Right -> Left.
  moveLeft = (row) => {
    const IntelReqID = row.original.IntelRequestID ;    
    const missionId = row.original.MissionId ;    
    if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0 && this.state.radioTeamId !== '') {
      const data = {
        Id: missionId,
        IntelReqID,
        PedTeamID: null,
        Type: 'Ped',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      alert('Please Select Ped Team.');
    }
  };

  radioFilterSelect=(value)=> {
    this.setState({
      radioTeamId: value,
    });
  }

  loadData = () => {
    const unitId = 25;
    // const statusId = IntelConstants.STATUS.AAG.id; // 'AAG'

    // LEFT SIDE TABLE = Where PedTeamId = null and Status Is = AAG
    this.props.fetchPedTasksATO(unitId);
  
    // RIGHT SIDE TABLE = Where PedTeamId != null and Status Is = AAG
    this.props.fetchPedTasks(unitId);
  };


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
        accessor: 'Armed',
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
        accessor: 'missionId',
        filterable: false,
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
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.view,
        accessor: 'missionId',
        filterable: false,
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
    const pedTasksColumns = this.getRightColumns()
    
    return (
      <div>
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations['ped tasking']} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} />
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
