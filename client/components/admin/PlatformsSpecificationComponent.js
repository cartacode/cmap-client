import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddPlatform from './platform/AddPlatformModal';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';

import { superAdmin, adminUser } from '../../dictionary/auth';

class PlatformsSpecificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPlatformModalOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
      loading: false,
    };
  }

  componentDidMount() {
    this.props.fetchPlatforms();
  }

  addPlatformModal = () => {
    this.setState({
      addPlatformModalOpen: !this.state.addPlatformModalOpen,
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
    });
  }

  openPlatformForm = (row) => {
    this.setState({
      editId: row,
      addPlatformModalOpen: true,
    });
  }

  /* closePlatformForm = (actionType) => {
    this.notify(actionType);
    this.props.fetchPlatforms();
    this.setState({
      editId: 0,
      addPlatformModalOpen: false,
    });
  } */

// @param: actionType - this is type of action like ADD, NOT_ADD etc.
// @param: actionSuccess - true/false for action success or not
// @param: msg: - text to display the Success/error message
closePlatformForm = (actionType, actionSuccess, msg) => {
  if(actionSuccess) {
    this.loadData(actionType);
    this.setState({
      editId: '0',
      addPlatformModalOpen: false,
    });
  }else {
    this.notify(actionType, msg);
  }
}

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchPlatforms();
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    if (value !== undefined && value !== '0') {
	    this.setState({
	      loading: true,
	    });
	    this.props.deletePlatformById(value).then((response) => {

	      this.setState({
	        loading: false,
	      });
	      if(this.props.isDeleted) {
	        this.closePlatformForm(NoticeType.DELETE, this.props.isDeleted);
	      } else{
	        this.notify(NoticeType.NOT_DELETE);

	      }

	    }).catch((err) => {

	    });

    }
  }

  // will call when user click on Delete Button
	deletePayload = (value) => {

	  const { translations } = this.props;
	  // Get Confirm user wish to Delete Yes/No
	  getConfirmation(translations.DeleteConfirmation,
	    translations.Yes,
	    translations.No,
	    () => this.deleteLogic(value)
	  );
	}

  notify =(actionType, msg)=>{
    const { translations } = this.props;

    if(NoticeType.NOT_DELETE === actionType) {
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Platform Specification Title'], 5000);
    }
     else if (NoticeType.DELETE != actionType) {

      if (NoticeType.NOT_UPDATE === actionType) {
        NotificationManager.error(msg, translations['Platform Specification Title'], 5000);
      }
      else if (NoticeType.NOT_ADD === actionType) {
        NotificationManager.error(msg, translations['Platform Specification Title'], 5000);
      }
      else if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success(translations.UpdatedSuccesfully, translations['Platform Specification Title'], 5000);
      }else{
        NotificationManager.success(translations.AddedSuccesfully, translations['Platform Specification Title'], 5000);
      }
    }else{
      NotificationManager.success(translations.DeletedSuccesfully, translations['Platform Specification Title'], 5000);
    }

  }


  // renderItems(optionItem) {
  //   let items = [{"label": "-Select Item-", "value": 0}];
  //   optionItem.map((item, i) => {
  //       items.push({"label": item.description, "value": i});
  //   });
  //   return items.map(function(data, key){
  //       if(data.label == "-Select Item-"){
  //         return ( <option key={key} value=""> {data.label} </option>) ;
  //       } else {
  //         return (<option key={key} value={data.label}>{data.label}</option> );
  //       }
  //   })
  // }

  handleChange(value) {
    console.log(value);
  }

  render() {

    const { translations } = this.props;
    const { allPlatforms } = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => adminUser.includes(v));

    const columns = [

      {
        Header: translations['Platform Name'],
        accessor: 'name',
      },
      {
        Header: translations.Manufacturer,
        accessor: 'manufacturer',
      },
      {
        Header: translations.Category,
        accessor: 'category',
      },
      {
        Header: translations['Mission Role'],
        accessor: 'role',
      },
      {
        Header: translations['Payload Cap(lbs.)'],
        accessor: 'payloadCapacity',
        maxWidth: 150,
      },
      {
        Header: translations['Armament Cap(lbs.)'],
        accessor: 'armamentCapacity',
        maxWidth: 170,
      },
      {
        Header: translations.view,
        accessor: 'ID',
        filterable: false,
        maxWidth: 150,
        Cell: row => <div><a href="#" className="btn btn-primary btn-xs" onClick={() => this.openPlatformForm(row.value)} data-tip data-for="Edit"><span className="glyphicon glyphicon-edit"/>
        <ReactTooltip id='Edit'  type='warning'>
                           <span>Edit</span>
                              </ReactTooltip> </a>
        &nbsp;
          {this.state.editId == row.value ? <span><a href="javaScript:void('0');" className="btn btn-danger action-not-allow btn-xs" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
                             <ReactTooltip id='Action Not Allowed'  type='warning'>
                                    <span>Action Not Allowed</span>
                              </ReactTooltip> </span> :
            <a href="javaScript:void('0');" onClick={() => this.deletePayload(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
                          <ReactTooltip id='Delete'  type='warning'>
                              <span>Delete</span>
                          </ReactTooltip>  </a>}
                         
                              
                              

        </div>,

      },
    ];

    return ( access ? (
      <div>
        <Loader loading={this.state.loading} />
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {translations.Specifications} &nbsp;
              {!this.state.addPlatformModalOpen ?
                <span>
                  {/* {translations.summary} &nbsp; */}
                  <a className="btn btn-info btn-xs add-data" onClick={() => this.openPlatformForm('0')}><i className="glyphicon glyphicon-plus"/>&nbsp;{translations.Add}</a>
                </span>
                : '' }
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>

          {/* {!this.state.addPlatformModalOpen ? <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.openPlatformForm('0')} >{translations['Add']}</button>
            </div>
          </div> : null} */}

          {this.state.addPlatformModalOpen ?
            <AddPlatform editId={this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}


          <div className="col-md-12">
            <ReactTable
              data={allPlatforms}
              columns={columns}
              className="-striped -highlight"
              loading={this.props.isLoading}
              filterable={true}
              defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.MIN_ROWS}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>

        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/> */}
    </div> ) : null
    );
  }
}

PlatformsSpecificationComponent.propTypes = {
  children: PropTypes.element,

};

export default PlatformsSpecificationComponent;
