import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
import CustomDatePicker from '../../reusable/CustomDatePicker';
import DropDownButton from '../../reusable/DropDownButton';
import StatusTable from '../../reusable/StatusTable';

import { uploadFile } from 'actions/file';
import { addPlatform, fetchPlatforms } from 'actions/platforminventory';


class AddPlatformInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      platform: {
        metaDataID: '',
        locationID: '',
        owningUnit: '',
        tailNumber: '',
        dispPlatformPayload1: '',
        dispPlatformPayload2: '',
        dispPlatformPayload3: '',
        dispPlatformArmament1: '',
        dispPlatformArmament2: '',
        dispPlatformArmament3: '',
        dispPlatformComs1: '',
        dispPlatformComs2: '',
      },
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount() {
    //this.props.fetchMunitions();
  }

  handlePlatformGeneralData = (generalData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        tailNumber: generalData.tailNumber,
        dispPlatformPayload1: generalData.dispPlatformPayload1,
        dispPlatformPayload2: generalData.dispPlatformPayload2,
        dispPlatformPayload3: generalData.dispPlatformPayload3,
        dispPlatformArmament1: generalData.dispPlatformArmament1,
        dispPlatformArmament2: generalData.dispPlatformArmament2,
        dispPlatformArmament3: generalData.dispPlatformArmament3,
        dispPlatformComs1: generalData.dispPlatformComs1,
        dispPlatformComs2: generalData.dispPlatformComs2,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addPlatform(this.state.platform);
    this.props.fetchPlatforms();
  }

  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        item.value = '';
      }
      for (let item of drops) {
        item.value = 0;
      }
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }



    const { platform } = this.state;
    const { translations } = this.props;

    const generalFields = [
      { name: "Platform Specifications", type: 'dropdown', ddID: 'Platform/GetPlatforms', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: "Location ID", type: 'dropdown', domID: 'locationID', ddID: 'LocationCategory', valFieldID: 'locationID' },
      { name: "Owning Unit", type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit' },
      { name: "Tail Number", type: 'input', domID: 'tailNumber', valFieldID: 'tailNumber', required: true },
      { name: translations['Payload #1'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload1', valFieldID: 'PlatformPayload1' },
      { name: translations['Payload #2'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload2', valFieldID: 'PlatformPayload2' },
      { name: translations['Payload #3'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'dispPlatformPayload3', valFieldID: 'PlatformPayload3' },
      { name: translations['Armament #1'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament1', valFieldID: 'PlatformArmament1' },
      { name: translations['Armament #2'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament2', valFieldID: 'PlatformArmament2' },
      { name: translations['Armament #3'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'dispPlatformArmament3', valFieldID: 'PlatformArmament3' },
      { name: translations['Coms Type #1'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs1', valFieldID: 'PlatformComs1' },
      { name: translations['Coms Type #2'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs2', valFieldID: 'PlatformComs2' }
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} >

        <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div>
        <div className="payload-content">
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                Add Platform Inventory
                </div>

              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div>

          <div className="row personnel" >

            <div className="under-munitions-content">
              <div className="col-md-4"></div>
              <ContentBlock fields={generalFields}
                data={this.handlePlatformGeneralData} initstate={this.state.platform} />
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button className='highlighted-button'>
              {translations['Delete']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className='highlighted-button'>
              {translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddPlatformInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

const mapDispatchToProps = {
  addPlatform,
  fetchPlatforms,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlatformInventory);
