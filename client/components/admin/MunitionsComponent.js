import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import AddMunitionsInventory from './munitions/AddMunitionsInventory';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import ReactTooltip  from 'react-tooltip';

import { superAdmin, adminUser } from '../../dictionary/auth';

class MunitionsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addMunitionsInventoryOpen:false,
      rocketModalOpen: false,
      gunModalOpen: false,      
      serialVal:'',
      nameVal:'',
      form : {
        type: 'Test'
      },
      editId: '0',
      loading: false

    }
  }

  componentDidMount() {
    this.props.fetchMunitionInventory();
  }

openMunitionsForm = (row) => {
  this.setState({
    editId: row,
    addMunitionsInventoryOpen: true,
  });
}

closeMunitionsForm = (actionType,actionSuccess) => {
  if(actionSuccess) {
    this.loadData(actionType);

  /* this.notify(actionType);
  this.props.fetchMunitionInventory(); */
  this.setState({
    editId: '0',
    addMunitionsInventoryOpen: false,
  });
}
else {
  this.notify(actionType);
}}

loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchMunitionInventory();}

// This will get call when user click on Yes to Delete a Record
deleteLogic(value){
  if (value !== undefined && value !== '0') {
    this.setState({loading: true});
    this.props.deleteMunitionInventoryById(value).then(() => {
      this.setState({loading: false});

      //this.setState({ editId: '0' });
      if(this.props.isDeleted){
        this.props.fetchMunitionInventory();
        this.notify(NoticeType.DELETE, '');
      }
      else{
        this.notify(NoticeType.NOT_DELETE, '');

      }
    });
  }
}

// will call when user click on Delete Button
deleteMunitions = (value) => {
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
  if(NoticeType.NOT_DELETE === actionType){
    NotificationManager.error(translations['DeleteUnSuccessfull'],translations['Munition Inventory Title'], 5000);
  }
  else if (NoticeType.NOT_ADD === actionType) {
    NotificationManager.error(translations.AddUnSuccessfull, translations['Munition Inventory Title'], 5000);
  }
  else if (NoticeType.NOT_UPDATE === actionType) {
    NotificationManager.error(translations.UpdateUnSuccessfull, translations['Munition Inventory Title'], 5000);
  } 
  else if ('DELETE' != actionType) {
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['UpdatedSuccesfully'], translations['Munition Inventory Title'], 5000);
    }else{
      NotificationManager.success(translations['AddedSuccesfully'], translations['Munition Inventory Title'], 5000);
    }
  }
  else{
    NotificationManager.success(translations['DeletedSuccesfully'],translations['Munition Inventory Title'], 5000);
  }
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

    const {translations} = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => adminUser.includes(v));

    const munitions = [
      {name:translations['Missile'], onClick:this.missileModal},
      {name:translations['Rocket'], onClick:this.rocketModal},
      {name:translations['Guns'], onClick:this.gunModal}
    ];

    const { allMunitionInventory } = this.props;

    const columns = [
      {
        Header: translations["type"],
        accessor: 'type',
      },
      {
        Header: translations["Manufacturer"],
        accessor: 'manufacturer',
      },
	   {
        Header: translations['Name'],
        accessor: 'name',
	   },
      {
        Header: translations['serial#'],
        accessor: 'serialNumber',
      },
      {
        Header: translations["Branch"],
        accessor: 'branch',
        maxWidth: 150,
      },
      {
        Header: translations['cocom'],
        accessor: 'COCOM',
        maxWidth: 150,
      },
      {
        Header: translations['Owning Unit'],
        accessor: 'owningUnit',
      },
	    {
        Header: translations['Location'],
        accessor: 'location',
	    },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        maxWidth: 150,
        Cell: row => <div><a href="#" className="btn btn-primary btn-xs" onClick={() => this.openMunitionsForm(row.value)} data-tip data-for="Edit" ><span className="glyphicon glyphicon-edit"/>
                             <ReactTooltip id='Edit' type='warning'>
                                 <span>Edit</span>
                             </ReactTooltip></a>
                               &nbsp; 
          {this.state.editId == row.value ?<span> <a href="javaScript:void('0');" className="btn btn-danger action-not-allow btn-xs" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a> 
                              <ReactTooltip id='Action Not Allowed' type='warning'>
                                     <span>Action Not Allowed</span>
                              </ReactTooltip></span>:
            <a href="javaScript:void('0');" onClick={() => this.deleteMunitions(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
                              <ReactTooltip id='Delete'  type='warning'>
                                  <span>Delete</span>
                             </ReactTooltip></a>}
            
              
        </div>,

      }
    ];

    return ( access ? (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <Loader loading={this.state.loading} />
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations.inventory} &nbsp;
              {!this.state.addMunitionsInventoryOpen ?
	              <span>
	                <a className="btn btn-info btn-xs add-data" onClick={() => this.openMunitionsForm('0')}><i className="glyphicon glyphicon-plus"/>&nbsp;{translations.Add}</a>
	              </span>
	              : '' }
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          {/* { !this.state.addMunitionsInventoryOpen ?
            <div className="col-md-12 filter-line">
              <div className="add-button">
                <button className="ccir-button" onClick={() => this.openMunitionsForm('0')} >{translations["Add Munition"]}</button>
              </div>
            </div>  : null} */}
          { this.state.addMunitionsInventoryOpen ?
            <AddMunitionsInventory onClose={this.closeMunitionsForm} editId={this.state.editId} translations = {translations}/>
            : null
          }

          <div className="col-md-12">
            <ReactTable
              data={allMunitionInventory}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
              className="-striped -highlight"
              filterable={true}
						  defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
        
    </div> ) : null
    );
  }
}

MunitionsComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsComponent;
