import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { intelLibraryUser } from '../dictionary/auth';
import FullHeaderLine from './reusable/FullHeaderLine';
import Redirect from 'react-router-dom/Redirect';
import { TableDefaults } from '../dictionary/constants';
import { defaultFilter, formatDateTime } from '../util/helpers';
import EmailSendModal from './reusable/EmailSendModal';



class IntelLibraryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setState = {
      modalOpen: false,
      row: null,
    };
  }

  componentDidMount() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) {
      this.loadData();
    } else { <Redirect to="/login"/>; }
  }

  loadData = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    this.props.fetchIntelLibraryRequests(unitId);
  };


  openSendEmailModal = (rowValue) => {
    this.setState({
      modalOpen: true,
      row: rowValue,
    });
  }

  getTableheaderColumns = () => {
    const { translations } = this.props;
    return [
      // {
      //   Header: translations["date"],
      //   accessor: 'date',
      //   filterMethod: (filter, row) =>
      //               row[filter.id].startsWith(filter.value),

      //   sortMethod: (a, b) => {
      //                 if (a.length === b.length) {
      //                   return a > b ? 1 : -1;
      //                 }
      //                 return a.length > b.length ? 1 : -1;
      //               }// String-based value accessors!
      // },
      {
        Header: translations.mission,
        accessor: 'MissionName',
      },
      {
        Header: translations.type,
        accessor: 'MissionType',
      },
      {
        Header: translations.start,
        id: 'StartDate',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.StartDate);
        },
      },
      {
        Header: translations.end,
        id: 'EndDate',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.EndDate);
        },
      },
      {
        Header: translations.COCOM,
        accessor: 'COCOM',
        maxWidth: 150,
      },
      {
        Header: translations.Country,
        accessor: 'Country',
        maxWidth: 150,
      },
      {
        Header: translations.Unit,
        accessor: 'Unit',
      },

      {
        Header: translations.classification,
        accessor: 'Classification',
      },

      // {
      //   Header: translations['air track'],
      //   accessor: 'air_track',
      //   filterable: false,
      //   Cell: props => <input type="checkbox" className="checkbox" />,
      // },

      // {
      //   Header: translations.video,
      //   accessor: 'video',
      //   filterable: false,
      //   Cell: props => <input type="checkbox" className="checkbox" />,
      // },

      // {
      //   Header: translations.images,
      //   accessor: 'images',
      //   filterable: false,
      //   Cell: props => <input type="checkbox" className="checkbox" />,

      // },

      // {
      //   Header: translations.sigacts,
      //   accessor: 'sigacts',
      //   filterable: false,
      //   Cell: props => <input type="checkbox" className="checkbox" />,
      // },

      // {
      //   Header: translations.email,
      //   accessor: 'email',
      //   filterable: false,
      //   Cell: props => <span className="number"><img src="/assets/img/general/email_icon.png" /></span>, // Custom cell components!
      // },

      {
        Header: translations.export,
        accessor: 'Report',
        filterable: false,
        maxWidth: 70,
        Cell: row => (
         
          <div>
            <a href={row.value} target="_blank" className="btn btn-primary" title="Export and Download" > <span className="glyphicon glyphicon-download" /></a>
            &nbsp;
            {/* <a href="JavaScript: void('0');" className="btn btn-danger" title="Export and Download" ><span className="glyphicon glyphicon-export" /> </a> */}
          </div>
        )
      },
      {
        Header: translations.Send,
        accessor: '',
        filterable: false,
        maxWidth: 70,
        Cell: row => (
          <div>
            <a href="Javascript: void('0');" className="btn btn-primary" title="Send" onClick={() => this.openSendEmailModal(row)} > <span className="glyphicon glyphicon-send" /></a>
          </div>
        ),
      },
    ]
  }

  render() {

    const { translations } = this.props;

    const { allIntelLibraries } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = ses.UserRoles;
    const roles2 = JSON.parse(roles);
    const access = roles2.some(v => intelLibraryUser.includes(v));
    console.log(access);

    /* const searchResult = [
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
      { date: '07//11/17', mission: 'firechief', type: 'strike', start: '12:45', end: '18:45', classification: 'unclass', air_track: 'check', video: 'check', images: 'check', sigacts: 'check', email: 'email', export: 'export', detail: 'detail' },
    ]; */

    const searchResult = allIntelLibraries;
    const searchResultColumns = this.getTableheaderColumns();

    const dateTime = [
      { name: '', type: 'calendar' },
      { name: '', type: 'calendar' },
    ];

    const dataType = [
      { name: '', type: 'dropdown' },
      { name: '', type: 'dropdown' },
    ];

    const keyWord = [
      { name: '', type: 'input' },
      { name: '', type: 'dropdown' },
    ];

    const langs = ['val 1', 'val 2'];

    return (access ? (
      <div>
        {/* <EmailSendModal show={this.state.modalOpen} onClose={this.closeEmailModal} row = {this.state.row} moveLeft = {this.moveLeft} translations = {translations}  /> */}
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['intelligence reports']} />
          </div>
          <div className="col-md-12">
            <ReactTable
              data={searchResult}
              columns={searchResultColumns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              className="-striped -highlight"
              filterable={true}
              minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
              // defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]) === filter.value}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
        {/* <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search criteria"]} />
          </div>
          <div className="col-md-12">
            <img className="large-map" src="/assets/img/intel_request/operating_picture/large_map.png" alt="" />
          </div>
        </div> */}
      </div>) : null
    );
  }
}

IntelLibraryComponent.propTypes = {
  children: PropTypes.element,
};

export default IntelLibraryComponent;
