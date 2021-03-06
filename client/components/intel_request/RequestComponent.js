import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { defaultFilter, formatDateTime, getIntelStatusColor, getConfirmation } from '../../util/helpers';
import { TableDefaults, IntelConstants } from '../../dictionary/constants';
import { NotificationManager } from 'react-notifications';
import Loader from '../reusable/Loader';
import AddCollectionValidationModal from '../reusable/AddCollectionValidationModal';
import { collectionManagerUser, adminUser, superAdmin, intelCustomer } from '../../dictionary/auth';
import ReactTooltip from 'react-tooltip';

class RequestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
      serialVal: '',
      nameVal: '',
      form: {
        type: 'Test',
      },
      loading: false,
      modalOpen: false,
      IntelRequestID: null,
      toRequestForm: false,

    };

    moment.locale('en');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.fetchIntelRequests();
  }

  openAddCollectionValidationModal = (row) => {
    const IntelRequestID = row.original.IntelRequestID;
    this.setState({
      modalOpen: true,
      IntelRequestID,
    });
  }

  saveCollectionValidationModal = (intelRequestId, intelRequest) => {
    this.setState({ loading: true });
    this.props.updateIntelRequestWithCollectionManager(intelRequestId, intelRequest).then(() => {
      this.closeCollectionValidationModal();
      this.setState({ loading: false });
      this.loadData();
      this.notify();
    });               
  }

  notify = () => {
    const { translations } = this.props;
    NotificationManager.success('', 'Collection Validation is  added successfully.', 5000);

  };

  closeCollectionValidationModal = () => {
    this.setState({
      modalOpen: false,
      IntelRequestID: null,
    });
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    const { translations } = this.props;
    this.setState({ loading: true });

    this.props.deleteIntelRequestById(value).then(() => {
      this.setState({ loading: false });
      if(this.props.isDeleted) {
        NotificationManager.success(translations.DeletedSuccesfully, translations['Intel Request Title'], 5000);
        this.props.fetchIntelRequests();
      } else{
        NotificationManager.error(translations.DeleteUnSuccessfull, translations['Intel Request Title'], 5000);
      }
    });
  }

  // will call when user click on Delete Button
  deleteIntelRequestById =(value)=>{
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation,
      translations.Yes,
      translations.No,
      () => this.deleteLogic(value)
    );
  }
  // Copy Intel Request for resubmission
  copyIntel = (value) => {
    this.props.resubmitIntelRequest(value).then(() => {
      this.setState({
        toRequestForm: true,
      });
    });
  }

  // get status color
  getColor= (row)=> {
    return getIntelStatusColor(row.original.Abbreviation);
  }
  render() {

    const requstFomrUrl = '/intel-request/detail/';

    const { translations } = this.props;

    const { allRequests } = this.props;

    const { match } = this.props;

    const addurl = match.url.replace('/request', '/request-form');
    const editurl = match.url.replace('/request', '/detail/');


    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    // const isCollectionMgr = roles.some(v => collectionManagerUser.includes(v));
    const isIntelCustomer = roles.some(v => intelCustomer.includes(v));
    const isSuperAdmin = roles.some(v => superAdmin.includes(v));
    const canAddIntel = (isSuperAdmin || isIntelCustomer);

    const columns = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 70,
        Cell: row => <div>
          {/* <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp; */}
          <Link to={`${editurl}${row.original.IntelRequestID}`}> <span>{row.value}</span></Link>
        </div>,
      },
      {
        Header: translations.status,
        id: 'StatusId',
        accessor: 'Status',
      },
      {
        Header: translations['Named Operation'],
        accessor: 'CCIRPIRName',
      },
      {
        Header: translations['Supported unit'],
        accessor: 'COCOMText',
        maxWidth: 120,
      },
      {
        Header: translations.MissionType,
        accessor: 'MissionTypeText',
      },
      {
        Header: translations.payload,
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations.originator,
        accessor: 'OrginatorPersonnelID',
        Cell: row => <div>{row.original.OriginatorFirstName} {row.original.OriginatorLastName} </div>,
      },
      {
        Header: translations.date,
        id: 'ActiveDateTimeStart',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.ActiveDateTimeStart);
        },
      },
      {
        Header: translations['Best Collection Time'],
        id: 'BestCollectionTime',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 180,
        Cell: row => <div className="actions-btn">  <Link to={`${editurl}${row.value}`} className="edit-btn" data-tip data-for="edit-btn"><span className="glyphicon glyphicon-edit"/></Link>
        <ReactTooltip id='edit-btn'  type='warning'>
                     <span>Edit</span>
              </ReactTooltip>
          { (row.original.MissionId !== null) ? '' :
          
            <span><a href="javaScript:void('0');" className="delete-btn" data-tip data-for="delete-btn" > <span className="glyphicon glyphicon-trash" onClick={() => this.deleteIntelRequestById(row.value)}/></a>
                 <ReactTooltip id='delete-btn'  type='warning'>
                     <span>Delete</span>
                  </ReactTooltip>
                     
              { (canAddIntel && row.original.Abbreviation === IntelConstants.STATUS.AV.abbreviation) ? <a href="javaScript:void('0');" className="coll-valid-btn" data-tip data-for="CollectionValidation" onClick={() => this.openAddCollectionValidationModal(row)}> <span className="glyphicon glyphicon-transfer"/></a> : '' }
              <ReactTooltip id='CollectionValidation'  type='warning'>
                     <span>Add Collection Validation</span>
              </ReactTooltip>
            </span>
          
          }

          <a href="javaScript:void('0');" data-tip="" data-for="resubmit-btn" className="resubmit-btn"> <span className="glyphicon glyphicon-retweet" onClick={() => this.copyIntel(row.value)}/></a>
          <ReactTooltip id="resubmit-btn" type="warning">
            <span>Resubmit Intel</span>
          </ReactTooltip>
        </div>,
      },
    ];

    return (
      <div>
        {this.state.toRequestForm ? <Redirect to={`${requstFomrUrl}${this.props.oneIntelCopy.IntelRequestID}`} /> : null }

          {this.state.modalOpen ?
          <AddCollectionValidationModal show = {this.state.modalOpen} onClose={this.closeCollectionValidationModal} 
            IntelRequestID = { this.state.IntelRequestID }
            save = {this.saveCollectionValidationModal} translations = {translations}/>
          : ''}
        <div className="row orders-assets">
          <div className="header-line">
            <Loader loading={this.state.loading} />
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations.summary} &nbsp;
              <Link to={ addurl } className="btn btn-info btn-xs add-data" ><i className="glyphicon glyphicon-plus"/>&nbsp;{translations.Add}</Link>
                  


            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">

            {/* <Link to={ itemurl } activeClassName="btn btn-warning">{translations['New request'}</Link> */}
            {/* <Link to={ addurl } className="btn btn-warning">New Request</Link> */}

            {/*             <NavLink to={itemurl} className="submenu" activeClassName="active-submenu-item">
              <div className="add-button">
                <button className="bt btn-warning">New Request</button>
              </div>
            </NavLink>
 */}
          </div>
          <div className="col-md-12" id="intel-request" >
            <ReactTable
              data={allRequests}
              loading={this.props.isLoading}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE_7}
						  minRows={TableDefaults.MIN_ROWS}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}
              pageSizeOptions={[7, 10, 20, 25, 50, 100]}
            />
          </div>
        </div>
      </div>
    );
  }
}

RequestComponent.propTypes = {
  children: PropTypes.element,

};

export default RequestComponent;
