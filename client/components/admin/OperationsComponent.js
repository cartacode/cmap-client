import React from 'react';
import PropTypes from 'prop-types';
import AddPersonnel from './personnel/AddPersonnelModal';
import Register from './personnel/Register';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { defaultFilter, formatDateTime, getConfirmation } from '../../util/helpers';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';


class OperationsComponent extends React.Component {

  constructor(props) {
    super(props);
   
  }


  componentDidMount(){
    this.props.fetchOperations();
  }

   

  /* render() {

    const {translations, match} = this.props;
    
    return (
      <div>
        <h2 style={{textAlign: "center"}}>Coming Soon</h2>
      </div>
    );
  } */







render() {

  const { translations } = this.props;
  const { allPersonnels } = this.props;

  let ses = JSON.parse(localStorage.getItem('session'));
  let roles = ses.UserRoles;
  let roles2 = JSON.parse(roles);
  
  

  const columns = [
    {
      Header: translations['OperationName'],
      accessor: 'OperationName',
    },
    {
      Header: translations['Unit'],
      accessor: 'Unit',
    },
    {
      Header: translations['Country'],
      accessor: 'Country',
    },
    {
      Header: translations['Region'],
      accessor: 'Region',
    },
    {
      Header: translations['ThreatGroup'],
      accessor: 'ThreatGroup',
    },
    
   
    {
      Header: translations.view,
      accessor: 'id',
      filterable: false,
      maxWidth: 150,
      Cell: row => <div>
        <a href="#" className="btn btn-primary btn-xs" onClick={() => this.openOperationForm(row.value)} data-tip data-for="Edit" ><span className="glyphicon glyphicon-edit"/>
          <ReactTooltip id="Edit" type="warning"> <span>{translations.edit}</span> </ReactTooltip> </a>
            &nbsp;
        {this.state.editId == row.value ?
          <span><a href="JavaScript:void('0');" className="btn btn-danger btn-xs action-not-allow" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
            <ReactTooltip id="Action Not Allowed" type="warning"><span>Action Not Allowed</span></ReactTooltip> </span>
          :
          <a href="javaScript:void('0');" onClick={() => this.deleteOperationInventory(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
            <ReactTooltip id="Delete" type="warning"><span>{translations.Delete}</span></ReactTooltip> </a>}
      </div>,
    },
   
  ];

  const sortOn = [
    {
      id: 'firstName',
      desc: true,
    },
  ];

  return ( 
    <div>
    
     
      <div className="row orders-assets">
       
        
        
        <div className="col-md-12">
          <ReactTable
            data={allPersonnels}
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
  </div> 
  );
}




}

OperationsComponent.propTypes = {
  children: PropTypes.element,

};

export default OperationsComponent;
