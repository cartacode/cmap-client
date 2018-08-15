import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';

import { Link } from 'react-router-dom';

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
  }



  componentDidMount() {
    this.props.fetchIntelRequests();
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
        accessor: 'role',
      },
      {
        Header: 'Date',
        accessor: 'lastUpdate',
      },
	  {
	    Header: 'Status',
	    accessor: 'munition',
	  },
      {
        Header: 'Operation',
        accessor: 'serial',
      },
      {
        Header: 'Command',
        accessor: 'COCOM',
      },
      {
        Header: 'Type',
        accessor: 'unit',
      },
      
      {
        Header: translations['view'],
        accessor: 'id',
        filterable: false,
        Cell: row => <div><Link to={`${editurl}${row.value}`} className="btn btn-primary"><span className="glyphicon glyphicon-edit"/></Link> &nbsp; <a href="#" className="text-white" > <span className="glyphicon glyphicon-trash"/></a></div>,
      }
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
              defaultPageSize={8}
              minRows={1}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={(filter, row) => {
                const id = filter.pivotId || filter.id
                return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
              }}
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
