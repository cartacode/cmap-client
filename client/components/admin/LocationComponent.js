import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import FilterDropdown from '../reusable/FilterDropdown';
import StatusTable from '../reusable/StatusTable';
import FormBlock from  '../reusable/FormBlock';

import BaseModal from './location/BaseModal';
import NaiModal from './location/NaiModal';
import PoiModal from './location/PoiModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import "react-table/react-table.css";
import ReactTable from 'react-table';

import { makeData } from '../../actions/actions';


class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [],
      baseModalOpen:false,
      naiModalOpen: false,
      poiModalOpen: false,
      tableRowDetailModalOpen: false,
    }
  }

  onFind(){
    console.log("find");
  }

  baseModal = () => {
    this.setState({
      baseModalOpen: !this.state.baseModalOpen
    });
  }

  naiModal = () => {
    this.setState({
      naiModalOpen: !this.state.naiModalOpen
    });
  }

  poiModal = () => {
    this.setState({
      poiModalOpen: !this.state.poiModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }

  componentWillMount() {
    this.props.fetchLocationData();
    
    // console.log("--here is locations fetch---");
    // console.log(data);
  }

  render() {

    const {translations: {translations}} = this.props;

    const locations = [
      {name:translations['Base'], onClick: this.baseModal},
      {name:translations['NAI'], onClick: this.naiModal},
      {name:translations['POI'], onClick: this.poiModal}
    ];

    const { location_data } = this.props;
    
    console.log("That data");
    console.log(location_data);

    const columns = [
      {
        Header:translations["type"],
        accessor: 'id',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
        
      },
      {
        Header: translations["Name"] ,
        accessor: 'name',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['COCOM'],
        accessor: 'COCOM',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>, 
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations["Country"],
        accessor: 'country',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
        
      },
      {
        Header: translations["Region"],
        accessor: 'region',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
        
      }, 
      {
        Header: translations['unit'],
        accessor: 'region',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
        
      },
      
      {
        Header: translations['Record Date'],
        accessor: 'region',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
        
      }, 
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span> // Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['Type'], type: 'dropdown'},
      {name: translations['Name'], type: 'input'},
      {name: translations['COCOM'], type: 'dropdown'},
      {name: translations['Country'], type: 'dropdown'},
      {name: translations['Region'], type: 'dropdown'},
      {name: translations['Unit'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="row">
          
          </div>
          <div className="header-line">
            <img src="/images/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Location"]}
            </div>
            <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Add Location"]} id="1" items={locations}/>
            </div>
          </div>
          <div className="col-md-12">
            <ReactTable
              data={location_data}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>
        <BaseModal show={this.state.baseModalOpen} onClose={this.baseModal} translations = {translations}/>
        <NaiModal show={this.state.naiModalOpen} onClose={this.naiModal} translations = {translations}/>
        <PoiModal show={this.state.poiModalOpen} onClose={this.poiModal} translations = {translations}/>
        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,

};

export default PersonnelComponent;
