import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
import CustomDatePicker from '../../reusable/CustomDatePicker';
import DropDownButton from '../../reusable/DropDownButton';
import StatusTable from '../../reusable/StatusTable';

import { uploadFile } from 'actions/file';
import { addPayload, fetchPayloads, fetchPayloadById } from 'actions/payloadinventory';

class AddPayloadsInventory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      locationcategory:'',
      /* payloads : {
      metaDataID:'',
      locationID:'',
      owningUnit:'',
      serialNumber:''
      } */
      onePayload: {}
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    this.props.fetchPayloadById();
  }

  handlePayloadGeneralData = (generalData) => {
    const {payloads} = this.state;
    this.setState({locationcategory: generalData.locationcategory});
    this.setState({
      payloads: { 
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        serialNumber: generalData.serialNumber
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payloads);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addPayload(this.state.payloads);
    this.props.fetchPayloads();
  }

  resetForm(){
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
    if(!this.props.show) {
      return null;
    }

    

    const {payload} = this.state;
    const {translations} = this.props;

    const generalFields = [
      {name: "Payload Specifications", type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'metaDataID', valFieldID: 'metaDataID',required:true},
      {name: "Location Category", type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory'},
      {name: "Location ID", type: 'dropdown', domID: 'locationID', ddID: 'Locations/GetLocationsByCategory?Category=2', valFieldID: 'locationID'},
      {name: "Owning Unit", type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit'},
      {name: "Serial Number", type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber',required:true}
    ];

    
    return (

      <form action="" onSubmit={this.handleSubmit} >

          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="payload-content">
            <div className="row personnel" >
              
              <div className="header-line">
                <img src="/assets/img/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  Add Payloads Inventory
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
              </div>
              </div>
            
            <div className="row personnel" >
            
              <div className="under-munitions-content">
              <div className="col-md-4"></div>
                <ContentBlock  fields={generalFields}
                data={this.handlePayloadGeneralData} initstate ={this.props.onePayload}/>
              </div>
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
                {translations['clear']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className='highlighted-button'>
                {translations['Delete']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="submit" className='highlighted-button'>
                {translations['save']}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>

      </form>

    );
  }
}

AddPayloadsInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayload:state.payloads.onePayload
  };
};

const mapDispatchToProps = {
  uploadFile,
  addPayload,
  fetchPayloads,
  fetchPayloadById
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPayloadsInventory);
