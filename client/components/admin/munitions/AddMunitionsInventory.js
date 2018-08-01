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
import { addMunition, fetchMunitions } from 'actions/munition';

class AddMunitionsInventory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      metaDataID:'',
      locationID:'',
      owningUnit:'',
      serialNumber:''
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    //this.props.fetchMunitions();
  }

  handleMunitionGeneralData = (generalData) => {
    const {munition} = this.state;
    this.setState({
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        serialNumber: generalData.serialNumber
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addMunition(this.state.munition);
    this.props.fetchMunitions();
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

    

    const {munition} = this.state;
    const {translations} = this.props;

    const generalFields = [
      {name: "Meta Data ID", type: 'input', domID: 'metaDataID', valFieldID: 'metaDataID',required:true},
      {name: "Location ID", type: 'dropdown', domID: 'locationID', ddID: 'LocationCategory', valFieldID: 'locationID'},
      {name: "Owning Unit", type: 'number', domID: 'owningUnit', valFieldID: 'owningUnit'},
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
                  Add Munitions Inventory
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
              </div>
              </div>
            
            <div className="row personnel" >
            
              <div className="under-munitions-content">
              <div className="col-md-4"></div>
                <ContentBlock  fields={generalFields}
                data={this.handleMunitionGeneralData} initstate ={this.state.munition}/>
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

AddMunitionsInventory.propTypes = {
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
  addMunition,
  fetchMunitions,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMunitionsInventory);
