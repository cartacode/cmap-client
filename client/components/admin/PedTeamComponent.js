import React from 'react';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { defaultFilter, formatDateTime, getConfirmation } from '../../util/helpers';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';

import { superAdmin, adminUser } from '../../dictionary/auth';
import ScrollToTop from '../reusable/ScrollToTop';


class PedTeamComponent extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPedTeamModalOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
      editForm:false,
    };
  }

  componentDidMount() {
    this.props.fetchPedTeams();
  }





stopupdate = () => 
  {
    this.setState({editForm:false});
  }

// This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
	 /*  if (value !== undefined && value !== '0') {
      // Start Loader
      this.setState({loading:true});
	    this.props.deletePedTeamById(value).then(() => {
        //this.setState({ editId: '0' });
        // End Loader
        this.setState({loading:false});
        if(this.props.isDeleted){
          this.loadData(NoticeType.DELETE);
        }
        else{
          // Display Error Message
          this.notify(NoticeType.NOT_DELETE);
        }
        //this.props.fetchPersonnels();
        //this.notify('DELETE');
	    });
    } */
  }
  
  // will call when user click on Delete Button
  deletePedTeam = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
  }

render() {

  const { translations } = this.props;
  const { allPedTeams } = this.props;
  let ses = JSON.parse(localStorage.getItem('session'));
  let roles = ses.UserRoles;
  let roles2 = JSON.parse(roles);
  let access = roles2.some(v => adminUser.includes(v));

  const columns = [
    {
      Header: translations['Unit'],
      accessor: 'unit',
    },
    {
      Header: translations['Team'],
      accessor: 'team',
    },
    {
      Header: translations['Type'],
      accessor: 'unitTypeDesc',
    },
    {
      Header: translations['Location'],
      accessor: 'LocationName',
    },
    {
      Header: translations['Number of Personnel'],
      accessor: 'numPersonnel',
    },
    
    {
      Header: translations['Remarks'],
      accessor: 'remarks',

    },
    
    {
      Header: translations['view'],
      accessor: 'ID',
      filterable: false,
      Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-xs"   data-tip data-for="Edit"><span className="glyphicon glyphicon-edit"/>
                                  <ReactTooltip id='Edit'  type='warning'>
                                       <span>Edit</span>
                                  </ReactTooltip> </a>
                                      &nbsp; 
   {this.state.editId == row.value ? <span><a href="javaScript:void('0');" className="btn btn-danger btn-xs action-not-allow"  data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
                              <ReactTooltip id='Action Not Allowed'  type='warning'> 
                                 <span>Action Not Allowed</span>
                              </ReactTooltip> 
                                    </span> :
   <a href="javaScript:void('0');" onClick={() => this.deletePedTeam(row.value)} className="btn btn-danger btn-xs"  data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
                                  <ReactTooltip id='Delete'  type='warning'>
                                    <span>Delete</span>
                                  </ReactTooltip> </a>}
                                         </div>,
    },
  ];

 

  return (access ? (<div>
    <Loader loading={this.state.loading} />
    <div className="row orders-assets">
      <div className="header-line">
        <img src="/assets/img/admin/personnel_1.png" alt="" />
        <div className="header-text">
        {translations.summary} &nbsp;
        
        </div>
        <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
      </div>

   

      <div className="col-md-12">
        <ReactTable data={allPedTeams} columns={columns} className="-striped -highlight" filterable={true} defaultPageSize={TableDefaults.PAGE_SIZE} minRows={TableDefaults.MIN_ROWS} loading={this.props.isLoading} defaultFilterMethod={defaultFilter} />
      </div>
    </div>

  </div>) : null);
}
}

PedTeamComponent.propTypes = {
  children: PropTypes.element,

};

export default PedTeamComponent;
