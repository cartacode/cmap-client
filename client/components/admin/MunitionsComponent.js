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

class MunitionsComponent extends React.Component {

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

  onFind(){
    console.log("find");
  }

  missileModal = () => {
    this.setState({
      missileModalOpen: !this.state.missileModalOpen
    });
  }

  rocketModal = () => {
    this.setState({
      rocketModalOpen: !this.state.rocketModalOpen
    });
  }

  gunModal = () => {
    this.setState({
      gunModalOpen: !this.state.gunModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }
  
  

  componentWillMount() {
    this.props.fetchMunitions();
    // console.log("--here is Munitions---");
    // console.log(data);
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

    const {translations: {translations}} = this.props;
    
    const munitions = [
      {name:translations['Missile'], onClick:this.missileModal},
      {name:translations['Rocket'], onClick:this.rocketModal},
      {name:translations['Guns'], onClick:this.gunModal}
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
        Header: translations["type"],
        accessor: 'role',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="MunitionRoles" munitions={munitions} dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>, 
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      /*{
        Header: translations['Name'],
        accessor: 'munition',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
      },*/
	  {
		Header: translations['Name'],
		accessor: 'munition',
		Filter: ({ filter, onChange }) =>
				   <select
					onChange={event => onChange(event.target.value)}
					style={{ width: "100%" }}
					value={filter ? filter.value : ""}
				  >
					{allMunitions.map(function(data, key){  
						return (<option key={key} value={data.munition}>{data.munition}</option> );
					})}
				  </select>
	  },
      {
        Header: translations['serial#'],
        accessor: 'serial',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      }, 
      {
        Header: translations['cocom'],
        accessor: 'COCOM',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      },
      {
        Header: translations['unit'],
        accessor: 'unit',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Units" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>
      },
      /*{
        Header: translations['Location'],
        accessor: 'location'
      },*/
	  {
		Header: translations['Location'],
		accessor: 'location',
		Filter: ({ filter, onChange }) =>
				   <select
					onChange={event => onChange(event.target.value)}
					style={{ width: "100%" }}
					value={filter ? filter.value : ""}
				  >
					{allMunitions.map(function(data, key){  
						return (<option key={key} value={data.location}>{data.location}</option> );
					})}
				  </select>
	  },
      {
        Header: translations['Record Date'],
        accessor: 'lastUpdate',
        Filter: ({ filter, onChange }) =>
                  <FilterDatePicker onChange={this.handleChange} value={filter ? filter.value : ""}/>
      }, 
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/eye_icon.png"  /></span> // Custom cell components!
      }
    ];

    let serialval = this.state.serialVal;
    let nameval = this.state.nameVal;

    const rowFields = [
      {name: translations['Type'], type: 'dropdown', ddID:'MunitionRoles'},
      {name: translations['Name'], type: 'input', valField:nameval},
      {name: translations['Serial#'], type: 'input', valField:serialval},
      {name: translations['COCOM'], type: 'dropdown', ddID:'COCOM'},
      {name: translations['Unit'], type: 'dropdown',ddID:'Units'},
      {name: translations['Location'], type: 'dropdown', ddID:'Locations'},
      {name: translations['Record Date'], type: 'date'},
    ];
	
	console.log('allMunitions:');
		console.log(allMunitions);

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Munitions"]} 
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Add Munition"]} id="1" items={munitions} />
            </div>
          </div>

        <MissileModal show={this.state.missileModalOpen} onClose={this.missileModal} translations = {translations}/>
        <RocketModal show={this.state.rocketModalOpen} onClose={this.rocketModal} translations = {translations}/>
        <GunModal show={this.state.gunModalOpen} onClose={this.gunModal} translations = {translations}/>
          <div className="col-md-12">
            <ReactTable
              data={allMunitions}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: e =>{

                      console.log(rowInfo);
                      console.log(column);

                       if (column.Header == 'view')
                      {
                        this.setState({
                          tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
                        });
                        this.setState({
                          serialVal: rowInfo.original.serial,
                          nameVal: rowInfo.original.munition
                        });
                      }

                    }


                  };
                }}
            />
          </div>
        </div>
        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations} rowvalues = {this.handleForm} init = {this.state.form}/>
      </div>
    );
  }
}

MunitionsComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsComponent;
