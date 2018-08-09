import { uploadFile } from 'actions/file';
import { addPlatformInventory, fetchPlatformInventoryById, updatePlatformInventory } from 'actions/platforminventory';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import { baseUrl } from 'dictionary/network';
import axios from 'axios';



class AddPlatformInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      locationcategory: '',
      // platform: {
      //   metaDataID: '',
      //   locationID: '',
      //   owningUnit: '',
      //   tailNumber: '',
      //   dispPlatformPayload1: '',
      //   dispPlatformPayload2: '',
      //   dispPlatformPayload3: '',
      //   dispPlatformArmament1: '',
      //   dispPlatformArmament2: '',
      //   dispPlatformArmament3: '',
      //   dispPlatformComs1: '',
      //   dispPlatformComs2: '',
      // },
      onePlatformInventory: {},
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      this.props.fetchPlatformInventoryById(editId);
    }else {
      // this.setState({ onePlatformInventory: {} });
    }
  }

  handlePlatformGeneralData = (generalData) => {
    const { platform } = this.state;
    this.setState({ locationcategory: generalData.locationcategory });
    this.setState({
      platform: {
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
        platformTailNumber: generalData.platformTailNumber,
        platformService: generalData.platformService,
        locationCOCOM: generalData.locationCOCOM,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });

    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) 
    {
      console.log("Category Selected");
      this.updatelocationid(generalData);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { platform } = this.state;
    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      platform.id = editId;
      this.props.updatePlatformInventory(editId, platform).then( () => {this.props.onClose('UPDATE');});
    } else {
      this.props.addPlatformInventory(platform).then( () => {this.props.onClose('ADD');});
    }
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

  stopset () {
    this.setState({clear:false});
  }


  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
       this.setState({clear:true});
     }
     else {
 
     }
  }

  render() {
    // Render nothing if the "show" prop is false
    // if (!this.props.show) {
    //   return null;
    // }
   
    const { translations } = this.props;

    const generalFieldsSectionOne = [
      { name: "Platform Specifications", type: 'dropdown', ddID: 'Platform/GetPlatforms', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'platformTailNumber', required: true },
      {name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'locationCOCOM',required:true},
      { name: translations['Branch'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID: 'platformService', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit' },
      { name: 'Location Category', type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' },
      { name: 'Location ID', type: 'dropdown', domID: 'locationID', ddID: 'Locations/GetLocationsByCategory?Category=2', valFieldID: 'locationID' },
      { name: "Tail Number", type: 'input', domID: 'tailNumber', valFieldID: 'tailNumber', required: true },
    ];

    const generalFieldsSectionTwo = [
      { name: translations['Payload #1'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload1', valFieldID: 'dispPlatformPayload1' },
      { name: translations['Payload #2'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload2', valFieldID: 'dispPlatformPayload2' },
      { name: translations['Payload #3'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload3', valFieldID: 'dispPlatformPayload3' },
      { name: translations['Armament #1'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament1', valFieldID: 'dispPlatformArmament1' },
    ];

    const generalFieldsSectionThree = [
      { name: translations['Armament #2'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament2', valFieldID: 'dispPlatformArmament2' },
      { name: translations['Armament #3'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament3', valFieldID: 'dispPlatformArmament3' },
      { name: translations['Coms Type #1'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs1', valFieldID: 'dispPlatformComs1' },
      { name: translations['Coms Type #2'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs2', valFieldID: 'dispPlatformComs2' }
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} >
       {/*  <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> */}
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
              <ContentBlock fields={generalFieldsSectionOne}  data={this.handlePlatformGeneralData} initstate={this.props.onePlatformInventory} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={generalFieldsSectionTwo}  data={this.handlePlatformGeneralData} initstate={this.props.onePlatformInventory} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={generalFieldsSectionThree}  data={this.handlePlatformGeneralData} initstate={this.props.onePlatformInventory} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
            </div>
          </div>
          
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className='highlighted-button'>
            {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddPlatformInventory.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePlatformInventory: state.platforminventory.onePlatformInventory,
  };
};

const mapDispatchToProps = {
  addPlatformInventory,
  fetchPlatformInventoryById,
  updatePlatformInventory,
  uploadFile,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlatformInventory);
