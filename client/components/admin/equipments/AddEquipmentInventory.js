import { uploadFile } from 'actions/file';
import { addEquipmentInventory, fetchEquipmentInventoryById, updateEquipmentInventory } from 'actions/equipmentinventory';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';

import axios from 'axios';
import { NoticeType, Error } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class AddEquipmentInventory extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));
    const locationcategory = 1; // TODO: use session here
    this.state = {
      clear: false,
      imagePreviewUrl: '',
      locationcategory,
      isUpdated: true,
      equipment: {
        locationID: ses.LocationID,
        locationcategory,
        owningUnit: ses.AssignedUnit,
        branch: ses.Branch,
        COCOM: ses.COCOMID,
      },
      oneEquipmentInventory: {},
      loading: false,
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    // if (editId !== '0') {
    //   this.props.fetchEquipmentInventoryById(editId).then(() => {
    //     this.setState({
    //       isUpdated: true,
    //       equipment: this.props.oneEquipmentInventory,
    //     });
    //   });
    // }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }

    // if(editId !== '0' && prevProps.editId !== editId) {
    //   this.props.fetchEquipmentInventoryById(this.props.editId).then(() => {
    //     this.setState({
    //       isUpdated: true,
    //       equipment: this.props.oneEquipmentInventory,
    //     });

    //   });
    // }

  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  handleGeneralData = (generalData) => {
    const { equipment } = this.state;
    this.setState({
      locationcategory: generalData.locationcategory,
      equipment: {
        ...equipment,
        serialNo: generalData.serialNo,
        quantity: generalData.quantity,
        equipmentId: generalData.equipmentId,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        locationcategory: generalData.locationcategory,
      },
    });

    if(generalData.locationcategory && generalData.locationcategory != this.state.locationcategory) {
      this.updatelocationid(generalData);
    }
  }

  handleSubmit = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { equipment } = this.state;
    const { editId } = this.props;

    if (editId && editId !== '0') {
      equipment.id = editId;
      this.props.updateEquipmentInventory(editId, equipment).then(() => {
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
      this.props.addEquipmentInventory(equipment).then((res) => {
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

  updatelocationid(generalData) {
    const locationselect = document.getElementsByName('locationID')[0];
    locationselect.length = 0;
    locationselect.add(new Option('--Fetching Locations--', ''));
    const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationcategory;
    axios.get(apiUrl, { headers: requestHeaders })
      .then(response => {
        locationselect.length = 0;
        if(response.data) {
          locationselect.add(new Option('--Select Location--', ''));
          response.data.map(item => {
            let selected = false;
            if(item.id === generalData.locationID) {
              selected = true;
            }
            locationselect.add(new Option(item.description, item.id.trim(), selected, selected));
          });
        }else{
          locationselect.add(new Option('No Location Found', ''));
        }

      })
      .catch((error) => {
        locationselect.length = 0;
        locationselect.add(new Option('Error Fetching Locations', ''));
        console.log('Exception comes:' + error);
      });
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
    const { equipment } = this.state;

    const fields = [
      { name: translations.equipment, type: 'dropdown', ddID: 'Equipment/GetEquipments', domID: 'metaDataID', valFieldID: 'equipmentId', required: true },
      { name: translations.SerialNo, type: 'input', domID: 'SerialNo', valFieldID: 'serialNo', required: true },
      { name: translations.Quantity, type: 'input', domID: 'quantity', valFieldID: 'quantity', required: true },
      { name: translations.Remarks, type: 'input', domID: 'remarks', valFieldID: 'remarks', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'owningUnit' , required: true },
      { name: translations['Location Category'], type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory', required: true },
      { name: translations['Location ID'], type: 'dropdown', domID: 'locationID', ddID: `Locations/GetLocationsByCategory?Category=${equipment.locationcategory}`, valFieldID: 'locationID', required: true },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <Loader loading={this.state.loading} />
        <div className="payload-content">
          <div className="row personnel" >
            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={fields} data={this.handleGeneralData} initstate={this.state.equipment} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

AddEquipmentInventory.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneEquipmentInventory: state.equipmentinventory.oneEquipmentInventory,
    isAdded: state.equipmentinventory.isAdded,
    isUpdated: state.equipmentinventory.isUpdated,
    error: state.equipmentinventory.error,
  };
};

const mapDispatchToProps = {
  addEquipmentInventory,
  fetchEquipmentInventoryById,
  updateEquipmentInventory,
  uploadFile,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipmentInventory);
