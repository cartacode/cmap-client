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

class AtoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: '1',
      tab: 'ATO',
      unitdId: '',
      owningUnitsId: '',
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

  getColor= (row)=>{
    return getIntelRequestStatusCodeColor(row.original.Abbreviation);
  }

  moveToCollectionPlanFromATOGeneration = (row) => {
    /* const value = row.value;
    if (value !== undefined && value !== '0') {
	    this.props.moveToCollectionPlan(value).then(() => {
	      this.setState({ editId: '0' });
	      this.notify(NoticeType.MOVE_TO_COLLECTION);
	      this.loadData();
      });
    } */
  };

  radioFilterSelect=(generatedData)=>{
    this.setState({
      unitdId: generatedData.value,
      owningUnitsId: generatedData.value,
    });
  }

  moveToATOGenerationFromCollectionPlan = (row) => {

    const value = row.value;
    const intelRequestID = row.original.IntelRequestID;
    const owningUnit = row.original.UnitId;
    const platformInventoryID = row.original.PlatformInventoryID;
debugger;
    const data = {
      //'Id': 1,
      'IntelReqID': intelRequestID,
      'OwningUnit': owningUnit,
      //'PlatformInventoryID': '0756dca8-ab05-44b2-8c96-e6870db5eb9e',
      'CrewTeamID': 0,
      'PedTeamID': 0,
      'ATOIssueDate': '2018-08-29T04:36:37.827Z',
    };
    if (value !== undefined && value !== '0') {
      this.props.moveToATOGenerationFromCollectionPlan(data).then(() => {
        // this.notify(NoticeType.MOVE_TO_INTEL_REQUEST);
        this.loadData();
      });
    }
  };

  routeATOGenerations = () => {
    const unitId = 25;
    const statusId = 22;// 'AAG';
    this.props.routeATOGeneration(unitId, statusId).then(() => {
      // this.notify(NoticeType.ROUTE_COLLECTION_INTEL_REQUEST);
      this.loadData();
    });
  };

  deleteCollectionPlan=(value)=>{
    /*  if (value !== undefined && value !== '0') {
      this.props.deleteCollectionPlanById(value).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    } */
  }

  loadData = () => {
    const unitId = 25;
    const abbreviation = 'APR';
    this.props.fetchATOCollectionPlans(abbreviation, unitId);

    const statusId = 10; // 'AAG'
    this.props.fetchATOGenerations(statusId, unitId);
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

    console.log('*********************************atoCollectionPlans***************************' + atoCollectionPlans);
    console.log('*********************************atoGenerations***************************' + atoGenerations);

    const resource = [
      { 'id': '1', 'description': translations.platform },
    ];

    const columnsATOCollectionPlans = [
      {
        Header: 'Request#',
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: 'Status',
        accessor: 'Abbreviation',
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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToATOGenerationFromCollectionPlan(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a>
          </div>
        ),
      },
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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan"> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];

    return (
      <div>
        <TimelineFilter translations={translations} headerTxt="ATO" defaultResource={this.state.defaultResource} resource={resource} tab={this.state.tab} 
          radioFilterSelect={this.radioFilterSelect} />
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
