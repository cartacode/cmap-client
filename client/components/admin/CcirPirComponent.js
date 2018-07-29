import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';

import Modal from '../reusable/Modal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';
import Dropdown from '../reusable/Dropdown';
import FilterDropdown from '../reusable/FilterDropdown';
import CustomButton from '../reusable/CustomButton';

import CcirPirModal from './ccir-pirs/CcirPirModal';
import CcirRowDetailModal from './ccir-pirs/CcirRowDetailModal';

import "react-table/react-table.css";
import ReactTable from 'react-table';


class CcirPirComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      ccirModalOpen:false,
      tableRowDetailModalOpen: false      
    }
  }

  ccirModal = () => {
    this.setState({
      ccirModalOpen: !this.state.ccirModalOpen
    })
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }

  onFind(){
    console.log("find");
  }


  render() {

    let langs = ['ccir', 'pir'] ;
    const {translations: {translations}} = this.props;

    const ccirPirs = [translations['missile'], translations['rocket'], translations['gun'],];

    const data = [    
      {cocom: 'a-cocom', country:'j-country', region:'a-region', unit:'unit', commander:'c-commander', recorddate:'3/15/2018', view:'view'},
      
    ];

    const columns = [
      {
        Header: translations['COCOM'],
        accessor: 'cocom', 
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
        Header: translations['Country'],
        accessor: 'country',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Countries" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      },
      {
        Header: translations['Region'],
        accessor: 'region',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Regions" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      }, 
      {
        Header: translations['Unit'],
        accessor: 'unit',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Commander'],
        accessor: 'commander',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },  
      {
        Header: translations['Record Date'],
        accessor: 'recorddate',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      }, 
      {
        Header: translations['view'],
        accessor: 'view',
        Cell: props => <span className='number'><img src="/assets/img/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span> // Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['COCOM'], type: 'dropdown'},
      {name: translations['Country'], type: 'dropdown'},
      {name: translations['Region'], type: 'dropdown'},
      {name: translations['Unit'], type: 'dropdown'},
      {name: translations['Commander'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Ccir/Pir"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line" style={{padding:'0px 17px 0px 0px'}}>
            <div className="add-button">
              <button className="ccir-button" onClick={this.ccirModal} >{translations["Add Ccir/Pirs"]}</button>
            </div>
          </div>
          <CcirPirModal show={this.state.ccirModalOpen} onClose={this.ccirModal} onAdd={this.handleAdd}/>
          <div className="col-md-12">
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
          
          <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} />
        </div>
      </div>
    );
  }
}

CcirPirComponent.propTypes = {
  children: PropTypes.element,

};

export default CcirPirComponent;
