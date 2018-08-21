import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { defaultFilter, formatDateTime, getIntelRequestStatusCodeColor } from '../../util/helpers';
import { TableDefaults } from '../../dictionary/constants';
import { NotificationManager } from 'react-notifications';

class RequestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [],
      missileModalOpen:false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
      serialVal:'',
      nameVal:'',
      form : {
        type: 'Test'
      }

    }

    moment.locale('en');
  }



  componentDidMount() {
    this.props.fetchIntelRequests();
  }

  deleteIntelRequestById =(value)=>{
    debugger;
    const { translations } = this.props;
    this.props.deleteIntelRequestById(value).then(() => {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
      this.props.fetchIntelRequests();
    });
  }


  getColor= (row)=> {
    return  getIntelRequestStatusCodeColor(row.original.Abbreviation);
  }
  render() {

    const { translations } = this.props;

    const { allRequests } = this.props;

 
    const { match } = this.props;

    const addurl = match.url.replace('/request', '/request-form');
    const editurl = match.url.replace('/request', '/detail/');

    const columns = [
      {
        Header: 'IR#',
        accessor: 'IntelRequestID',
        Cell: row => <div>
          <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
          <span>{row.value}</span>
        </div>,
      },
      {
        Header: 'Status',
        id: 'StatusId',
        accessor: 'Status',
      },
      {
        Header: 'Named Operation',
        accessor: 'NamedOperation',
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
        Header: 'Originator',
        accessor: 'OrginatorPersonnelID',
        Cell: row => <div>{row.original.OriginatorFirstName} {row.original.OriginatorLastName} </div>,
      },
      {
        Header: 'Date',
        id: 'ActiveDateTimeStart',
        accessor: d => {
          return formatDateTime(d.ActiveDateTimeStart);
        },
      },
      {
        Header: 'LTIV',
        id: 'LatestTimeIntelValue',
        accessor: d => {
          return formatDateTime(d.LatestTimeIntelValue);
        },
      },
      {
        Header: translations['view'],
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => <div><Link to={`${editurl}${row.value}`} className="btn btn-primary"><span className="glyphicon glyphicon-edit"/></Link> &nbsp; 
        <a href="#" className="btn btn-danger" > <span className="glyphicon glyphicon-trash" onClick={() => this.deleteIntelRequestById(row.value)}/></a></div>,
      },
    ];

   
    //let itemurl = itemu.replace("/summary", "/request");

    


    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              Summary
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">

            {/* <Link to={ itemurl } activeClassName="btn btn-warning">{translations['New request'}</Link> */}
            <Link to={ addurl } className="btn btn-warning">New Request</Link>

{/*             <NavLink to={itemurl} className="submenu" activeClassName="active-submenu-item">
              <div className="add-button">
                <button className="bt btn-warning">New Request</button>
              </div>
            </NavLink>
 */}
          </div>
          <div className="col-md-12">
            <ReactTable
              data={allRequests}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.PAGE_SIZE}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

RequestComponent.propTypes = {
  children: PropTypes.element,

};

export default RequestComponent;