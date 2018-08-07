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
import { NotificationContainer, NotificationManager } from 'react-notifications';



class CcirPirComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      ccirModalOpen:false,
      tableRowDetailModalOpen: false     ,
      addCcirPirModalOpen: false,
      editId: '0', 
    }
  }

  // ccirModal = () => {
  //   this.setState({
  //     ccirModalOpen: !this.state.ccirModalOpen
  //   })
  // }



// Open form Add/Edit Rerocd
  openCcirPirForm = (row) => {
    this.setState({
      editId: row,
      addCcirPirModalOpen: true,
    });
  }

  // Close Add/Edit Form
closeCcirPirForm = (messageType) => {
  //show Success Message
  this.notify(messageType);
  this.props.fetchCcirPirs();
  this.setState({
    editId: '0',
    addCcirPirModalOpen: false,
  });
}
// will call from onClose in CcirPirModal
callCloseCcirPirForm = () =>{
  this.closeCcirPirForm('');
}

// Delete Record
deleteCcirPirRecord(row){
  this.props.deleteCcirPirById(row).then(() => {
    //Refresh List
    this.closeCcirPirForm('delete');
  });
}

// function to Display Success Messages
notify =(type)=>{
  const { translations } = this.props;
  if(type === 'delete'){
    NotificationManager.success(translations['Delete CCIRPIR Message'], translations['CCIRPIR Title'], 5000);

  }
  else if(type === ''){
    //NotificationManager.success(translations['Delete CCIRPIR Message'], translations['CCIRPIR Title'], 5000);

  }
  else{
  
  if (this.state.editId !== undefined && this.state.editId !== '0') {
    NotificationManager.success(translations['Update CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
  }else{
    NotificationManager.success(translations['Add CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
  }
}
}


  componentDidMount() {
    // Fetch List of Records 
    this.props.fetchCcirPirs();
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
    const {translations} = this.props;
    const {allCcirPirs} = this.props;

    const ccirPirs = [translations['missile'], translations['rocket'], translations['gun'],];

    // const data = [    
    //   {cocom: 'a-cocom', country:'j-country', region:'a-region', unit:'unit', commander:'c-commander', recorddate:'3/15/2018', view:'view'},
      
    // ];

    // Set Columns and Data to display in the Table List
    const columns = [
      {
        Header: translations['Mission Name'],
        accessor: 'MissionName',
      },
      {
        Header: translations['COCOM'],
        accessor: 'COCOM',
       /*  Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>,
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors! */
      },
      {
        Header: translations['Region'],
        accessor: 'RegionName',
        /* Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Regions" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/> */
      }, 
      {
        Header: translations['Country'],
        accessor: 'CountryName',
        /* Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Countries" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/> */
      },
     
      {
        Header: translations['Unit'],
        accessor: 'UnitName',
       /*  Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Units" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/> */
      },
      {
        Header: translations['Commander'],
        accessor: 'CommanderName',
      },  
      {
        Header: translations['Type'],
        accessor: 'Type',
       /*  Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Units" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/> */
      },
     /*  {
        Header: translations['Record Date'],
        accessor: 'recorddate',
        filterable: false
        // filterMethod: (filter, row) =>
        //             row[filter.id].startsWith(filter.value)
      }, */
      {
        Header: translations['view'],
        accessor: 'CCIRPIRId',
        filterable: false,
        Cell: row => <div><span className='number'><img src="/assets/img/general/pen_icon.png" /* onClick={this.tableRowDetailModal} */ onClick={() => this.openCcirPirForm(row.value)} /></span> <span className='number'><img src="/assets/img/general/trash_icon.png" /* onClick={this.tableRowDetailModal} */ onClick={() => this.deleteCcirPirRecord(row.value)} /></span></div>// Custom cell components!
      } 
    ];

    const rowFields = [
      {name: 'Creation Date/Time', type: 'date'},
      {name: 'COCOM', type: 'dropdown', ddID: 'COCOM', },
      {name: 'Service', type: 'dropdown', ddID: 'BranchOfService'},
      {name: 'Country', type: 'dropdown', ddID: 'Countries'},
      {name: 'Region', type: 'dropdown', ddID: 'Regions'},
      {name: 'Unit', type: 'dropdown',ddID: 'Units'},
      {name: 'Commander', type: 'dropdown', ddID: 'Commander'},
      {name: 'Mission/Operation name', type: 'input'}
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
              <button className="ccir-button" onClick={() => this.openCcirPirForm('0')} >{translations["Add Ccir/Pirs"]}</button>
            </div>
          </div>
          {this.state.addCcirPirModalOpen ?
          <CcirPirModal  show={this.state.addCcirPirModalOpen} /*onClose={this.ccirModal} onAdd={this.handleAdd} */  editId = {this.state.editId} onClose={this.callCloseCcirPirForm} translations = {translations} />
          : null
        }


           <NotificationContainer />  




          <div className="col-md-12">
            <ReactTable
              data={allCcirPirs}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable={true}
						  defaultFilterMethod={(filter, row) => {
							  const id = filter.pivotId || filter.id
							  return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
						  }}
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
