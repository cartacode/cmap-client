import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import DropDownButton from '../reusable/DropDownButton';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import EoirModal from './payloads/EoirModal';
import EquipmentModal from './payloads/EquipmentModal';
import SargmtiModal from './payloads/SargmtiModal';
import SigintModal from './payloads/SigintModal';
import WamiModal from './payloads/WamiModal';
import Loader from '../reusable/Loader';




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
			//tableRowDetailModalOpen: false,
			payload_list_name: [],
			serialVal:'',
      		nameVal:'',
			form : {
				type: 'Test'
			  },
			editId: '0',
			payloadSpecType: '',
			payloadTypeId: 0,
			loading:false
			
		}
	}

	componentDidMount() {
		this.props.fetchPayloads();
		// this.props.fetchPayloadList();
	//	this.props.fetchCocoms();
	//	this.props.fetchLocationList();
	}

	openEoirModal = () => {
		this.setState({
			editId: '0',
			payloadTypeId: 1,
			eoirModalOpen: true,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
			type:'EO/IR',
			
		});
	}

	openSargmtiModal = () => {
		this.setState({
			editId: '0',
			payloadTypeId: 2,
			eoirModalOpen: false,
			sargmtiModalOpen: true,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});
	}

	openGmtiModal = () => {
		this.setState({
			editId: '0',
			payloadTypeId: 5,
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
			payloadTypeId: 3,
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
			payloadTypeId: 4,
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
			payloadTypeId: 18,
			eoirModalOpen: false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: true,
		});
	}


	
	closePayloadSpecifiction=(actionType)=>{
		this.loadData(actionType);
		this.setState({
			payloadSpecType: '',
			payloadTypeId: 0,
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
		// this.props.fetchPayloadList();
	}

	//actionType means ADD, UPDATE, DELETE
	notify =(actionType)=>{
		const { translations } = this.props;
		if(NoticeType.NOT_DELETE === actionType){
			NotificationManager.error(translations['DeleteUnSuccessfull'], translations['Payload Library Title'], 5000);
		}
		else if(NoticeType.DELETE != actionType){
			if (this.state.editId !== undefined && this.state.editId !== '0') {
				NotificationManager.success(translations['UpdatedSuccesfully'], translations['Payload Library Title'], 5000);
			}else{
				NotificationManager.success(translations['AddedSuccesfully'], translations['Payload Library Title'], 5000);
			}
		}else{
			NotificationManager.success(translations['DeletedSuccesfully'],translations['Payload Library Title'], 5000);
		}
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
		const payloadSpecType = row.original.type;
		const payloadTypeId = row.original.typeID;
		//console.log(value);
		this.modelStateReset();
		this.setState({
			payloadSpecType,
			editId: value,
			payloadTypeId,	  
			// eoirModalOpen: 'EO/IR' == payloadSpecType ? true : false,
			// sargmtiModalOpen: ('SAR' == payloadSpecType || 'GMTI' == payloadSpecType) ? true : false,
			// wamiModalOpen: 'WAMI' == payloadSpecType ? true : false,
			// sigintModalOpen: 'SIGINT' == payloadSpecType ? true : false,
			// equipmentModalOpen: 'EQUIPMENT' == payloadSpecType ? true : false,

			eoirModalOpen: payloadTypeId === 1 ? true : false,
			sargmtiModalOpen: (payloadTypeId === 2 || payloadTypeId === 5) ? true : false,
			wamiModalOpen: payloadTypeId === 3 ? true : false,
			sigintModalOpen: payloadTypeId === 4 ? true : false,
			equipmentModalOpen: payloadTypeId === 18 ? true : false,
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

    // This will get call when user click on Yes to Delete a Record
	deleteLogic(value){
		if (value !== undefined && value !== '0') {
			this.setState({loading:true});
		  this.props.deletePayloadsById(value).then(() => { 
			//this.setState({	editId: '0'});
			this.setState({loading:false});
			if(this.props.isDeleted)
			  this.loadData(NoticeType.DELETE);
			  else
			  this.notify(NoticeType.NOT_DELETE); 
			});
		} 
	}

    // will call when user click on Delete Button
	deletePayload= (value)=> {
		const { translations } = this.props;
		// Get Confirm user wish to Delete Yes/No 
		getConfirmation(translations['DeleteConfirmation'],
						translations['Yes'],
						translations['No'],
						() => this.deleteLogic(value)
						);
	  }

	handleChange(value) {
		console.log(value);
	}

	render() {
		const {translations} = this.props;
		const {allPayloads, payloadList, payloadTypes, cocomList, locationList} = this.props;
		const addPayloads = [
			{name:translations['eo/ir'], onClick:this.openEoirModal, typeSpec: 'EO/IR', id:1},
			{name:translations['sar'], onClick:this.openSargmtiModal, typeSpec: 'SAR/GMTI', id:2},
			{name:translations['wami'], onClick:this.openWamiModal, typeSpec: 'WAMI' , id:3},
			{name:translations['sigint'], onClick:this.openSigintModal, typeSpec: 'SIGINT', id:4 },
			{name:translations['gmti'], onClick:this.openGmtiModal, typeSpec: 'GMTI', id:5},
			{name:translations['equipment'], onClick:this.openEquipmentModal, typeSpec:'EQUIPMENT', id: 18 },
		];

		const columns = [
			{
				Header: "Type",
				accessor: 'type',
			},
			// {
			// 	Header: "Branch",
			// 	accessor: 'branch',
			// },
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
			  accessor: 'weight',
			},
			{
				Header: "Power(W)",
				accessor: 'power',
			},
			{
				Header: translations['view'],
				accessor: 'ID',
				filterable: false,
				Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary" onClick={() => this.openPayloadsSpecificationForm(row)} title="Edit" ><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
								  {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow" title="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a> :
                     			 <a href="javaScript:void('0');" onClick={() => this.deletePayload(row.value)} className="btn btn-danger" title="Delete"> <span className="glyphicon glyphicon-trash"/></a>}
							</div>,

			}
		];

		return (
			<div>
				<div className="row orders-assets">
					<div className="header-line">
					<Loader loading={this.state.loading} />
						<img src="/assets/img/admin/personnel_1.png" alt=""/>
						<div className="header-text">
							{translations['Payloads Specifications']}
						</div>
						<img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
					</div>
				{!this.state.eoirModalOpen && !this.state.sargmtiModalOpen && !this.state.wamiModalOpen && !this.state.sigintModalOpen && !this.state.equipmentModalOpen ? 
				<div className="col-md-12 filter-line">
					<div className="add-button">
						<DropDownButton key = '1' label={translations['Add']} id="1" items={addPayloads} />
					</div>
				</div> : null}
				{this.state.eoirModalOpen ?
				<EoirModal editId={this.state.editId} payloadTypeId={this.state.payloadTypeId} payloadSpecType= {this.state.payloadSpecType} show={this.state.eoirModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.sargmtiModalOpen ?
				<SargmtiModal editId={this.state.editId} payloadTypeId={this.state.payloadTypeId} payloadSpecType= {this.state.payloadSpecType} show={this.state.sargmtiModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.wamiModalOpen ?
				<WamiModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} payloadTypeId={this.state.payloadTypeId} show={this.state.wamiModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.sigintModalOpen ?
				<SigintModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} payloadTypeId={this.state.payloadTypeId} show={this.state.sigintModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				{this.state.equipmentModalOpen ? 
				<EquipmentModal editId={this.state.editId} payloadSpecType= {this.state.payloadSpecType} payloadTypeId={this.state.payloadTypeId} show={this.state.equipmentModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
				: null }
				
				
				<div className="col-md-12">
					<ReactTable
						data={allPayloads}
						columns={columns}
						defaultPageSize={TableDefaults.PAGE_SIZE}
						minRows={TableDefaults.MIN_ROWS}
						className="-striped -highlight"
						filterable={true}
						loading={this.props.isLoading}
						defaultFilterMethod={defaultFilter}
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
