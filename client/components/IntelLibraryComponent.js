import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from './reusable/FullHeaderLine';
import ShortHeaderLine from './reusable/ShortHeaderLine';
import StatusTable from './reusable/StatusTable';
import Dropdown from "./reusable/Dropdown";
import FormBlock from "./reusable/FormBlock";

import FilterDropdown from './reusable/FilterDropdown';
import FilterDatePicker from './reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';

import { intelLibraryUser } from '../dictionary/auth';


class IntelLibraryComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {translations} = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = ses.UserRoles;
    const roles2 = JSON.parse(roles);
    const access = roles2.some(v => intelLibraryUser.includes(v));
    console.log(access);

    const searchResult = [
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
    ];

    const searchResultColumns = [
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
        Header: translations['mission'],
        accessor: 'mission',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['type'],
        accessor: 'type',
      }, 
      {
        Header: translations['start'],
        accessor: 'start',
      },
      {
        Header: translations['end'],
        accessor: 'end',
      },

      {
        Header: translations['classification'],
        accessor: 'classification',
      },
        
      {
        Header: translations['air track'],
        accessor: 'air_track',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox"  />
      },

      {
        Header: translations['video'],
        accessor: 'video',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['images'],
        accessor: 'images',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
       
      },

      {
        Header: translations['sigacts'],
        accessor: 'sigacts',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['email'],
        accessor: 'email',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/email_icon.png"  /></span> // Custom cell components!
      }, 

      {
        Header: translations['export'],
        accessor: 'export',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/export_icon.png"  /></span> // Custom cell components!
      }, 

      // {
      //   Header: translations['detail'],
      //   accessor: 'detail',
      //   filterable: false,
      //   Cell: props => <span className='number'><img src="/assets/img/general/detail_icon.png"  /></span> // Custom cell components!
      // }
    ];

    const dateTime = [
      {name: '', type: 'calendar'},
      {name: '', type: 'calendar'},
    ];

    const dataType = [
      {name: '', type: 'dropdown'},
      {name: '', type: 'dropdown'},
    ];

    const keyWord = [
      {name: '', type: 'input'},
      {name: '', type: 'dropdown'},
    ];

    let langs = ['val 1', 'val 2'];

    return ( access ? (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["intelligence reports"]} />
          </div>
          <div className="col-md-12">
            <ReactTable
                data={searchResult}
                columns={searchResultColumns}
                defaultPageSize={5}
                className="-striped -highlight"
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
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
                </div> ) : null
    );
  }
}

IntelLibraryComponent.propTypes = {
  children: PropTypes.element,
};

export default IntelLibraryComponent;
