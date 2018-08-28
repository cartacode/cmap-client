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
    };
  }

  onFind() {
    console.log('find');
  }

  render() {

    const { translations } = this.props;

    const resource = [
      /* { 'id': '1', 'description': translations.platform }, */
      { 'id': '2', 'description': translations.personnel },
    ];

    const data = [{
      'IntelRequestID': '9a8abd12-ff5a-4287-8d64-a9a93f032d01',
      'ReqUserFrndlyID': 22,
      'COCOMText': 'PACOM',
      'MissionTypeText': 'Intelligence Preparation of the Battlefield (IPB)',
      'PrimaryPayloadName': 'Electro-Optical/Infra-Red',
    },
    {
      'IntelRequestID': '9a8abd12-ff5a-4287-8d64-a9a93f032d01',
      'ReqUserFrndlyID': 22,
      'COCOMText': 'PACOM',
      'MissionTypeText': 'Intelligence Preparation of the Battlefield (IPB)',
      'PrimaryPayloadName': 'Electro-Optical/Infra-Red',
    },
    {
      'IntelRequestID': '9a8abd12-ff5a-4287-8d64-a9a93f032d01',
      'ReqUserFrndlyID': 22,
      'COCOMText': 'PACOM',
      'MissionTypeText': 'Intelligence Preparation of the Battlefield (IPB)',
      'PrimaryPayloadName': 'Electro-Optical/Infra-Red',
    },
    {
      'IntelRequestID': '9a8abd12-ff5a-4287-8d64-a9a93f032d01',
      'ReqUserFrndlyID': 22,
      'COCOMText': 'PACOM',
      'MissionTypeText': 'Intelligence Preparation of the Battlefield (IPB)',
      'PrimaryPayloadName': 'Electro-Optical/Infra-Red',
    },
    ];

    const columns = [
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
        <TimelineFilter translations={translations} headerTxt="ped tasks" defaultResource={this.state.defaultResource} resource={resource} tab={this.state.tab}/>
        <div className="row mission-mgt" >
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.PedTask} />
                <div >
                  <ReactTable
                    data={data}
                    columns={columns}
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
                <FullHeaderLine headerText={translations.CollectionPlan} />
                <div >
                  <ReactTable
                    data={data}
                    columns={columns}
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
