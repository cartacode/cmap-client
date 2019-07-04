import { uploadFile } from 'actions/file';
import { addOperation, updateOperation, fetchOperations, fetchOperationById, deleteOperationById } from 'actions/operations';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';

import axios from 'axios';
import { NoticeType, Error } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class AddOperation extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));

    this.state = {
      clear: false,
      isUpdated: true,
      operation: {
        unitID: ses.AssignedUnit,
        branchID: ses.Branch,
        COCOM: ses.COCOMID,
      },
      oneOperation: {},
      loading: false,
      kmlFile: null,
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchOperationById(editId).then(() => {
        this.setState({
          isUpdated: true,
          operation: this.props.oneOperation,
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }

    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchOperationById(editId).then(() => {
        this.setState({
          isUpdated: true,
          operation: this.props.oneOperation,
        });
      });
    }

  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handleGeneralData = (generalData) => {
    const { operation } = this.state;
    this.setState({
      kmlFile: generalData.kmlFile,
      operation: {
        ...operation,
        name: generalData.name,
        country: generalData.country,
        region: generalData.region,
        threatGroup: generalData.threatGroup,
        unitID: generalData.unitID,
        startDate: generalData.startDate,
        endDate: generalData.endDate,
      },
    });

    /* if(generalData.locationcategory && generalData.locationcategory != this.state.locationcategory) {
      this.updatelocationid(generalData);
    } */
  }

  handleSubmit = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { operation } = this.state;
    const { editId } = this.props;
    console.log(editId);
    console.log(operation);

    const { kmlFile } = this.state;
    // We are going to upload files with JSON request body.
    const formData = new FormData();
    if (kmlFile) {
      formData.append('kmlFile', kmlFile, kmlFile.name);
    }

    if (editId && editId !== '0') {
      operation.id = editId;
      formData.append('operationFormData', JSON.stringify(operation));

      this.props.updateOperation(editId, formData).then(() => {
        this.setState({
          loading: false,
        });
        if(this.props.isUpdated) {
          this.props.onClose(NoticeType.UPDATE, this.props.isUpdated);
        } else if(!this.props.isUpdated && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_UPDATE, this.props.isUpdated);
        }
      });
    } else {
      formData.append('operationFormData', JSON.stringify(operation));

      this.props.addOperation(formData).then((res) => {
        this.setState({
          loading: false,
        });
        // this.props.onClose(NoticeType.ADD);
        if(this.props.isAdded) {
          this.props.onClose(NoticeType.ADD, this.props.isAdded);
        } else if(!this.props.isAdded && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_ADD, this.props.isAdded);
        }
      });
    }
  }

  stopset = () => {
    this.setState({ clear: false });
  }

  resetForm = () => {
    this.setState(this.baseState);
    const { translations } = this.props;
    console.log('FORM RESET DONE');
    if (confirm(translations.ClearConfirmation)) {
      this.setState({ clear: true });
    }
  }

  render() {

    const ses = JSON.parse(localStorage.getItem('session'));
    const { translations } = this.props;
    const { operation } = this.state;

    const fields = [
      { name: translations.Country, type: 'dropdown', ddID: 'Countries', valFieldID: 'country', domID: 'country', required: true },
      { name: translations.Region, type: 'dropdown', ddID: 'Regions', valFieldID: 'region', domID: 'region', required: true },
      { name: translations['Threat Group'], type: 'dropdown', ddID: 'EEIThreat', domID: 'threatGroup', valFieldID: 'threatGroup', required: true },
      { name: translations['Effective Area KML'], type: 'file', valFieldID: 'kmlFile', domID: 'kmlFile', extension: 'kml' },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'unitID', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'unitID', required: true },
      { name: translations['Named Operation'], type: 'input', valFieldID: 'name', domID: 'name', required: true },
      { name: translations['Start Date'], type: 'date', domID: 'startDate', valFieldID: 'startDate' },
      { name: translations['End Date'], type: 'date', domID: 'endDate', valFieldID: 'endDate' },

    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <Loader loading={this.state.loading} />
        <div className="payload-content">
          <div className="row personnel" >
            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={fields} data={this.handleGeneralData} initstate={this.state.operation} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
            </div>
          </div>

        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className="highlighted-button">
              {translations.submit}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddOperation.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneOperation: state.operations.oneOperation,
    isAdded: state.operations.isAdded,
    isUpdated: state.operations.isUpdated,
    error: state.operations.error,
  };
};

const mapDispatchToProps = {
  addOperation,
  updateOperation,
  fetchOperations,
  fetchOperationById,
  deleteOperationById,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddOperation);
