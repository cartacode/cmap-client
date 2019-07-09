import PropTypes from 'prop-types';
import React from 'react';
import 'react-table/react-table.css';
/* import moment from 'moment';
import TimelineFilter from '../reusable/TimelineFilter';
import FullHeaderLine from '../reusable/FullHeaderLine';
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import { MissionConsts } from '../../dictionary/constants';
import CustomDatePicker from '../reusable/CustomDatePicker'; */
import Loader from '../reusable/Loader';
import DropDownButtonSpec from '../reusable/DropDownButtonSpec';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import { defaultFilter, getConfirmation } from '../../util/helpers';

import { superAdmin, adminUser } from '../../dictionary/auth';
import ScrollToTop from '../reusable/ScrollToTop';
import ReactTable from 'react-table';
import ChatRoomModal from './reports/chatRoom';



class ReportsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      chatRoomModalOpen: false,
      reportModalOpen: false,
      editId: '0',
			loading: false,

    };
  }

  componentDidMount() {
    //this.props.fetchReportList();
  }

	openChatRoomModal = () => {
		const { translations } = this.props;
	  this.setState({
	    editId: '0',
	    chatRoomModalOpen: true,
			reportModalOpen: false,
			selectedSpecText:translations['Chat Room']

	  });
	}

	openReportModal = () => {
		const { translations } = this.props;
	  this.setState({
	    editId: '0',
	    //payloadTypeId: 2,
	    chatRoomModalOpen: false,
			reportModalOpen: true,
			selectedSpecText:translations['Report Upload']
		
	  });
	}

	

	

	

	closeReports=(actionType, actionSuccess)=>{
		if(actionSuccess) {
			this.loadData(actionType);
			this.setState({
				editId: '0',
				chatRoomModalOpen: false,
				reportModalOpen: false,
				selectedSpecText: '',
			});
	 }else{
		this.notify(actionType);
	 }

	}

	loadData = (actionType) =>{
	  this.notify(actionType);
	  this.props.fetchPayloads();
	  // this.props.fetchPayloadList();
	}

	// actionType means ADD, UPDATE, DELETE
	notify =(actionType)=>{

	  const { translations } = this.props;
	  if(NoticeType.NOT_DELETE === actionType) {
	    NotificationManager.error(translations.DeleteUnSuccessfull, translations['reports'], 5000);
		} 
		else if (NoticeType.NOT_ADD === actionType) {
      NotificationManager.error(translations.AddUnSuccessfull, translations['reports'], 5000);
    }
    else if (NoticeType.NOT_UPDATE === actionType) {
      NotificationManager.error(translations.UpdateUnSuccessfull, translations['reports'], 5000); 
		}
		else if(NoticeType.DELETE != actionType) {
	    if (this.state.editId !== undefined && this.state.editId !== '0') {
	      NotificationManager.success(translations.UpdatedSuccesfully, translations['reports'], 5000);
	    }else{
	      NotificationManager.success(translations.AddedSuccesfully, translations['reports'], 5000);
	    }
	  }else{
	    NotificationManager.success(translations.DeletedSuccesfully, translations['reports'], 5000);
	  }
	}

	modelStateReset = ()=>{
	  this.setState({
      chatRoomModalOpen: false,
      reportModalOpen: false,
	  });
	}

	openReportListing = (row) => {
	  const value = row.value;
		const typeID = row.original.typeID;


		this.modelStateReset();
		this.setState({
	    editId: value,
	    chatRoomModalOpen: typeID === 1,
	    reportModalOpen: typeID === 2 ,
	   
	  });


	  console.log(this.state.editId);
	  }

	 

	  

	  // This will get call when user click on Yes to Delete a Record
	  deleteLogic(value) {
	    if (value !== undefined && value !== '0') {
	      this.setState({ loading: true });
		  this.props.deleteReportById(value).then(() => {
	        // this.setState({	editId: '0'});
	        this.setState({ loading: false });
	        if(this.props.isDeleted)
			  {this.loadData(NoticeType.DELETE);}
			  else
			  {this.notify(NoticeType.NOT_DELETE);}
	      });
	    }
	  }

	  // will call when user click on Delete Button
	deleteReportsList= (value)=> {
	  const { translations } = this.props;
	  // Get Confirm user wish to Delete Yes/No
	  getConfirmation(translations.DeleteConfirmation,
	    translations.Yes,
	    translations.No,
	    () => this.deleteLogic(value)
	  );
	  }

	handleChange(value) {
	  console.log(value);
	}

	render() {
	  const { translations } = this.props;
		const { allReports } = this.props;
		
		let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => adminUser.includes(v));

	  const addReportAndChatRoom = [
	    { name: translations['reportsUpload'], onClick: this.openReportModal, typeSpec: 'Reports', id: 1 },
	    { name: translations['chatRoom'], onClick: this.openChatRoomModal, typeSpec: 'Chatroom', id: 2 },
	  ];

	  const columns = [
     
	    {
	      Header:  translations['Type'],
		  accessor: 'type',
	    },
	    {
	      Header: translations['name'],
	      accessor: 'name',
	    },
	    {
	      Header: translations['Description'],
	      accessor: 'description',

	    },
	    {
	      Header: translations['Format'],
	      accessor: 'format',
	    },
	   
	    {
	      Header: translations.view,
	      accessor: 'ID',
		  filterable: false,
		  maxWidth: 150,
	      Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-xs" onClick={() => this.openReportListing(row)} data-tip data-for={translations["Edit"]} ><span className="glyphicon glyphicon-edit"/>
				<ReactTooltip id='Edit'  type='warning'>
                           <span>Edit</span>
                              </ReactTooltip> </a>&nbsp;
								  {this.state.editId == row.value ?<span> <a href="javaScript:void('0');" className="btn btn-danger action-not-allow btn-xs" data-tip data-for={translations["Action Not Allowed"]} > <span className="glyphicon glyphicon-trash"/>
									</a> <ReactTooltip id='Action Not Allowed'  type='warning'>
                           <span>Action Not Allowed</span>
                              </ReactTooltip></span>:
                   <a href="javaScript:void('0');" onClick={() => this.deleteReportsList(row.value)} className="btn btn-danger btn-xs" data-tip data-for={translations["Delete"]}> <span className="glyphicon glyphicon-trash"/>														<ReactTooltip id='Delete'  type='warning'>
                           <span>Delete</span>
                          </ReactTooltip></a>}
	                              
														 
                              
                               
				                   
				
				</div>,

	    },
	  ];

	  return ( access ? (
	    <div>
				<ScrollToTop />
	      <div className="row orders-assets">
	        <div className="header-line">
	          <Loader loading={this.state.loading} />
	          <img src="/assets/img/admin/personnel_1.png" alt=""/>
	          <div className="header-text">
								<div className="col-md-12 filter-line text-center">
								{!this.state.chatRoomModalOpen && !this.state.reportModalOpen ?

											<div>
												<span className="specifi-text">{translations['reports']} &nbsp;</span>
												<div className="add-button">
													<DropDownButtonSpec key = "1" label={translations.Add} id="1" items={addReportAndChatRoom} />
												</div>
											</div>
										: <span className="specifi-text">{this.state.selectedSpecText !== '' ? (this.state.selectedSpecText ) : translations.reports} &nbsp;</span>
									} 
								</div>
						</div>
	          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
	        </div>
	         {this.state.chatRoomModalOpen ?
	          <ChatRoomModal editId={this.state.editId} payloadTypeId={this.state.payloadTypeId} payloadSpecType= {this.state.payloadSpecType} show={this.state.eoirModalOpen} onClose={this.closeReports} translations = {translations}/>
	          : null }
	       {/*  {this.state.reportModalOpen ?
	          <SargmtiModal editId={this.state.editId} payloadTypeId={this.state.payloadTypeId} payloadSpecType= {this.state.payloadSpecType} show={this.state.sargmtiModalOpen} onClose={this.closePayloadSpecifiction} translations = {translations}/>
	          : null }  */}
	      


	        <div className="col-md-12">
	          <ReactTable
	            data={allReports}
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

		</div> ) : null
	  );
	}
}

ReportsComponent.propTypes = {
  children: PropTypes.element,

};

export default ReportsComponent;
