import PropTypes from 'prop-types';
import React from 'react';
import { adminUser } from '../../dictionary/auth';
import { NotificationManager } from 'react-notifications';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { defaultFilter, getConfirmation, formatDateTime } from '../../util/helpers';
import Loader from '../reusable/Loader';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
import AddPir from './pir/AddPir';

class PirComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPirOpen: false,
      editId: '0',
    };
  }

  componentDidMount() {
    this.props.fetchPir();
  }

  addPir = () => {
    this.setState({
      addPirOpen: !this.state.addPirOpen,
    });
  };

  openPirForm = (row) => {
    this.setState({
      editId: row,
      addPirOpen: true,
    });
  };

  closePirForm = (actionType, actionSuccess) => {
    if (actionSuccess) {
      this.loadData(actionType);
      this.setState({
        editId: '0',
        addPirOpen: false,
      });
    } else {
      this.notify(actionType);
    }
  }

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchPir();
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    if (value !== undefined && value !== '0') {
      this.setState({
        loading: true,
      });
      this.props.deletePirById(value).then(() => {
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
  deletePir = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation, translations.Yes, translations.No, () => this.deleteLogic(value));
  }

  notify = (actionType) => {
    const { translations } = this.props;
    if (NoticeType.NOT_DELETE === actionType) {
      NotificationManager.error(translations.DeleteUnSuccessfull, translations['Pir  Title'], 5000);
    } else if (NoticeType.NOT_ADD === actionType) {
      NotificationManager.error(translations.AddUnSuccessfull, translations['Pir  Title'], 5000);
    } else if (NoticeType.NOT_UPDATE === actionType) {
      NotificationManager.error(translations.UpdateUnSuccessfull, translations['Pir  Title'], 5000);
    } else if (NoticeType.DELETE !== actionType) {
      if (this.state.editId && this.state.editId !== '0') {
        NotificationManager.success(translations.UpdatedSuccesfully, translations['Pir  Title'], 5000);
      } else {
        NotificationManager.success(translations.AddedSuccesfully, translations['Pir  Title'], 5000);
      }
    } else {
      NotificationManager.success(translations.DeletedSuccesfully, translations['Pir  Title'], 5000);
    }
  }

  render() {

    const { translations } = this.props;
    const { allPir } = this.props;

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const access = roles.some(v => adminUser.includes(v));

    const columns = [
      {
        Header: translations.unit,
        accessor: 'unitName',
      },
      {
        Header: translations.pirNumber,
        accessor: 'PIRNumber',
      },
      {
        Header: translations.title,
        accessor: 'name',
      },
      {
        Header: translations.place,
        accessor: 'country',
        Cell: row => <div>{row.original.countryName} {row.original.regionName} </div>,
      },
      {
        Header: translations['Threat Group'],
        accessor: 'threatGroupName',
      },
      {
        Header: translations.Location,
        accessor: 'location',
        Cell: row => <div>{row.original.locationNAIName} {row.original.locationTAIName} {row.original.locationPOIName} </div>,
      },
      {
        Header: translations.Objective,
        accessor: 'objectiveName',
      },
      {
        Header: translations.view,
        accessor: 'id',
        filterable: false,
        maxWidth: 150,
        Cell: row => <div>
          <a href="#" className="btn btn-primary btn-xs" onClick={() => this.openPirForm(row.value)} data-tip data-for="Edit" ><span className="glyphicon glyphicon-edit"/>
            <ReactTooltip id="Edit" type="warning"> <span>{translations.edit}</span> </ReactTooltip> </a>
              &nbsp;
          {this.state.editId == row.value ?
            <span><a href="JavaScript:void('0');" className="btn btn-danger btn-xs action-not-allow" data-tip data-for="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a>
              <ReactTooltip id="Action Not Allowed" type="warning"><span>Action Not Allowed</span></ReactTooltip> </span>
            :
            <a href="javaScript:void('0');" onClick={() => this.deletePir(row.value)} className="btn btn-danger btn-xs" data-tip data-for="Delete"> <span className="glyphicon glyphicon-trash"/>
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
            {translations.pir} &nbsp;
            {!this.state.addPirOpen ?
              <span>
                <a className="btn btn-info btn-xs add-data" onClick={() => this.openPirForm('0')}><i className="glyphicon glyphicon-plus" />&nbsp;{translations.Add}</a>
              </span>
              : ''}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
        </div>

        {this.state.addPirOpen ?
          <AddPir editId={this.state.editId} onClose={this.closePirForm} translations={translations} />
          : null }

        <div className="col-md-12">
          <ReactTable data={allPir} columns={columns} className="-striped -highlight" filterable={true} defaultPageSize={TableDefaults.PAGE_SIZE} minRows={TableDefaults.MIN_ROWS} loading={this.props.isLoading} defaultFilterMethod={defaultFilter} />
        </div>
      </div>

    </div>) : null);
  }
}

PirComponent.propTypes = {
  children: PropTypes.element,
};

export default PirComponent;
