import PropTypes from 'prop-types';
import React from 'react';
import FullHeaderLine from '../reusable/FullHeaderLine';
import ImageryBlock from "../reusable/ImageryBlock";
import 'react-table/react-table.css';
import ReactTable from 'react-table';


class CollectionManagerComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {


    const {translations} = this.props;

    const columns = [
      {
        Header: 'IR#',
        accessor: 'irNo',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
	    // {
	    //   Header: 'Mission Type',
	    //   accessor: 'missionType',
	    // },
      {
        Header: 'Payload',
        accessor: 'payload',
      },
      {
        Header: 'Armed',
        accessor: 'armed',
      },
      {
        Header: 'Command',
        accessor: 'command',
      },
      
      {
        Header: translations['view'],
        accessor: 'id',
        filterable: false,
        Cell: row => <div><a href="#" className="text-success" ><span className="glyphicon glyphicon-edit"/></a>&nbsp; <a href="#" className="text-danger" > <span className="glyphicon glyphicon-trash"/></a></div>,
      }
    ];

const rows =  [
    {irNo:'0000-01', status: 'Pending', missionType: 'Force Protect', payload: 'FMV', armed:'Armed', command:'TF-EAGLE' },
    {irNo:'0000-02', status: 'Pending', missionType: 'Force Protect', payload: 'EOIR', armed:'UnArmed', command:'TF-EAGLE' },
    {irNo:'0000-03', status: 'Future', missionType: 'Force Protect', payload: 'FMV', armed:'Unarmed', command:'TF-EAGLE' },
    {irNo:'0000-04', status: 'Pending', missionType: 'Force Protect', payload: 'SIGINT', armed:'Unarmed', command:'TF-Bravo' },
    {irNo:'0000-05', status: 'Recent', missionType: 'Force Protect', payload: 'WAMI', armed:'Armed', command:'SOF-Blue' },
    {irNo:'0000-06', status: 'Denied', missionType: 'Force Protect', payload: 'FMV', armed:'Unrmed', command:'TF-EAGLE' },
];

    let langs = ['val 1', 'val 2'];
    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-6 two-block">
            <FullHeaderLine headerText={translations["CollectionMap"]} />
            <img className="photo" src="/assets/img/intel_request/request/request_pic.png" alt="" />
          </div>
          
          {/* <div className="col-md-6 two-block">
            
          </div> */}

          {/* <div className="col-md-6">
            
          </div> */}
          <div className="col-md-6">
          <FullHeaderLine headerText={translations["CollectionPlan"]} />
            <div className="row ">
              <div className="col-md-12">
                <ReactTable
                  data={rows}
                  columns={columns}
                  defaultPageSize={3}
                  showPaginationTop= {true}
                  showPaginationBottom= {false}
                  className="-striped -highlight"
                  filterable={true}
                  showPageSizeOptions= {false}
                  previousText= "&#8678;"
                  nextText= "&#8680;"
                  minRows={3}
                  defaultFilterMethod={(filter, row) => {
                    const id = filter.pivotId || filter.id
                    return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
                  }}

                />   
              </div>
              
              <div className="col-md-12">
                <ReactTable
                  data={rows}
                  columns={columns}                  
                  defaultPageSize={3}
                  minRows={3}
                  className="-striped -highlight"
                  filterable={false}
                  showPagination= {false}
                  previousText= "&#8678;"
                  nextText= "&#8680;"
                  defaultFilterMethod={(filter, row) => {
                    const id = filter.pivotId || filter.id
                    return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
                  }}

                />   
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

CollectionManagerComponent.propTypes = {
  children: PropTypes.element,

};

export default CollectionManagerComponent;
