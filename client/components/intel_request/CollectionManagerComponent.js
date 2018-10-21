import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import Map, { viewerSize } from 'components/reusable/Map';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FullHeaderLine from '../reusable/FullHeaderLine';
import { NoticeType, TableDefaults, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, getConfirmation, getMinRowsForTable } from '../../util/helpers';
import { viewerIdentifiers } from '../../map/viewer';
import { Link } from 'react-router-dom';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';


import { collectionManagerUser } from '../../dictionary/auth';

class CollectionManagerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
  }

  componentDidMount() {
    this.loadData();
  }


// This will get call when user click on Yes to Delete a Record
  deleteLogic(value){
    if (value !== undefined && value !== '0') {
      this.setState({loading: true});
      const statusId = IntelConstants.STATUS.DRC.id; // 'DRC'
      this.props.updateIntelStatus(value, statusId).then(() => {
        this.setState({loading: false});
        // this.setState({ editId: '0' });
        if(this.props.isDeleted){
        this.notify(NoticeType.DELETE);
        this.loadData();
      }
      else{
        this.notify(NoticeType.NOT_DELETE);
      }
      });
    }
  }

// will call when user click on Delete Button
  deleteApprovedIntelRequests = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
  };

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  moveToCollectionPlan = (row) => {
    const value = row.value;
    if (value !== undefined && value !== '0') {
	    this.props.moveToCollectionPlan(value).then(() => {
	      // this.setState({ editId: '0' });
	      this.notify(NoticeType.MOVE_TO_COLLECTION);
	      this.loadData();
      });
    }
  };

  moveToIntelRequest = (value) => {
    if (value !== undefined && value !== '0') {
      const statusId = IntelConstants.STATUS.AV.id;
      this.props.moveToIntelRequest(value, statusId).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.MOVE_TO_INTEL_REQUEST);
        this.loadData();
      });
    }
  };

  routeCollectionIntelRequest = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // const unitId = 25; // TODO Make it of loggend in users units id once login is implemented
    const statusId = IntelConstants.STATUS.APR.id;// 'APR';
    this.props.routeCollectionIntelRequest(unitId,statusId).then(() => {
      // this.notify(NoticeType.ROUTE_COLLECTION_INTEL_REQUEST);
      this.loadData();
    });
  };

  

  deleteCollectionPlan=(value)=>{
    if (value !== undefined && value !== '0') {
      this.props.deleteCollectionPlanById(value).then(() => {
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    }
  }

  loadData = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // fetch approved intel requests
    this.props.fetchApprovedIntelRequests(unitId, IntelConstants.STATUS.AV.abbreviation, false);
    // fetch collectiion plans 
    this.props.fetchCollectionPlans(unitId, IntelConstants.STATUS.APR.abbreviation);
  };

  notify = actionType => {
    const { translations } = this.props;
    /* if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD == actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else  */if (NoticeType.MOVE_TO_COLLECTION == actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_INTEL_REQUEST == actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.DELETE == actionType) {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
    }
    else if(NoticeType.NOT_DELETE === actionType){
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Intel Request Title'], 5000);
    }
  };

  render() {
    const { translations } = this.props;
    const { allApprovedIntelRequests } = this.props;
    const { allCollectionsPlan } = this.props;
    const editurl = '/intel-request/detail/';
    // let minRowsForTable = TableDefaults.MIN_ROWS;

    // if(allCollectionsPlan.length > TableDefaults.PAGE_SIZE_7 || allApprovedIntelRequests.length > TableDefaults.PAGE_SIZE_7 ) {
    //   minRowsForTable = TableDefaults.MIN_ROWS_7;
    // } else if(allCollectionsPlan.length > allApprovedIntelRequests.length) {
    //   minRowsForTable = allCollectionsPlan.length;
    // } else {
    //   minRowsForTable = allApprovedIntelRequests.length;
    // }

   
    let minRowsForTable = getMinRowsForTable(allCollectionsPlan.length, allApprovedIntelRequests.length);
    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => collectionManagerUser.includes(v));

    const intelRequestColumns = [
      {
        Header: translations['Request'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        // Cell: row => <div>
        //   <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
        //   <span>{row.value}</span>
        // </div>,
        Cell: row => ( 
          <div>
            {/* <a href = "javascript:void('0');" title = {row.original.Status}><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a>&nbsp; */}
            <Link to={`${editurl}${row.original.IntelRequestID}`} >{row.value}</Link>
            {/* <span><a href="Javascript: void('0');" className="hand-cursor"  title="Edit"><Link to={`${editurl}${row.original.IntelRequestID}`} >{row.value}</Link></a></span> */}
          </div>
        ),
      },
     
      {
        Header:translations['Supported unit'],
        accessor: 'COCOMText',
        maxWidth: 150,
      },
    /*   {
        Header: "Status",
        accessor: "Status"
      }, */
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: translations['Payload'],
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations['Armed'],
        accessor: 'Armed',
        maxWidth: 80,
        Cell: row => <div>
          <span>{row.original.Armed ? translations['YES'] :translations['NO']}</span>
        </div>,
      },
      {
        Header: translations['status'],
        accessor: 'Status',
        minWidth: 150,
      },
      {
        Header: translations.Actions,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            {/* <Link to={`${editurl}${row.value}`} className="text-success"  title="Edit" > <span className="glyphicon glyphicon-edit" /> </Link> */}&nbsp;
            <a href="Javascript: void('0');" className="btn btn-primary" data-tip data-for={translations["Move To Collection Plan"]} onClick={() => this.moveToCollectionPlan(row)} > <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            <ReactTooltip id='Move To Collection Plan' type='warning'>
                      <span>Move To Collection Plan</span>
           </ReactTooltip>
            &nbsp;
            <a href="JavaScript: void('0');" className="btn btn-danger" data-tip data-for={translations["Delete"]} onClick={() => this.deleteApprovedIntelRequests(row.value)} ><span className="glyphicon glyphicon-trash" /> </a>
            <ReactTooltip id='Delete' type='warning'>
                      <span>Delete</span>
                 </ReactTooltip>
          </div>
        ),
      },
    ];

    const collectionPlanColumns = [
      {
        Header: translations['Request'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        Cell: row => <div className = 'tooltip-custom'>
          {/* <a href = "javascript:void('0');" title = {row.original.Status}><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a> &nbsp; */}
          <Link to={`${editurl}${row.original.IntelRequestID}`} >{row.value}</Link>
        </div>,
      },
      // {
      //   Header: 'Asset',
      //   accessor: 'Asset',
      // },
      {
        Header: translations['Priority'],
        accessor: 'Priority',
      },
     /*  {
        Header: "Status",
        accessor: "Status"
      }, */
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: translations['Payload'],
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations['Armed'],
        accessor: 'Armed',
        maxWidth: 80,
        Cell: row => <div>
          <span>{row.original.Armed ? translations['YES'] : translations['NO']}</span>
        </div>,
      },
      {
        Header: translations['status'],
        accessor: 'Status',
        minWidth: 150,
      },
      /*   {
        Header: 'Command',
        accessor: 'COCOMText',
      }, */
      {
        Header: translations.Remove,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            <a href="Javascript:void('0');" className="btn btn-primary"  data-tip data-for={translations["Move To Intel Request"]} onClick={() => this.moveToIntelRequest(row.value)} > <span className="glyphicon glyphicon-circle-arrow-left" /> </a>
            <ReactTooltip id='Move To Intel Request' type='warning'>
                      <span>Add Collection Validation</span>
                 </ReactTooltip>
           
           
            &nbsp;
          </div>
        ),
      },
    ];
    
    return (
      <div>
        <div className="row personnel">
          <div className="col-md-12">

            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.IntelRequests} />
                <div >
                  <ReactTable
                    data={allApprovedIntelRequests}
                    columns={intelRequestColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}
                    
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    defaultFilterMethod={defaultFilter}
                  />
                </div>  
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.CollectionPlan} />
                <div >
                  <ReactTable
                    data={allCollectionsPlan}
                    columns={collectionPlanColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    minRows={minRowsForTable}                    
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
            <div className="row intel-request-table-margin-top">
              <div className="col-md-12 text-center">
                {/* <img className="line" src="/assets/img/admin/edit_up.png" alt=""/> */}
                { access ? 
                ( <div className="row action-buttons">
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className='highlighted-button' onClick={() => this.routeCollectionIntelRequest()} >
                  {translations["Route"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                </div>) : null
                }
                {/* <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row personnel">
          <div className="two-block">
            <Loader loading={this.state.loading} />
            <FullHeaderLine headerText={translations.CollectionMap} />
            {/* <Map size="100" viewerId={viewerIdentifiers.collectionPlan} /> */}
            {/* <img
              className="photo"
              src="/assets/img/intel_request/request/request_pic.png"
              alt=""
            /> */}
          </div>

          {/* <div className="col-md-6 two-block">

          </div> */}

          {/* <div className="col-md-6">

          </div> */}
        </div>
      </div>
    );
  }
}

CollectionManagerComponent.propTypes = {
  children: PropTypes.element,
};

export default CollectionManagerComponent;
