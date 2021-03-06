import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import BaseModal from './location/BaseModal';
import { defaultFilter, getConfirmation  } from '../../util/helpers';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import FilterDropDown from '../reusable/FilterDropdown';
import ReactTooltip from 'react-tooltip'; 

import { superAdmin, adminUser, intelCustomer  } from '../../dictionary/auth';

class LocationComponent
  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      filter: [],
      baseModalOpen: false,
      baseshow: false,
      editId: "0",
      editForm:false,
      loading:false,
      locationTypeId: 1,
    };
  }

  componentWillMount() {
    this.props.fetchLocations(this.state.locationTypeId);
  }

  baseForm = () => {
    this.setState({
      baseshow: true
    });
  };

  openBaseModalFrom = row => {
    this.setState({
      editId: row,
      baseModalOpen: true
    });
  };

  /* closeBaseModalFrom = () => {
    this.notify();
    this.props.fetchLocations();
    this.setState({
      editId: "0",
      baseModalOpen: false
    });
  }; */

  // @param: actionType - this is type of action like ADD, NOT_ADD etc.
// @param: actionSuccess - true/false for action success or not
// @param: msg: - text to display the Success/error message
closeBaseModalFrom = (actionType, actionSuccess) => {
  if(actionSuccess) {
    this.loadData(actionType);
    this.setState({
      editId: '0',
      baseModalOpen: false,
    });
  }else {
    this.notify(actionType);
  }
}

loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchLocations();
}

  stopupdate = () => 
  {
    this.setState({editForm:false});
  }

  // function will call to refresh data and Display Success/Error Message
  refreshTableAndDisplayMessage = (dataMessage) =>{
    this.props.fetchLocations();
    this.notify(dataMessage);
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value){
    if (value !== undefined && value !== '0') {
      // Start Loader
      this.setState({loading:true});
      this.props.deleteLocationById(value).then(() => {
        //this.setState({ editId: '0' });
        if(this.props.isDeleted){
          // End Loader
          this.setState({loading:false});
          this.refreshTableAndDisplayMessage (NoticeType.DELETE);
        }
        else{
          // End Loader
          this.setState({loading:false});
          this.notify(NoticeType.NOT_DELETE);
        }
      });
    }
  }

// will call when user click on Delete Button
  deleteLocations = (value) => {
   const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
  }
  
  notify =(actionType)=>{
    const { translations } = this.props;
    if (NoticeType.DELETE != actionType) { 
      if(NoticeType.NOT_DELETE === actionType){
        NotificationManager.error(translations['DeleteUnSuccessfull'], translations['Location Title'], 5000);
      }
      else if (NoticeType.NOT_ADD === actionType) {
        NotificationManager.error(translations.AddUnSuccessfull, translations['Location Title'], 5000);
      }
      else if (NoticeType.NOT_UPDATE === actionType) {
        NotificationManager.error(translations.UpdateUnSuccessfull, translations['Location Title'], 5000);
      }
      else if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success(translations['UpdatedSuccesfully'], translations['Location Title'], 5000);
      }else{
        NotificationManager.success(translations['AddedSuccesfully'], translations['Location Title'], 5000);
      }
    }
    else{
      NotificationManager.success(translations['DeletedSuccesfully'],translations['Location Title'], 5000);
    }
  }


  handleFilterData = (name, value) => {
    if(value !== '0' && value !== 0 ) {

      this.setState({
        [name]: value,
      });
      this.props.fetchLocations(value);
    }
  

  }

  render() {
    const { translations } = this.props;
    // const locations = [
    //   { name: translations["Base"], onClick: this.baseModal },
    //   { name: translations["NAI"], onClick: this.naiModal },
    //   { name: translations["POI"], onClick: this.poiModal }
    // ];
    const { allLocations } = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    // Admin can see All Tabs And IntelCustomer can see Location Tab
    let access = roles2.some(v => adminUser.includes(v) || intelCustomer.includes(v));

    const columns = [
      {
        Header: translations.type,
        accessor: 'type',
        maxWidth: 150,
        Filter: ({ filter, onChange }) =>
          <FilterDropDown name="locationTypeId" defaultValue={this.state.locationTypeId} dropdownData={this.handleFilterData} dropdownDataUrl="LocationCategory"/>,
      },
      {
        Header: translations.Name,
        accessor: "name"
      },
      {
        Header: translations["COCOM"],
        accessor: "COCOM",
        maxWidth: 150,
      },
      {
        Header: translations["Region"],
        accessor: "region"
      },
      {
        Header: translations["Country"],
        accessor: "country"
      },
      {
        Header: translations["City/Town"],
        accessor: "city"
      },
      {
        Header: translations["MGRS"],
        accessor: "MGRS",
        maxWidth: 100,
      },
      {
        Header: translations["LocationID"],
        accessor: 'locationID',
      },
      {
        Header: translations["view"],
        accessor: "id",
        filterable: false,
        maxWidth: 150,
        // Cell: row => (
        //   <div><span className="number change-cursor-to-pointer">
        //     <img
        //       src="/assets/img/general/pen_icon.png"
        //       onClick={() => this.openBaseModalFrom(row.row.id)}
        //     />
        //   </span>
        //   <span className='number change-cursor-to-pointer'>
        //     <img src="/assets/img/general/trash_icon.png" onClick={() => this.deleteLocations(row.value)} />
        //   </span>
        //   </div>
        // ) // Custom cell components!
        Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-xs" onClick={() => this.openBaseModalFrom(row.row.id)} data-tip data-for={translations["Edit"]} ><span className="glyphicon glyphicon-edit"/>
                     <ReactTooltip id='Edit'  type='warning'>
                           <span>Edit</span>
                              </ReactTooltip>  </a>
        &nbsp; 
          {this.state.editId == row.value ?<span> <a href="javaScript:void('0');" className="btn btn-xs btn-danger action-not-allow" data-tip data-for={translations["Action Not Allowed"]} > <span className="glyphicon glyphicon-trash"/></a>
                           <ReactTooltip id='Action Not Allowed'  type='warning'>
                                 <span>Action Not Allowed</span>
                              </ReactTooltip>  </span>:
           <a href="javaScript:void('0');" onClick={() => this.deleteLocations(row.value)} className="btn btn-danger btn-xs" data-tip data-for={translations["Delete"]}> <span className="glyphicon glyphicon-trash"/>
           <ReactTooltip id='Delete'  type='warning'>
                                 <span>Delete</span>
                              </ReactTooltip></a>}
                            
                                
        </div>,

      }
    ];


    

    return ( access ? (
      <div>
        <div className="row orders-assets">
          <Loader loading={this.state.loading} />
          <div className="row" />
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {!this.state.baseModalOpen ?
                <span>
                  {translations.summary} &nbsp;
                  <a className="btn btn-info btn-xs add-data" onClick={() => this.openBaseModalFrom('0')}><i className="glyphicon glyphicon-plus"/>&nbsp;{translations.Add}</a>
                </span>
                : translations.form }
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" />
          </div>
          
          <div className="filter-line Location-filter">
            
            {/* {!this.state.baseModalOpen ?
              <div className="col-md-3 select-filter">
                <MissionMgtDropDown name="locationTypeId" defaultValue={this.state.locationTypeId} label={translations.LocationType} data={this.handleFilterData} dropdownDataUrl="LocationCategory" />
              </div>:null} */}
            {/* {!this.state.baseModalOpen ?  
              
              <div className="add-button">
                <button
                  className="ccir-button"
                  onClick={() => this.openBaseModalFrom("0")}
                >
                  {translations["Add Location"]}
                </button>
              </div> : null } */}
          
          </div> 
          {this.state.baseModalOpen ? (
            <BaseModal
              editId={this.state.editId}
              show={this.state.baseModalOpen}
              onClose={this.closeBaseModalFrom}
              translations={translations}
              stopupdate={this.stopupdate}
            />
          ) : null}
          {/*   <NotificationContainer />  */}
          <br />
          <div className="row personnel">
            <div className="col-md-12">
              <ReactTable
                data={allLocations}
                columns={columns}
                defaultPageSize={TableDefaults.PAGE_SIZE}
						    minRows={TableDefaults.MIN_ROWS}
                className="-striped -highlight"
                loading={this.props.isLoading}
                filterable={true}
                defaultFilterMethod={defaultFilter}
              />
            </div>
          </div>
        </div>
    </div> ) : null
    );
  }
}

LocationComponent.propTypes = {
  children: PropTypes.element
};

export default LocationComponent;
