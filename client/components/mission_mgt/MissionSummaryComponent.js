import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {NoticeType, TableDefaults} from '../../dictionary/constants';
import { defaultFilter, getIntelStatusColor } from '../../util/helpers';
import Loader from '../reusable/Loader';
import MissionDetailModel from '../mission/MissionDetailModel';
import { NotificationManager } from 'react-notifications';

class MissionSummaryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPlatformInventoryOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
    }
  }

  componentDidMount() {
    this.props.fetchMissionSummary();
  }
  
  /* addPlatformInventory = () => {
    this.setState({
      addPlatformInventoryOpen: !this.state.addPlatformInventoryOpen,
    });
  } */

  /* openPlatformForm = (row) => {
    this.setState({
      editId: row,
      addPlatformInventoryOpen: true,
    });
  } */

 /*  closePlatformForm = (actionType) => {
    this.loadData(actionType);
    this.setState({
      editId: 0,
      addPlatformInventoryOpen: false,
    });
  } */

  // loadData = (actionType) => {
  //   this.notify(actionType);
	//   this.props.fetchMissionSummary();
  // }

/* 	deletePlatformInventory = (value) => {

	  if (value !== undefined && value !== '0') {
	    this.setState({
	      loading:true
	    });
	    this.props.deletePlatformInventoryById(value).then(() => {
	      this.setState({
	        loading:false
	      });
	      //this.setState({ editId: '0' });
	      //this.notify(NoticeType.DELETE);
	      //this.props.fetchPlatformInventory();
	      if(this.props.isDeleted) {
	        this.loadData(NoticeType.DELETE);
	      }
	      else{
	        this.notify(NoticeType.NOT_DELETE);
	      }
	    });
	  }
	} */

  // notify =(actionType)=>{
  //   const { translations } = this.props;
  //   if(NoticeType.NOT_DELETE === actionType) {
  //     NotificationManager.error(translations['DeleteUnSuccessfull'],translations['Platform Inventory Title'], 5000);
  //   }
  //   else if (NoticeType.DELETE != actionType) {
  //     if (this.state.editId !== undefined && this.state.editId !== '0') {
  //       NotificationManager.success(translations['UpdatedSuccesfully'], translations['Platform Inventory Title'], 5000);
  //     }else{
  //       NotificationManager.success(translations['AddedSuccesfully'], translations['Platform Inventory Title'], 5000);
  //     }
  //   }else{
  //     NotificationManager.success(translations['DeletedSuccesfully'],translations['Platform Inventory Title'], 5000);
  //   }
  // }




  handleChange(value) {
    //console.log(value);
  }

  getColor= (row)=> {
    return getIntelStatusColor(row.original.Status);
  }

  render() {

    const { translations } = this.props;
    const { allMissionSummary } = this.props;
    const columns = [

      {
        Header: translations["Tail#"],
        accessor: 'TailNumber',
        Cell: row => <div>
        <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
        <span>{row.value}</span>
      </div>,
        // filterMethod: (filter, row) =>
        //   row[filter.id].startsWith(filter.value),

        // sortMethod: (a, b) => {
        //   if (a.length === b.length) {
        //     return a > b ? 1 : -1;
        //   }
        //   return a.length > b.length ? 1 : -1;
        // }// String-based value accessors!
      },
      {
        Header: translations['Crew Team'],
        accessor: 'CrewTeam',
      },
      {
        Header: translations['Ped Team'],
        accessor: 'PedTeam',
      },
      {
        Header: translations['Start Date'],
        accessor: 'StartDate',
        
      },
      {
        Header: translations['End Date'],
        accessor: 'EndDate'
      },
      {
        Header: translations['StatusId'],
        accessor: 'StatusId'
      },
     
      {
        Header: translations['view'],
        accessor: 'MissionId',
        filterable: false,
      //   Cell: row => <div>
        //  <a href="#" className="btn btn-primary" onClick={() => this.openPlatformForm(row.value)} title="Edit" >
         //   <span className="glyphicon glyphicon-edit"/></a>&nbsp;  
        //  {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow" title="Action Not Allowed" > 
        //  <span className="glyphicon glyphicon-trash"/></a> :
       //     <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"> <span className="glyphicon glyphicon-trash"/></a>}
       // </div>,
        Cell: row => <div>
        <a href="#" className="btn btn-primary" onClick={() => this.openPlatformForm(row.value)} title="View" >
          <span className="glyphicon glyphicon-eye-open"/></a>  
        </div>,
      } 
    ];

    return (
      <div>
        <Loader loading={this.state.loading} />

        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {translations["platform"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          
          {this.state.addPlatformInventoryOpen ?
            <MissionDetailModel editId = {this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}
      
          <div className="col-md-12">
            <ReactTable
              data={allMissionSummary}
              columns={columns}
              className="-striped -highlight"              
              filterable={true}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
						  defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>

      </div>
    );
  }
}

MissionSummaryComponent.propTypes = {
  children: PropTypes.element,

};

export default MissionSummaryComponent;
