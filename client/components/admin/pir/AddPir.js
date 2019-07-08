import { addPir, fetchPirById, updatePir } from 'actions/pir';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';

import { NoticeType, Error, InputAttributes } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';

class AddPir extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));
    this.state = {
      clear: false,
      isUpdated: true,
      pir: {
        unitID: ses.AssignedUnit,
        branchID: ses.Branch,
        COCOM: ses.COCOMID,
      },
      onePir: {},
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
      this.getPir(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }

    if(editId !== '0' && prevProps.editId !== editId) {
      this.getPir(editId);
    }

  }

getPir = (editId) => {
  this.props.fetchPirById(editId).then(() => {
    this.setState({
      isUpdated: true,
      pir: this.props.onePir,
    });

  });
}

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handlePir1 = (data) => {
    const { pir } = this.state;
    this.setState({
      pir: {
        ...pir,
        unitID: data.unitID,
        threatGroup: data.threatGroup,
        objectiveID: data.objectiveID,
        country: data.country,
        region: data.region,
      },
    });
  }

  handlePir2 = (data) => {
    const { pir } = this.state;
    this.setState({
      pir: {
        ...pir,
        idNumber: data.idNumber,
        description: data.description,
        name: data.name,
        EEIs: data.EEIs,
      },
    });
  }

  handlePir3 = (data) => {
    const { pir } = this.state;
    this.setState({
      pir: {
        ...pir,
        locationNAI: data.locationNAI,
        locationPOI: data.locationPOI,
        locationTAI: data.locationTAI,
      },
    });
  }

  handleSubmit = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { pir } = this.state;
    const { editId } = this.props;

    if (editId && editId !== '0') {
      pir.id = editId;
      this.props.updatePir(editId, pir).then(() => {
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
      this.props.addPir(pir).then((res) => {
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
    if (confirm(translations.ClearConfirmation)) {
      this.setState({ clear: true });
    }
  }

  render() {

    const ses = JSON.parse(localStorage.getItem('session'));
    const { translations } = this.props;

    const pir1 = [
      { name: translations.Unit, type: 'dropdown', domID: 'unitID', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'unitID', required: true },
      { name: translations['Threat Group'], type: 'select', ddID: 'ThreatGroup/GetThreatGroups', createUrl: 'ThreatGroup/PostThreatGroup', createName: 'description', domID: 'threatGroup', valFieldID: 'threatGroup', required: true },
      { name: translations.Objective, type: 'select', domID: 'dispObjective', ddID: 'Objective/GetObjectives', createUrl: 'Objective/PostObjective', createName: 'objectiveName', valFieldID: 'objectiveID' },
      { name: translations.Country, type: 'dropdown', ddID: 'Countries', valFieldID: 'country', domID: 'country', required: true },
      { name: translations.Region, type: 'dropdown', ddID: 'Regions', valFieldID: 'region', domID: 'region', required: true },
    ];

    const pir2 = [
      { name: translations.pirNumber, type: 'input', domID: 'idNumber', valFieldID: 'idNumber', required: true },
      { name: translations.title, type: 'input', domID: 'name', valFieldID: 'name', required: true },
      { name: translations.Description, type: 'input', domID: 'description', valFieldID: 'description', required: true, maxlength: InputAttributes.DESC_LENGTH },
      { name: translations.EEIs, type: 'dropdown', domID: 'dispEEIs', ddID: 'IntelReqEEI/GetEEIOptions', valFieldID: 'EEIs', multiple: true, required: true },
    ];

    const pir3 = [
      { name: translations.NAI, type: 'dropdown', domID: 'locationNAI', valFieldID: 'locationNAI', ddID: 'Locations/GetLocationsByCategory?Category=2' },
      { name: translations.POI, type: 'dropdown', domID: 'locationPOI', valFieldID: 'locationPOI', ddID: 'Locations/GetLocationsByCategory?Category=3' },
      { name: translations.TAI, type: 'dropdown', domID: 'locationTAI', valFieldID: 'locationTAI', ddID: 'Locations/GetLocationsByCategory?Category=6' },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <Loader loading={this.state.loading} />
        <div className="payload-content">
          <div className="row personnel" >
            <div className="under-munitions-content">
              <ContentBlock fields={pir1} data={this.handlePir1} initstate={this.state.pir} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={pir2} data={this.handlePir2} initstate={this.state.pir} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={pir3} data={this.handlePir3} initstate={this.state.pir} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

AddPir.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePir: state.pirs.onePir,
    isAdded: state.pirs.isAdded,
    isUpdated: state.pirs.isUpdated,
    error: state.pirs.error,
  };
};

const mapDispatchToProps = {
  addPir,
  fetchPirById,
  updatePir,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPir);
