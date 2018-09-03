import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, NoticeType, MissionConsts, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';
import { NotificationManager } from 'react-notifications';

class AtoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.ATO,
      radioUnitId: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  deleteApprovedIntelRequests = (value) => {
    /* if (value !== undefined && value !== '0') {
      const statusId = 7; // 'DRC'
      this.props.deleteApprovedIntelRequestById(value, statusId).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    } */
  };

  getColor= (row) => {
    return getIntelStatusColor(row.original.Abbreviation);
  }

  radioFilterSelect=(selectedRadio)=>{
    
    this.setState({
      // unitdId: generatedData.value,
      // owningUnitsId: generatedData.value,
      radioUnitId: selectedRadio,
    });
  }

moveToAto = (row) => {
  const intelRequestID = row.original.IntelRequestID;
  if(this.state.radioUnitId !== '' && this.state.radioUnitId !== 0) {
    const data = {
      'IntelReqID': intelRequestID,
      'OwningUnit': this.state.radioUnitId,
    };

    // Inserts new values in mission table
    this.props.moveToATOGenerationFromCollectionPlan(data).then(() => {
      this.loadData();
    });

  } else {
    alert('Please Select a Platform');
  }
}

  moveToCP = (row) => {
    // deletes from mission table by mission id
    const missionId = row.original.MissionId;
    this.props.moveToCollectionPlanFromATOGeneration(missionId).then(() => {
      this.loadData();
    });
  };

  routeATOGenerations = () => {
    const unitId = 25;
    const statusId = IntelConstants.STATUS.AAG.id;// 'AAG';
    this.props.routeATOGeneration(unitId, statusId).then(() => {
      // this.notify(NoticeType.ROUTE_COLLECTION_INTEL_REQUEST);
      this.loadData();
    });
  };

  loadData = () => {
    const unitId = 25;
    // CP = All intel with Status = APR for given unitId
    this.props.fetchATOCollectionPlans(IntelConstants.STATUS.APR.id, unitId);

    // ATO = All Intel with Status = AAG or APR and which has an entry in missionId table
    this.props.fetchATOGenerations(unitId);
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD === actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_COLLECTION === actionType) {
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

  render() {

    const { translations } = this.props;
    const { atoCollectionPlans } = this.props;
    const { atoGenerations } = this.props;


    const columnsATOCollectionPlans = [
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
      // {
      //   Header: translations['Asset'],
      //   accessor: 'Asset',
      //   Cell: ({ value }) => (value ? 'Yes' : 'No'),
      // },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToAto(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];
    const columnsATOGenerations = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        Cell: row => <div>
          <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
          <span>{row.value}</span>
        </div>,
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
      // {
      //   Header: translations['Asset'],
      //   accessor: 'Asset',
      //   Cell: ({ value }) => (value ? 'Yes' : 'No'),
      // },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan" onClick={() => this.moveToCP(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];

    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations.ato} defaultResource={this.state.defaultResource} tab={this.state.tab} 
          radioFilterSelect={this.radioFilterSelect} showUnitType={this.state.showUnitType} />
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.CollectionPlan} />
                <div >
                  <ReactTable
                    data={atoCollectionPlans}
                    columns={columnsATOCollectionPlans}
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
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={atoGenerations}
                    columns={columnsATOGenerations}
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
              <div className="row intel-request-table-margin-top">
                <div className="col-md-12 text-center">
                  <a href= "Javascript:void(0)" className="btn btn-warning btn-lg" onClick={() => this.routeATOGenerations()} >
                    Route
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

AtoComponent.propTypes = {
  children: PropTypes.element,

};

export default AtoComponent;
