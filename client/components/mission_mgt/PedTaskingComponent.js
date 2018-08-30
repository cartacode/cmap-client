import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults } from '../../dictionary/constants';
import { defaultFilter } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';


class PedTaskingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: '2',
      tab: 'PED_TASK',
      teamId: '',
      showUnitType: false,
    };
  }


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

    this.props.fetchPedTasks( statusId, unitId);

    this.props.fetchPedTasksATOGenerations(statusId, unitId);
  };



  render() {

    const { translations } = this.props;

    const { pedTasksAtoGenerations } = this.props;
    const { pedTasks } = this.props;

    const resource = [
      { 'id': '2', 'description': translations.teams },
    ];

    

    

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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan"> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a>
          </div>
        ),
      },
    ];

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
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan"> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a>
          </div>
        ),
      },
    ];
    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations['ped tasking']} defaultResource={this.state.defaultResource} resource={resource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} showUnitType={this.state.showUnitType}/>
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
