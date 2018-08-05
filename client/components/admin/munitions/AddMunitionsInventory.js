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
import Dropdown from "../../reusable/Dropdown";
import { baseUrl } from 'dictionary/network';
import axios from 'axios';

import { uploadFile } from 'actions/file';
import { addMunitionInventory, updateMunitionInventory, fetchMunitionInventoryById } from 'actions/munitionsinventory';



class AddMunitionsInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      locationcategory: '',
      imagePreviewUrl: '',
      locationUpdate:true,
      oneMunitionInventory: {},
      // munition: {
      //   metaDataID: '',
      //   locationID: '',
      //   owningUnit: '',
      //   serialNumber: '',
      //   updatelocation: false
      // }
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const { editId } = this.props;
    console.log('edit id' + editId);
    if (editId !== '0') {
      this.props.fetchMunitionInventoryById(editId);
    }
  }

  handleMunitionGeneralData = (generalData) => {
    const {munition} = this.state;
    this.setState({locationcategory: generalData.locationcategory});
    this.setState({
      munition: { 
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        serialNumber: generalData.serialNumber,
        lastUpdateUserId: '000',
        lastUpdate: new Date(),
      }
    }, () => {
      console.log('New state in ASYNC callback:22222', this.state.munition);
    });
    
      
    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) 
    {
      
      console.log("Category Selected");
      this.updatelocationid(generalData);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { munition } = this.state;
    if (editId !== undefined && editId !== '0') {
      // const data = {
      //   id: editId,
      //   payloadInventory: payloads,
      // };
      munition.id = editId;
      this.props.updateMunitionInventory(editId, munition);
    } else {
      this.props.addMunitionInventory(this.state.munition);
    }
    this.props.onClose('0');
    
  }

  updatelocationid (generalData) 
  {
     let locationselect = document.getElementsByName('locationID')[0];
     let items = [{'label': '--Select Item--', 'value': 0}];
     const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=`+generalData.locationcategory;
        axios.get(apiUrl)
          .then(response => {
            console.log(response.data);
            if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
            response.data.map(item => {
              items.push({ 'label': item['description'], 'value': item['id'].trim() });
            });
            if (locationselect.length > 0) {locationselect.length = 0;}
            for(let i in items) {
              locationselect.add(new Option(items[i].label, items[i].value));
            }
            
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });   
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
    // if(!this.props.show) {
    //   return null;
    // }

    const {translations} = this.props;

    let {locationcategory} = this.state;
    
   let generalFields = [
      {name: "Munitions Specifications", type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'metaDataID', valFieldID: 'metaDataID',required:true},
      {name: "Location Category", type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory'},
      {name: "Location ID", type: 'dropdown', domID: 'locationID', ddID: '', valFieldID: 'locationID'},
      {name: "Type", type: 'dropdown', domID: 'typeId', ddID: 'MunitionRoles/GetMunitionRoles', valFieldID: 'type'},
      {name: "Owning Unit", type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit'},
      {name: "Serial Number", type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber', required:true}
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
                <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handleMunitionGeneralData} initstate ={this.props.oneMunitionInventory}/>
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
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMunitionInventory: state.munitionsinventory.oneMunitionInventory,
  };
};

const mapDispatchToProps = {
  addMunitionInventory, 
  updateMunitionInventory, 
  fetchMunitionInventoryById,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMunitionsInventory);
