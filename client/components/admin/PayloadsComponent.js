import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import FilterDropdown from '../reusable/FilterDropdown';
import Dropdown from '../reusable/Dropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import EoirModal from './payloads/EoirModal';
import SargmtiModal from './payloads/SargmtiModal';
import WamiModal from './payloads/WamiModal';
import SigintModal from './payloads/SigintModal';
import EquipmentModal from './payloads/EquipmentModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import AddPayloadsInventory from './payloads/AddPayloadsInventory';

class PayloadsComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			filterValue: '',
			filter: [],
			addPayloadsInventoryOpen:false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
			tableRowDetailModalOpen: false,
			payload_list_name: [],
			editId: '0'
		}
	}

	onFind(){
		console.log("find");
	}

	addPayloadsInventory = () => {
		this.setState({
			addPayloadsInventoryOpen: !this.state.addPayloadsInventoryOpen
		});
	}

	tableRowDetailModal = () => {
		this.setState({
			tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
		})
	}

	componentDidMount() {
		this.props.fetchPayloads();
		//this.props.fetchPayloadList();
	//	this.props.fetchCocoms();
	//	this.props.fetchLocationList();
	}

	openPersonnelForm = (row) => {
		this.setState({
		  editId: row,
		  addPayloadsInventoryOpen: true,
		});
	  }
	
	closePersonnelForm = () => {
	  this.props.fetchPersonnels();
	  this.setState({
		editId: '0',
		addPayloadsInventoryOpen: false,
	  });
	}
	

	renderItems(optionItem) {
		let items = [{"label": "-Select Item-", "value": 0}];
		optionItem.map((item, i) => {
			items.push({"label": item.description, "value": i});
		});
		return items.map(function(data, key){
			if(data.label == "-Select Item-"){
			  return ( <option key={key} value=""> {data.label} </option>) ;
			} else {
			  return (<option key={key} value={data.label}>{data.label}</option> );
			}
		})
	}

	handleChange(value) {
		console.log(value);
	}

	render() {
		const {translations, allPayloadInventory} = this.props;

		const addPayloads = [
			{name:translations['eo/ir'], onClick:this.eoirModal},
			{name:translations['sar/gmti'], onClick:this.sargmtiModal},
			{name:translations['wami'], onClick:this.wamiModal},
			{name:translations['sigint'], onClick:this.sigintModal},
			{name:translations['equipment'], onClick:this.equipmentModal},
		];

		const columns = [
			{
				Header: translations["type"],
				accessor: 'type',
				// filterMethod: (filter, row) =>
				// 			row[filter.id].startsWith(filter.value),
				// Filter: ({ filter, onChange}) =>
				// 		<select
				// 			onChange={event => onChange(event.target.value)}
				// 			style={{ width: "100%" }}
				// 			value={filter ? filter.value : ""} >
				// 			{this.renderItems([])}
				// 			<option key={'1'} value={'eo/ir'}>{'eo/ir'}</option>
				// 			<option key={'2'} value={'sar/gmti'}>{'sar/gmti'}</option>
				// 			<option key={'3'} value={'wami'}>{'wami'}</option>
				// 			<option key={'4'} value={'sigint'}>{'sigint'}</option>
				// 			<option key={'5'} value={'equipment'}>{'equipment'}</option>
				// 		</select>,
				// sortMethod: (a, b) => {
				// 			  if (a.length === b.length) {
				// 				return a > b ? 1 : -1;
				// 			  }
				// 			  return a.length > b.length ? 1 : -1;
				// 			}// String-based value accessors!
			  },
			{
				Header: translations['Name'],
				accessor: 'name',
				// Filter: ({ filter, onChange }) =>
				// 		   <select
				// 			onChange={event => onChange(event.target.value)}
				// 			style={{ width: "100%" }}
				// 			value={filter ? filter.value : ""}
				// 		  >
				// 			{this.renderItems([])}
				// 			{allPayloads.map(function(data, key){
				// 				return (<option key={key} value={data.payload}>{data.payload}</option> );
				// 			})}
				// 		  </select>
			},
			{
				Header: translations['serial#'],
				accessor: 'serialNumber',
			},
			{
				Header: translations['cocom'],
				accessor: 'COCOM',
				// Filter: ({ filter, onChange }) =>
				// 		  <select
				// 			  onChange={event => onChange(event.target.value)}
				// 			  style={{ width: "100%" }}
				// 			  value={filter ? filter.value : ""}
				// 		  >
				// 			  {this.renderItems(cocomList)}
				// 		  </select>
			},
			{
				Header: translations['Location'],
				accessor: 'location',
				// Filter: ({ filter, onChange }) =>
				// 		  <select
				// 			  onChange={event => onChange(event.target.value)}
				// 			  style={{ width: "100%" }}
				// 			  value={filter ? filter.value : ""}
				// 		  >
				// 			{this.renderItems([])}
				// 			{allPayloads.map(function(data, key){
				// 				return (<option key={key} value={data.location}>{data.location}</option> );
				// 			})}
				// 		  </select>
			},
			{
				Header: translations['Record Date'],
				accessor: 'recordDate',
				Filter: ({ filter, onChange }) =>
						  <FilterDatePicker onChange={this.handleChange} value={filter ? filter.value : ""}/>
			},
			{
				Header: translations['view'],
				accessor: 'ID',
				filterable: false,
				Cell: props => <span className='number'><img src="/assets/img/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span>// Custom cell components!
			}
		];

		

		return (
			<div>
				<div className="row orders-assets">
					<div className="header-line">
						<img src="/assets/img/admin/personnel_1.png" alt=""/>
						<div className="header-text">
							{translations["payloads"]}
						</div>
						<img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
					</div>
					<div className="col-md-12 filter-line">
            			<div className="add-button">
              				<button className="ccir-button" onClick={this.addPayloadsInventory} >{translations["Add Payload"]}</button>
            			</div>
          			</div>

				<AddPayloadsInventory show={this.state.addPayloadsInventoryOpen} onClose={this.addPayloadsInventory} translations = {translations} />

				<div className="col-md-12">
					<ReactTable
						data={allPayloadInventory}
						columns={columns}
						defaultPageSize={5}
						className="-striped -highlight"
						filterable = {true}
						defaultFilterMethod={(filter, row) => {
							const id = filter.pivotId || filter.id
							return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
						  }}
					/>
				</div>
				</div>


			</div>
		);
	}
}

PayloadsComponent.propTypes = {
	children: PropTypes.element,
};

export default PayloadsComponent;
