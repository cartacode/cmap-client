import PropTypes from 'prop-types';
import React from 'react';
import { adminUser } from '../../dictionary/auth';
import { NotificationManager } from 'react-notifications';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
import AddOperation from './operations/AddOperation';

class OperationsComponent extends React.Component {  constructor(props) {
    super(props);
    this.state = {
      addOperationOpen: false,
      editId: '0',
    };
  }

  componentDidMount() {
     this.props.fetchOperations();
  }

  addOperation = () => {
    this.setState({
      addOperationOpen: !this.state.addOperationOpen,
    });
  };

  openOperationForm = (row) => {
    this.setState({
      editId: row,
      addOperationOpen: true,
    });
  };

  closeOperationForm = (actionType, actionSuccess) => {
    if (actionSuccess) {
      console.log("39 GDDBD D DUHID ID IDH UID HUI DIU DIU DH ");
      this.loadData(actionType);
      this.setState({
        editId: '0',
        addOperationOpen: false,
      });
    } else {
      this.notify(actionType);
    }
  }

  loadData = (actionType) => {
    console.log("51    HSHAS SAKJ S HJAK HKJA SKJ ASKJ SAKJ SAKJ SA");
    console.log(actionType);
    this.notify(actionType);
    this.props.fetchOperations();
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    if (value !== undefined && value !== '0') {
      this.setState({
        loading: true,
      });
      this.props.deleteOperationById(value).then(() => {
        this.setState({
          loading: false,
        });
        if (this.props.isDeleted) {
          this.loadData(NoticeType.DELETE);
        } else {
          this.notify(NoticeType.NOT_DELETE);
        }
      });
    }
  }

  // will call when user click on Delete Button
  deleteOperation = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation, translations.Yes, translations.No, () => this.deleteLogic(value));
  }

  notify = (actionType) => {
    const { translations } = this.props;
    if (NoticeType.NOT_DELETE === actionType) {
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Operation Inventory Title'], 5000);
    } else if (NoticeType.NOT_ADD === actionType) {
      NotificationManager.error(translations.AddUnSuccessfull, translations['Operation Inventory Title'], 5000);
    } else if (NoticeType.NOT_UPDATE === actionType) {
      NotificationManager.error(translations.UpdateUnSuccessfull, translations['Operation Inventory Title'], 5000);
    } else if (NoticeType.DELETE !== actionType) {
      if (this.state.editId && this.state.editId !== '0') {
        NotificationManager.success(translations.UpdatedSuccesfully, translations['Operation Inventory Title'], 5000);
      } else {
        NotificationManager.success(translations.AddedSuccesfully, translations['Operation Inventory Title'], 5000);
      }
    } else {
      NotificationManager.success(translations.DeletedSuccesfully, translations['Operation Inventory Title'], 5000);
    }
  }

  render() {

    const { translations } = this.props;
    const { allOperations } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const access = roles.some(v => adminUser.includes(v));

    const columns = [

      {
        Header: translations['OperationName'],
        accessor: 'Operation.name',
      },
      {
        Header: translations['Unit'],
        accessor: 'Operation.unit',
      },
      {
        Header: translations['Country'],
        accessor: 'Operation.country',
      },
      {
        Header: translations['Region'],
        accessor: 'Operation.region',
      },
      {
        Header: translations['ThreatGroup'],
        accessor: 'Operation.threatGroup',
      },
      {
        Header: translations.view,
        accessor: 'Operation.id',
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
            <a href="javaScript:void('0');" onClick={() => this.deleteOperation(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
              <ReactTooltip id="Delete" type="warning"><span>{translations.Delete}</span></ReactTooltip> </a>}
        </div>,
      },
    ];

    return (access ? (<div>
      <Loader loading={this.state.loading} />
      <div className="row orders-assets">
        <div className="header-line">
          <img src="/assets/img/admin/personnel_1.png" alt="" />
          <div className="header-text">
            
            {!this.state.addOperationOpen ?
            
              <span>
                  {translations.summary} &nbsp;
                <a className="btn btn-info btn-xs add-data" onClick={() => this.openOperationForm('0')}><i className="glyphicon glyphicon-plus" />&nbsp;{translations.Add}</a>
              </span>:
               <span> {translations.Add} {translations.Operation}
               </span>
              }
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
        </div>

        {this.state.addOperationOpen ?
          <AddOperation editId={this.state.editId} onClose={this.closeOperationForm} translations={translations} />
          : null }

        <div className="col-md-12">
          <ReactTable data={allOperations} columns={columns} className="-striped -highlight" filterable={true} defaultPageSize={TableDefaults.PAGE_SIZE} minRows={TableDefaults.MIN_ROWS} loading={this.props.isLoading} defaultFilterMethod={defaultFilter} />
        </div>
      </div>

    </div>) : null);
  }
}

OperationsComponent.propTypes = {
  children: PropTypes.element,

};

export default OperationsComponent;
