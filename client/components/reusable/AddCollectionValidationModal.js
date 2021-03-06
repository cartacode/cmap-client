import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchNextHigherUnit } from 'actions/organicorg';
import { fetchIntelRequestById } from 'actions/intel';
import { IntelConstants } from '../../dictionary/constants';
import FullHeaderLine from 'components/reusable/FullHeaderLine';
import ModalFormBlock from 'components/reusable/ModalFormBlock';

class AddCollectionValidationModal extends React.Component {

  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    this.state = {
      content: [],
      intelRequest: {
        SupportedUnit: unitId,
      },
      editFetched: false,
    };
  }

  componentDidMount = () =>{
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;

    this.props.fetchIntelRequestById(this.props.IntelRequestID).then(() => {
      let { intelRequest } = this.state;

      this.setState({
        intelRequest: {
          ...intelRequest,
          StatusId: this.props.intelData.StatusId,
          PriorityId: this.props.intelData.PriorityId,
          SpecialInstructions: this.props.intelData.SpecialInstructions,
          NextHigherUnitId: this.props.intelData.NextHigherUnitId,
        },
        editFetched: true,
      });

    });

    // // setting next higher unit
    // this.props.fetchNextHigherUnit(unitId).then(() => {
    //   let { intelRequest } = this.state;
    //   this.setState({
    //     intelRequest: {
    //       ...intelRequest,
    //       NextHigherUnitId: this.getHigherUnit(),
    //     },
    //     editFetched: true,
    //   });
    // });

   
  }

getHigherUnit = () => {
  const { higherUnit } = this.props;
  const higherId = higherUnit.length > 0 ? higherUnit[0].unitID : null;
  return higherId;
}

  saveCollectionValidationModal = (event) => {
    event.preventDefault();
    const { intelRequest } = this.state;
    intelRequest.IntelRequestID = this.props.IntelRequestID;
    this.props.save(this.props.IntelRequestID, intelRequest);
  }

  handleIntelRequest4 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        // OrganicUnit: ir.OrganicUnit,
        StatusId: ir.StatusId,
        NextHigherUnitId: ir.NextHigherUnitId,
      },
    });
  }

  handleIntelRequest5 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityId: ir.PriorityId,
        SpecialInstructions: ir.SpecialInstructions,
      },
    });
  }


  stopupd = () => {
    this.setState({ editFetched: false });
  }

  render() {
    const { translations } = this.props;
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const { intelRequest } = this.state;
    const isStatusDisabled = intelRequest.Abbreviation === IntelConstants.STATUS.APR.abbreviation || (intelRequest.MissionId !== null && intelRequest.MissionId !== undefined);
    const statusElem = { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: isStatusDisabled, valFieldID: 'StatusId', required: true };

    const intelRequest4 = [
      statusElem,
      // { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: intelRequest.MissionId, valFieldID: 'StatusId', required: true },
      { name: translations.OrganicUnit, type: 'dropdown', domID: 'organicUnt', ddID: 'Units/GetUnits', valFieldID: 'SupportedUnit', disabled: true },
      { name: translations.NextHigherUnit, type: 'dropdown', domID: 'nextHigherUnit', ddID: 'Units/GetUnits', valFieldID: 'NextHigherUnitId' },
    ];

    const intelRequest5 = [
      { name: translations.Priority, type: 'dropdown', domID: 'intelPriority', ddID: 'Priority', valFieldID: 'PriorityId', required: true /* options: priorityOptions */ },
      { name: translations['special instructions/notes'], type: 'textarea', valFieldID: 'SpecialInstructions', domID: 'SpecialInstructions' },
    ];

    return (
      <div>
        <form action="" onSubmit={this.saveCollectionValidationModal} >
          <div className="react-confirm-alert-overlay">
            <div className="modal-content collection-model-width react-confirm-alert">
              <div className="close-button mission-mgt-close-padding hand-cursor">
                <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
              </div>
              <div className="row intel-request ">
                <div className="col-md-12 collection-valid-header">
                  {translations.collectionValidation}
                </div>
                <div className="col-md-6">
                  <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest4} initstate ={this.state.intelRequest} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
                </div>
                <div className="col-md-6">
                  <ModalFormBlock fields={intelRequest5} data={this.handleIntelRequest5} initstate ={this.state.intelRequest} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
                </div>
              </div>
              <div className="row action-buttons">
                {/* <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="btn btn-warning" onClick={this.props.onClose}>{translations.close}</button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div> */}
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button type="submit" className="btn btn-warning">{translations.submit}</button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddCollectionValidationModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    higherUnit: state.organicorgs.nextHigherUnit,
    intelData: state.intelrequest.oneIntelRequest,
  };
};

const mapDispatchToProps = {
  fetchNextHigherUnit,
  fetchIntelRequestById,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddCollectionValidationModal);
