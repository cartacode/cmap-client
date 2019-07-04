import PropTypes from 'prop-types';
import React from 'react';
import { adminUser } from '../../dictionary/auth';
import { NotificationManager } from 'react-notifications';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
// import AddCcir from './equipments/AddCcir';

class CcirComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCcirOpen: false,
      editId: '0',
    };
  }

  componentDidMount() {
    this.props.fetchCcir();
  }

  addCcir = () => {
    this.setState({
      addCcirOpen: !this.state.addCcirOpen,
    });
  };

  openCcirForm = (row) => {
    this.setState({
      editId: row,
      addCcirOpen: true,
    });
  };

  closeCcirForm = (actionType, actionSuccess) => {
    if (actionSuccess) {
      this.loadData(actionType);
      this.setState({
        editId: '0',
        addCcirOpen: false,
      });
    } else {
      this.notify(actionType);
    }
  }

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchCcir();
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    if (value !== undefined && value !== '0') {
      this.setState({
        loading: true,
      });
      this.props.deleteCcirById(value).then(() => {
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
  deleteCcir = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation, translations.Yes, translations.No, () => this.deleteLogic(value));
  }

  notify = (actionType) => {
    const { translations } = this.props;
    if (NoticeType.NOT_DELETE === actionType) {
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Ccir  Title'], 5000);
    } else if (NoticeType.NOT_ADD === actionType) {
      NotificationManager.error(translations.AddUnSuccessfull, translations['Ccir  Title'], 5000);
    } else if (NoticeType.NOT_UPDATE === actionType) {
      NotificationManager.error(translations.UpdateUnSuccessfull, translations['Ccir  Title'], 5000);
    } else if (NoticeType.DELETE !== actionType) {
      if (this.state.editId && this.state.editId !== '0') {
        NotificationManager.success(translations.UpdatedSuccesfully, translations['Ccir  Title'], 5000);
      } else {
        NotificationManager.success(translations.AddedSuccesfully, translations['Ccir  Title'], 5000);
      }
    } else {
      NotificationManager.success(translations.DeletedSuccesfully, translations['Ccir  Title'], 5000);
    }
  }

  render() {

    const { translations } = this.props;
    const { allCcir } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const access = roles.some(v => adminUser.includes(v));

    const columns = [

      {
        Header: translations.reportDate,
        accessor: 'reportTimeCriteria',
      },
      {
        Header: translations.ccirNumber,
        accessor: 'idNumber',
      },
      {
        Header: translations.unit,
        accessor: 'unit',
      },
      {
        Header: translations.description,
        accessor: 'description',
      },
      {
        Header: translations.who,
        accessor: 'who',
      },
      {
        Header: translations.what,
        accessor: 'what',
      },
      {
        Header: translations.view,
        accessor: 'id',
        filterable: false,
        maxWidth: 150,
        Cell: row => <div>
          <a href="#" className="btn btn-primary btn-xs" onClick={() => this.openCcirForm(row.value)} data-tip data-for="Edit" ><span className="glyphicon glyphicon-edit"/>
            <ReactTooltip id="Edit" type="warning"> <span>{translations.edit}</span> </ReactTooltip> </a>
              &nbsp;
          {this.state.editId == row.value ?
            <span><a href="JavaScript:void('0');" className="btn btn-danger btn-xs action-not-allow" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
              <ReactTooltip id="Action Not Allowed" type="warning"><span>Action Not Allowed</span></ReactTooltip> </span>
            :
            <a href="javaScript:void('0');" onClick={() => this.deleteCcir(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
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
            {translations.ccir} &nbsp;
            {!this.state.addCcirOpen ?
              <span>
                <a className="btn btn-info btn-xs add-data" onClick={() => this.openCcirForm('0')}><i className="glyphicon glyphicon-plus" />&nbsp;{translations.Add}</a>
              </span>
              : ''}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
        </div>

        {this.state.addCcirOpen ?
          <AddCcir editId={this.state.editId} onClose={this.closeCcirForm} translations={translations} />
          : null }

        <div className="col-md-12">
          <ReactTable data={allCcir} columns={columns} className="-striped -highlight" filterable={true} defaultPageSize={TableDefaults.PAGE_SIZE} minRows={TableDefaults.MIN_ROWS} loading={this.props.isLoading} defaultFilterMethod={defaultFilter} />
        </div>
      </div>

    </div>) : null);
  }
}

CcirComponent.propTypes = {
  children: PropTypes.element,
};

export default CcirComponent;
