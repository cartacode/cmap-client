import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import DropDownButton from '../reusable/DropDownButton';
import TableRowDetailModal from '../reusable/TableRowDetailModal';
import EoirModal from './payloads/EoirModal';
import EquipmentModal from './payloads/EquipmentModal';
import SargmtiModal from './payloads/SargmtiModal';
import SigintModal from './payloads/SigintModal';
import WamiModal from './payloads/WamiModal';




class PayloadsSpecificationComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			filterValue: '',
			filter: [],
			eoirModalOpen:false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
			tableRowDetailModalOpen: false,
			payload_list_name: [],
			serialVal:'',
      		nameVal:'',
			form : {
				type: 'Test'
			  },
			editId: '0',
			payloadSpecType: '',
			
		}
	}

	onFind(){
		console.log("find");
	}

	openEoirModal = () => {
		this.setState({
			editId: '0',
			eoirModalOpen: true,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
			
		});
	}

	openSargmtiModal = () => {
		this.setState({
			editId: '0',
			eoirModalOpen: false,
			sargmtiModalOpen: true,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});
	}

	openWamiModal = () => {
		this.setState({
			editId: '0',
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: true,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});
	}

	openSigintModal = () =>{
		this.setState({
			editId: '0',
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: true,
			equipmentModalOpen: false,
		});
	}

	openEquipmentModal = () => {
		this.setState({
			editId: '0',
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: true,
		});
	}

	tableRowDetailModal = () => {
		this.loadData();
		this.setState({
			tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
			editId: 0,
		})
	}

	
	closePayloadSpecifiction=(actionType)=>{
		this.loadData(actionType);
		this.setState({
			payloadSpecType: '',
			editId: '0',
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});

	}

	loadData = (actionType) =>{
		this.notify(actionType);
		this.props.fetchPayloads();
		this.props.fetchPayloadList();
	}

	//actionType means ADD, UPDATE, DELETE
	notify =(actionType)=>{
		const { translations } = this.props;
		if('DELETE' != actionType){
			if (this.state.editId !== undefined && this.state.editId !== '0') {
				NotificationManager.success(translations['Update Platform Specification Message'], translations['Platform Specification Title'], 5000);
			}else{
				NotificationManager.success(translations['Add Platform Specification Message'], translations['Platform Specification Title'], 5000);
			}
		}else{
			NotificationManager.success(translations['Delete Platform Specification Message'],translations['Platform Specification Title'], 5000);
		}
	}

	componentWillMount() {
		this.props.fetchPayloads();
		this.props.fetchPayloadList();
	//	this.props.fetchCocoms();
	//	this.props.fetchLocationList();
	}

	modelStateReset = ()=>{
		this.setState({
			payloadSpecType: '',
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});
	}

	openPayloadsSpecificationForm = (row) => {
		let value = row.value;
		//@Note:- types like as EO/IR, SAR, WAMI, SIGINT, GMTI, FMV, COMINT, LIDAR, PeARL, WAPS, OCD, CCD, MASINT, HSI, DMTI, ELINT, IMINT.
		let payloadSpecType = row.original.type;
		console.log(value);
		this.modelStateReset();
		this.setState({
			payloadSpecType:payloadSpecType,
		    editId: value,
		  	eoirModalOpen: 'EO/IR' == payloadSpecType ? true : false,
			sargmtiModalOpen: ('SAR' == payloadSpecType || 'GMTI' == payloadSpecType) ? true : false,
			wamiModalOpen: 'WAMI' == payloadSpecType ? true : false,
			sigintModalOpen: 'SIGINT' == payloadSpecType ? true : false,
			equipmentModalOpen: 'EQUIPMENT' == payloadSpecType ? true : false,
		});
		console.log(this.state.editId);
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

	deletePayload= (value)=> {
		if (value !== undefined && value !== '0') {
		  this.props.deletePayloadsById(value).then(() => { 
			this.setState({	editId: '0'});
			  this.loadData('DELETE'); 
			});
		} 
	  }

	handleChange(value) {
		console.log(value);
	}

	render() {
		const {translations} = this.props;
		const {allPayloads, payloadList, payloadTypes, cocomList, locationList} = this.props;
		const addPayloads = [
			{name:translations['eo/ir'], onClick:this.openEoirModal, typeSpec: 'EO/IR'},
			{name:translations['sar/gmti'], onClick:this.openSargmtiModal, typeSpec: 'SAR/GMTI'},
			{name:translations['wami'], onClick:this.openWamiModal, typeSpec: 'WAMI' },
			{name:translations['sigint'], onClick:this.openSigintModal, typeSpec: 'SIGINT' },
			{name:translations['equipment'], onClick:this.openEquipmentModal, typeSpec:'EQUIPMENT' },
		];

		const columns = [
			{
				Header: "Type",
				accessor: 'type',
			},
			{
				Header: "Branch",
				accessor: 'branch',
			},
			{
				Header: "Manufacturer",
				accessor: 'manufacturer',
			},
			{
				Header: "Payload Name",
				accessor: 'name',
				
			},
			{
				Header: "Mission Role",
				accessor: 'role',
			},
			{
			  Header: "Weight (lbs.)",
			  accessor: 'weigth',
			},
			{
				Header: "Power(W)",
				accessor: 'power',
			},
			{
				Header: translations['view'],
				accessor: 'ID',
				filterable: false,
				Cell: row => <div><span className='number change-cursor-to-pointer'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPayloadsSpecificationForm(row)} /></span> <span className='number change-cursor-to-pointer'><img src="/assets/img/general/trash_icon.png" onClick={() => this.deletePayload(row.value)} /></span></div>
			}
		];

		let serialval = this.state.serialVal;
    	let nameval = this.state.nameVal;

		const rowFields = [
			{name: translations['Type'], type: 'dropdown'},
			{name: translations['Name'], type: 'input', valField:nameval},
			{name: translations['Serial#'], type: 'input', valField:serialval},
			{name: translations['COCOM'], type: 'dropdown'},
			{name: translations['Unit'], type: 'dropdown'},
			{name: translations['Location'], type: 'dropdown'},
			{name: translations['Record Date'], type: 'date'},
		];

		return (
			<div>
				<div className="row orders-assets">
					<div className="header-line">
						<img src="/assets/img/admin/personnel_1.png" alt=""/>
						<div className="header-text">
							Payloads Specification
						</div>
						<img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
					</div>
				<div className="col-md-12 filter-line">
					<div className="add-button">
						<DropDownButton key = '1' label="Add Specification" id="1" items={addPayloads} />
					</div>
				</div>
				{this.state.eoirModalOpen ?
				<EoirModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} show={this.state.eoirModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.sargmtiModalOpen ?
				<SargmtiModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} show={this.state.sargmtiModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.wamiModalOpen ?
				<WamiModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} show={this.state.wamiModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.sigintModalOpen ?
				<SigintModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} show={this.state.sigintModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.equipmentModalOpen ? 
				<EquipmentModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} show={this.state.equipmentModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.closePayloadSpecifiction} rowdata = {rowFields} translations = {translations} rowvalues = {this.handleForm} init = {this.state.form}/> */}
				<NotificationContainer />
				<div className="col-md-12">
					<ReactTable
						data={allPayloads}
						columns={columns}
						defaultPageSize={5}
						className="-striped -highlight"
						filterable={true}
						loading={this.props.isLoading}
						defaultFilterMethod={(filter, row) => {
							const id = filter.pivotId || filter.id
							return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
						  }}
					/>
				</div>
				</div>


			</div>
		);
	}
}

PayloadsSpecificationComponent.propTypes = {
	children: PropTypes.element,
};

export default PayloadsSpecificationComponent;
