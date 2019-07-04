import PropTypes from 'prop-types';
import React from 'react';
import { adminUser } from '../../dictionary/auth';
import { NotificationManager } from 'react-notifications';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
import AddEquipmentInventory from './equipments/AddEquipmentInventory';

class EquipmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addEquipmentInventoryOpen: false,
      editId: '0',
    };
  }

  componentDidMount() {
    this.props.fetchEquipmentInventory();
  }

  addEquipmentInventory = () => {
    this.setState({
      addEquipmentInventoryOpen: !this.state.addEquipmentInventoryOpen,
    });
  };

  openEquipmentForm = (row) => {
    this.setState({
      editId: row,
      addEquipmentInventoryOpen: true,
    });
  };

  closeEquipmentForm = (actionType, actionSuccess) => {
    if (actionSuccess) {
      this.loadData(actionType);
      this.setState({
        editId: '0',
        addEquipmentInventoryOpen: false,
      });
    } else {
      this.notify(actionType);
    }
  }

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchEquipmentInventory();
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    if (value !== undefined && value !== '0') {
      this.setState({
        loading: true,
      });
      this.props.deleteEquipmentInventoryById(value).then(() => {
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
  deleteEquipmentInventory = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation, translations.Yes, translations.No, () => this.deleteLogic(value));
  }

  notify = (actionType) => {
    const { translations } = this.props;
    if (NoticeType.NOT_DELETE === actionType) {
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Equipment Inventory Title'], 5000);
    } else if (NoticeType.NOT_ADD === actionType) {
      NotificationManager.error(translations.AddUnSuccessfull, translations['Equipment Inventory Title'], 5000);
    } else if (NoticeType.NOT_UPDATE === actionType) {
      NotificationManager.error(translations.UpdateUnSuccessfull, translations['Equipment Inventory Title'], 5000);
    } else if (NoticeType.DELETE !== actionType) {
      if (this.state.editId && this.state.editId !== '0') {
        NotificationManager.success(translations.UpdatedSuccesfully, translations['Equipment Inventory Title'], 5000);
      } else {
        NotificationManager.success(translations.AddedSuccesfully, translations['Equipment Inventory Title'], 5000);
      }
    } else {
      NotificationManager.success(translations.DeletedSuccesfully, translations['Equipment Inventory Title'], 5000);
    }
  }

  render() {

    const { translations } = this.props;
    const { allEquipmentInventory } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const access = roles.some(v => adminUser.includes(v));

    const columns = [

      {
        Header: translations.Unit,
        accessor: 'unit',
      },
      {
        Header: translations.Equipment,
        accessor: 'equipmentDesc',
      },
      {
        Header: translations.Quantity,
        accessor: 'quantity',
      },
      {
        Header: translations.SerialNo,
        accessor: 'serialNumber',
      },
      {
        Header: translations.Remarks,
        accessor: 'remarks',
      },
      {
        Header: translations.view,
        accessor: 'id',
        filterable: false,
        maxWidth: 150,
        Cell: row => <div>
          <a href="#" className="btn btn-primary btn-xs" onClick={() => this.openEquipmentForm(row.value)} data-tip data-for="Edit" ><span className="glyphicon glyphicon-edit"/>
            <ReactTooltip id="Edit" type="warning"> <span>{translations.edit}</span> </ReactTooltip> </a>
              &nbsp;
          {this.state.editId == row.value ?
            <span><a href="JavaScript:void('0');" className="btn btn-danger btn-xs action-not-allow" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
              <ReactTooltip id="Action Not Allowed" type="warning"><span>Action Not Allowed</span></ReactTooltip> </span>
            :
            <a href="javaScript:void('0');" onClick={() => this.deleteEquipmentInventory(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
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
            {translations.inventory} &nbsp;
            {!this.state.addEquipmentInventoryOpen ?
              <span>
                <a className="btn btn-info btn-xs add-data" onClick={() => this.openEquipmentForm('0')}><i className="glyphicon glyphicon-plus" />&nbsp;{translations.Add}</a>
              </span>
              : ''}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
        </div>

        {this.state.addEquipmentInventoryOpen ?
          <AddEquipmentInventory editId={this.state.editId} onClose={this.closeEquipmentForm} translations={translations} />
          : null }

        <div className="col-md-12">
          <ReactTable data={allEquipmentInventory} columns={columns} className="-striped -highlight" filterable={true} defaultPageSize={TableDefaults.PAGE_SIZE} minRows={TableDefaults.MIN_ROWS} loading={this.props.isLoading} defaultFilterMethod={defaultFilter} />
        </div>
      </div>

    </div>) : null);
  }
}

EquipmentComponent.propTypes = {
  children: PropTypes.element,
};

export default EquipmentComponent;
