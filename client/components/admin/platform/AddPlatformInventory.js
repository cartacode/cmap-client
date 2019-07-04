import { uploadFile } from 'actions/file';
import { addPlatformInventory, fetchPlatformInventoryById, updatePlatformInventory } from 'actions/platforminventory';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";

import axios from 'axios';
import {NoticeType, Error} from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class AddPlatformInventory extends React.Component {

  constructor(props) {
    super(props);
    const ses = JSON.parse(localStorage.getItem('session'));
    const locationcategory = ses.LocationCategoryID; //  use session here
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      locationcategory,
      isUpdated: true,
       platform: {
      //   metaDataID: '',
        locationID: ses.LocationID,
        locationcategory,
        owningUnit: ses.AssignedUnit,
        branch: ses.Branch,
        COCOM: ses.COCOMID,
      //   tailNumber: '',
      //   dispPlatformPayload1: '',
      //   dispPlatformPayload2: '',
      //   dispPlatformPayload3: '',
      //   dispPlatformArmament1: '',
      //   dispPlatformArmament2: '',
      //   dispPlatformArmament3: '',
      //   dispPlatformComs1: '',
      //   dispPlatformComs2: '',
      },
      onePlatformInventory: {},
      loading:false
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchPlatformInventoryById(editId).then(() => {
        this.setState({
          isUpdated: true,
          platform: this.props.onePlatformInventory,
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchPlatformInventoryById(this.props.editId).then(() => {
        this.setState({
          isUpdated: true,
          platform: this.props.onePlatformInventory,
        });

      });
    }

    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }
  
  handlePlatformGeneralData = (generalData) => {
    const { platform } = this.state;
    this.setState({ locationcategory: generalData.locationcategory });
    // this.setState({ selectedBranch: generalData.branch });

    this.setState({
      platform: {
        ...platform,
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,        
        locationcategory: generalData.locationcategory,
        tailNumber: generalData.tailNumber,
        callSign: generalData.callSign,
        Company: generalData.Company,        
      }, 
    });

    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) {
      this.updatelocationid(generalData);
    }
    // if( generalData.branch && generalData.branch !== this.state.selectedBranch) {
    // this.updateOwningUnit(generalData);
    // // this.updateDeployedUnits(generalData.branch, platform.deployedUnit);
    // }
  }

  handlePayloadData = (data) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        payload1: data.payload1,
        payload2: data.payload2,
        payload3: data.payload3,
        payload4: data.payload4,
        payload5: data.payload5,
        payload6: data.payload6,
        payload7: data.payload7,
        payload8: data.payload8,
      },
    });
  }

  handleArmsData = (data) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        armament1: data.armament1,
        armament2: data.armament2,
        armament3: data.armament3,
        coms2: data.coms2,
        coms1: data.coms1,
      },
    });
  }

  handleSubmit = event => {
    this.setState({
      loading:true
    });
    event.preventDefault();
    let { platform } = this.state;
    const { editId } = this.props;
    const { translations } = this.props;

    if (editId !== undefined && editId !== '0') {
      platform.id = editId;
      this.props.updatePlatformInventory(editId, platform).then( () => {
        this.setState({
          loading:false
        });
        //this.props.onClose(NoticeType.UPDATE);
        if(this.props.isUpdated) {
          this.props.onClose(NoticeType.UPDATE, this.props.isUpdated);
        } 
        else if(!this.props.isUpdated && this.props.error === Error.ERROR_CODE ) {
          this.props.onClose(NoticeType.NOT_UPDATE, this.props.isUpdated);
        }
      });
    } else {
      this.props.addPlatformInventory(platform).then( (res) => {
        this.setState({
          loading:false
        });
        //this.props.onClose(NoticeType.ADD);
        if(this.props.isAdded) {
          this.props.onClose(NoticeType.ADD, this.props.isAdded);
        } 
        else if(!this.props.isAdded && this.props.error === Error.ERROR_CODE) {
          this.props.onClose(NoticeType.NOT_ADD, this.props.isAdded);
        }
      });
    }
  }

  updatelocationid (generalData) {
    let locationselect = document.getElementsByName('locationID')[0];
    locationselect.length = 0;
    locationselect.add(new Option('--Fetching Locations--', ''));
    let items = [{'label': 'Loading Locations', 'value': ''}];
    const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationcategory;
    axios.get(apiUrl,{headers:requestHeaders})
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




  updateOwningUnit (generalData) {
    let unitselect = document.getElementsByName('owningUnit')[0];
    unitselect.length = 0;
    unitselect.add(new Option('--Fetching units--', ''));
    let items = [{'label': 'Loading Units', 'value': ''}];
    const apiUrl = `${baseUrl}/Units/GetUnits?branchID=` + generalData.branch;
    axios.get(apiUrl,{headers:requestHeaders})
      .then(response => {
        unitselect.length = 0;
        if(response.data) {
          unitselect.add(new Option('--Select Unit--', ''));
          response.data.map(item => {
            let selected = false;
            if(item.id == generalData.owningUnit) {
              selected = true;
            }
            unitselect.add(new Option(item.description, item.id.trim(), selected, selected));
          });
        }else{
          unitselect.add(new Option('No Unit Found', ''));
        }
       
      })
      .catch((error) => {
        unitselect.length = 0;
        unitselect.add(new Option('Error Fetching Units', ''));
        console.log('Exception comes:' + error);
      });
  }

  stopset = () => {
    this.setState({clear:false});
  }


  resetForm = () => {
    this.setState(this.baseState);
    const { translations } = this.props;
    console.log("FORM RESET DONE");
    if (confirm(translations["ClearConfirmation"])) {
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
    const ses = JSON.parse(localStorage.getItem('session')); 
    const { translations } = this.props;
    const {platform} = this.state;
    
    const generalFields = [
      { name:translations["Platform Specifications"], type: 'dropdown', ddID: 'Platform/GetPlatforms', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      //{ name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'tailNumber', required: true, regexType:'Alphanumeric', regex: '^[a-zA-Z0-9]+$' },
      { name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'tailNumber', required: true },
      { name: translations['callSign'], type: 'input', domID: 'callSign', valFieldID: 'callSign' },

      //{ name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'COCOM'},
      { name: translations['Contract Company'], type: 'input', domID: 'Company', valFieldID: 'Company', required: true },
     // { name: translations['Branch'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID: 'branch', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: `Units/GetUnits?branchID=${ses.Branch}`, valFieldID: 'owningUnit'  , required: true},

      //{ name: translations['Deployed Unit'], type: 'dropdown', domID: 'dispDeployedUnit', ddID: 'Units/GetUnits?onlyUsersDeployedUnits=true', valFieldID: 'deployedUnit'},
      { name: translations['Location Category'], type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' , required: true},
      { name: translations['Location ID'], type: 'dropdown', domID: 'locationID', ddID: `Locations/GetLocationsByCategory?Category=${platform.locationcategory}`, valFieldID: 'locationID' , required: true}
    ];

    const payloadFields = [
      { name: translations['Payload #1'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload1', valFieldID: 'payload1' },
      { name: translations['Payload #2'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload2', valFieldID: 'payload2' },
      { name: translations['Payload #3'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload3', valFieldID: 'payload3' },
      { name: translations['Payload #4'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload4', valFieldID: 'payload4' },
      { name: translations['Payload #5'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload5', valFieldID: 'payload5' },
      { name: translations['Payload #6'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload6', valFieldID: 'payload6' },
      { name: translations['Payload #7'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload7', valFieldID: 'payload7' },
      { name: translations['Payload #8'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload8', valFieldID: 'payload8' },
     
     
    ];

    const armsFields = [
      { name: translations['Armament #1'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament1', valFieldID: 'armament1' },
      { name: translations['Armament #2'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament2', valFieldID: 'armament2' },
      { name: translations['Armament #3'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament3', valFieldID: 'armament3' },
      { name: translations['Coms Type #1'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs1', valFieldID: 'coms1' },
      { name: translations['Coms Type #2'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs2', valFieldID: 'coms2' },
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} >
        {/*  <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> */}
              <Loader loading={this.state.loading} />

        <div className="payload-content">
          {/* <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                Add Platform Inventory
              </div>

              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div> */}

          <div className="row personnel" >
            <div className="under-munitions-content">
              <ContentBlock fields={generalFields} data={this.handlePlatformGeneralData} initstate={this.state.platform} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={payloadFields} data={this.handlePayloadData} initstate={this.state.platform} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={armsFields} data={this.handleArmsData} initstate={this.state.platform} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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
{/*               {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
 */}
 
               {translations['submit']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddPlatformInventory.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePlatformInventory: state.platforminventory.onePlatformInventory,
    isAdded: state.platforminventory.isAdded,
    isUpdated: state.platforminventory.isUpdated,
    error: state.platforminventory.error,
  };
};

const mapDispatchToProps = {
  addPlatformInventory,
  fetchPlatformInventoryById,
  updatePlatformInventory,
  uploadFile,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlatformInventory);
