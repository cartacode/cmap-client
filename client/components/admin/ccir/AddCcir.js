import { uploadFile } from 'actions/file';
import { addCcir, fetchCcirById, updateCcir } from 'actions/ccir';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';

import axios from 'axios';
import { NoticeType, Error } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class AddCcir extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));
    const locationcategory = ses.LocationCategoryID;
    this.state = {
      clear: false,      
      isUpdated: true,
      ccir: {
        unitID: ses.AssignedUnit,
        branchID: ses.Branch,
        COCOM: ses.COCOMID,
      },
      oneCcir: {},
      loading: false,
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.getCcir(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }

    if(editId !== '0' && prevProps.editId !== editId) {
      this.getCcir(editId);
    }

  }

getCcir = (editId) => {
  this.props.fetchCcirById(editId).then(() => {
    this.setState({
      isUpdated: true,
      ccir: this.props.oneCcir,
    });

  });
}

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handleGeneralData = (generalData) => {
    const { ccir } = this.state;
    this.setState({
      locationcategory: generalData.locationcategory,
      ccir: {
        ...ccir,
        idNumber: generalData.idNumber,
        description: generalData.description,        
        unitID: generalData.unitID,
        reportTimeCriteria: generalData.reportTimeCriteria,
      },
    });
  }

  handleSubmit = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { ccir } = this.state;
    const { editId } = this.props;

    if (editId && editId !== '0') {
      ccir.id = editId;
      this.props.updateCcir(editId, ccir).then(() => {
        this.setState({
          loading: false,
        });
        if(this.props.isUpdated) {
          this.props.onClose(NoticeType.UPDATE, this.props.isUpdated);
        }
        else if(!this.props.isUpdated && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_UPDATE, this.props.isUpdated);
        }
      });
    } else {
      this.props.addCcir(ccir).then((res) => {
        this.setState({
          loading: false,
        });
        // this.props.onClose(NoticeType.ADD);
        if(this.props.isAdded) {
          this.props.onClose(NoticeType.ADD, this.props.isAdded);
        }
        else if(!this.props.isAdded && this.props.error === Error.ERROR_CODE) {
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
    const { ccir } = this.state;

    const fields = [
      { name: translations.description, type: 'input', domID: 'description', valFieldID: 'description', required: true },
      { name: translations.ccirNumber, type: 'input', domID: 'idNumber', valFieldID: 'idNumber', required: true },
      { name: translations.reportDate, type: 'date', domID: 'reportTimeCriteria', valFieldID: 'reportTimeCriteria', required: true },
      { name: translations.Unit, type: 'dropdown', domID: 'unitID', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'unitID', required: true },
    
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <Loader loading={this.state.loading} />
        <div className="payload-content">
          <div className="row personnel" >
            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={fields} data={this.handleGeneralData} initstate={this.state.ccir} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

AddCcir.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneCcir: state.ccirs.oneCcir,
    isAdded: state.ccirs.isAdded,
    isUpdated: state.ccirs.isUpdated,
    error: state.ccirs.error,
  };
};

const mapDispatchToProps = {
  addCcir,
  fetchCcirById,
  updateCcir,
  uploadFile,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddCcir);
