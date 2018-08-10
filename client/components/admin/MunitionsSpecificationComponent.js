import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import FilterDropdown from '../reusable/FilterDropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';
import ButtonsList from "../reusable/ButtonsList";
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import MissileModal from './munitions/MissileModal';
import RocketModal from './munitions/RocketModal';
import GunModal from './munitions/GunModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import { NotificationManager, NotificationContainer } from 'react-notifications';

class MunitionsSpecificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
      addMunitionsSpecificationOpen: false,
      serialVal: '',
      nameVal: '',
      form: {
        type: 'Test'
      },
      editId: '0',
      munitionType: 0,
      munitionTypes: {
        missile: 1,
        rocket: 2,
        gun: 3,
      },

    }
  }

  onFind() {
    console.log("find");
  }

  missileModal = () => {
    this.setState({
      munitionType: this.state.munitionTypes.missile,
      missileModalOpen: true,
      rocketModalOpen: false,
      gunModalOpen: false,
    });
  }

  rocketModal = () => {
    this.setState({
      munitionType: this.state.munitionTypes.rocket,
      missileModalOpen: false,
      rocketModalOpen: true,
      gunModalOpen: false,
    });
  }

  gunModal = () => {
    this.setState({
      munitionType: this.state.munitionTypes.gun,
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: true,
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
    });
  }



  componentWillMount() {
    this.props.fetchMunitions();
  }


  modelStateReset = () => {
    this.setState({
      munitionType: 0,
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
    });
  }

  //This method called when we select a row from table.
  //TODO: i found there is no chnages in UI in Missile, Rocket and Gun Section all showing same UI. 
  //So for now i am using Missile Scetion.
  openMunitionsSpecificationForm = (row) => {
    let value = row.value;
    let munitionType = 1;//row.original.munitionType;
    console.log(value);
    this.setState({
      editId: value,
      missileModalOpen: 1 === munitionType ? true : false,
      rocketModalOpen: 2 === munitionType ? true : false,
      gunModalOpen: 3 === munitionType ? true : false,
    });
  }

  closeMunitionSpecifiction = (actionType) => {
    this.loadData(actionType);
    this.setState({
      munitionType: 0,
      editId: '0',
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
    });

  }

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchMunitions();
  }

  //actionType means ADD, UPDATE, DELETE
  notify = (actionType) => {
    const { translations } = this.props;
    if ('DELETE' != actionType) {
      if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success('Update munition library successfully', 'Munition Specification ', 5000);
      } else {
        NotificationManager.success('Add munition library successfully', 'Munition Specification ', 5000);
      }
    } else {
      NotificationManager.success('Delete  munition library successfully', 'Munition Specification ', 5000);
    }
  }

  handleChange(value) {
    console.log(value);
  }

  handleForm = () => {
    console.log("here");
    this.setState({
      form: {
        type: 'Air-to-surface'
      }
    }, () => {
      // console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  render() {

    const { translations } = this.props;

    const munitions = [
      { name: translations['Missile'], onClick: this.missileModal },
      { name: translations['Rocket'], onClick: this.rocketModal },
      { name: translations['Guns'], onClick: this.gunModal }
    ];

    const { allMunitions } = this.props;

    const columns = [
      /*{
        Header: translations["type"],
        accessor: 'role',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="MunitionRoles" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>,
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },*/
      {
        Header: "ID",
        accessor: 'ID',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="MunitionRoles" munitions={munitions} dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>,
        // sortMethod: (a, b) => {
        //               if (a.length === b.length) {
        //                 return a > b ? 1 : -1;
        //               }
        //               return a.length > b.length ? 1 : -1;
        //             }// String-based value accessors!
      },
      /*{
        Header: translations['Name'],
        accessor: 'munition',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
      },*/
      {
        Header: "Munition",
        accessor: 'munition',
        // Filter: ({ filter, onChange }) =>
        // 		   <select
        // 			onChange={event => onChange(event.target.value)}
        // 			style={{ width: "100%" }}
        // 			value={filter ? filter.value : ""}
        // 		  >
        // 			{allMunitions.map(function(data, key){
        // 				return (<option key={key} value={data.munition}>{data.munition}</option> );
        // 			})}
        // 		  </select>
      },
      {
        Header: "Nomenclature",
        accessor: 'nomenclature',
      },
      {
        Header: "Manufacturer",
        accessor: 'manufacturer',
        // Filter: ({ filter, onChange }) =>
        //             <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      },
      {
        Header: "Role",
        accessor: 'role',
      },
      /*{
        Header: translations['Location'],
        accessor: 'location'
      },*/
      {
        Header: "Reference",
        accessor: 'reference',
      },

      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number change-cursor-to-pointer'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openMunitionsSpecificationForm(row)} /></span> // Custom cell components!
      }
    ];

    let serialval = this.state.serialVal;
    let nameval = this.state.nameVal;

    const rowFields = [
      { name: translations['Type'], type: 'dropdown', ddID: 'MunitionRoles' },
      { name: translations['Name'], type: 'input', valField: nameval },
      { name: translations['Serial#'], type: 'input', valField: serialval },
      { name: translations['COCOM'], type: 'dropdown', ddID: 'COCOM' },
      { name: translations['Unit'], type: 'dropdown', ddID: 'Units' },
      { name: translations['Location'], type: 'dropdown', ddID: 'Locations' },
      { name: translations['Record Date'], type: 'date' },
    ];

    console.log('allMunitions:');
    console.log(allMunitions);

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              Munitions Specification
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key='1' label={translations["Add Munition"]} id="1" items={munitions} />
            </div>
          </div>

          {this.state.missileModalOpen ?
            <MissileModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.missileModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }
          {this.state.rocketModalOpen ?
            <RocketModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.rocketModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }
          {this.state.gunModalOpen ?
            <GunModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.gunModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }
          <NotificationContainer />
          <div className="col-md-12">
            <ReactTable
              data={allMunitions}
              columns={columns}
              defaultPageSize={5}
              loading={this.props.isLoading}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={(filter, row) => {
                const id = filter.pivotId || filter.id
                return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
              }}

            />
          </div>
        </div>
        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations} rowvalues = {this.handleForm} init = {this.state.form}/> */}
      </div>
    );
  }
}

MunitionsSpecificationComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsSpecificationComponent;
