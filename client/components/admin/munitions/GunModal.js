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

import { getTranslations } from '../../../actions/actions';
import { uploadFile } from 'actions/file';
import { addMunition, fetchMunitions } from 'actions/munition';

class GunModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      munition: {
        MunitionsReferenceCode: '',
        MunitionWireframe: '',
        MunitionPhoto: '',
        Munition3D: '',
        MunitionIcon: '',
        Munition2525B: '',
        MunitionDatasheet: '',
        MunitionName: '',
        MunitionNomenclature: '',
        MunitionRole: '',
        MunitionManufacturer: '',
        MunitionExecutiveAgent: '',
        MunitionContractProgram: '',
        MunitionCost: '',
        MunitionCostNotes: '',
        MunitionLength: '',
        MunitionWidthDiameter: '',
        MunitionWeight: '',
        MunitionWingspan: '',
        MunitionWarhead: '',
        MunitionEngine: '',
        MunitionRange: '',
        MunitionSpeed: '',
        MunitionGuideanceSys: '',
        MunitionLaunchPlatform: '',
        MunitionWeatherRestriction: '',
        MunitionCrewCount: '',
        MunitionMOS1: '',
        MunitionMOS2: '',
        MunitionMOS3: '',
      }
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
      munition: {
        ...munition,
        MunitionSerial: generalData.MunitionSerial,
        MunitionOwningUnit: generalData.MunitionOwningUnit,
        MunitionName: generalData.MunitionName,
        MunitionNomenclature: generalData.MunitionNomenclature,
        MunitionRole: generalData.MunitionRole,
        MunitionManufacturer: generalData.MunitionManufacturer,
        MunitionExecutiveAgent: generalData.MunitionExecutiveAgent,
        MunitionContractProgram: generalData.MunitionContractProgram,
        MunitionCost: generalData.MunitionCost,
        MunitionCostNotes: generalData.MunitionCostNotes
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }

  handleMunitionTechnicalData = (technicalData) => {
    const {munition} = this.state;
    this.setState({
      munition: {
        ...munition,
        MunitionType: technicalData.MunitionType,
        MunitionCaliber: technicalData.MunitionCaliber,
        MunitionDriveSystem: technicalData.MunitionDriveSystem,
        MunitionFeedSystem: technicalData.MunitionFeedSystem,
        MunitionRateFire: technicalData.MunitionRateFire,
        MunitionMuzzleVelocity: technicalData.MunitionMuzzleVelocity,
        MunitionProjectileWeight: technicalData.MunitionProjectileWeight,
        MunitionMusselEnergy: technicalData.MunitionMusselEnergy,
        MunitionLength: technicalData.MunitionLength,
        MunitionWidthDiameter: technicalData.MunitionWidthDiameter,
        MunitionHeight: technicalData.MunitionHeight,
        MunitionWeightUnloaded: technicalData.MunitionWeightUnloaded,
        MunitionRoundsCarried: technicalData.MunitionRoundsCarried
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }

  handleMunitionCrewData = (crewData) => {
    const {munition} = this.state;
    this.setState({
      munition: {
        ...munition,
        MunitionCrewCount: crewData.MunitionCrewCount,
        MunitionMOS1: crewData.MunitionMOS1,
        MunitionMOS2: crewData.MunitionMOS2,
        MunitionMOS3: crewData.MunitionMOS3
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }


  handleUploadFile(event){
      event.preventDefault();
      const {munition} = this.state;
      if(event.target.id == "MunitionPhoto") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
      }

      let parametername = event.target.id;

      this.setState({
          munition: {
              ...munition,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.munition);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      //this.props.uploadFile(data);
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

    let {imagePreviewUrl} = this.state;
    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview = (<img src="/assets/img/admin/rockets.png" className="photo" alt=""/>);
    }

    const {munition} = this.state;
    const {translations: {translations}} = this.props;


    const generalFields = [
      {name: translations['Serial#'], type: 'input', domID: 'MunitionSerial', valFieldID: 'MunitionSerial'},
      {name: translations['Owning Unit'], type: 'dropdown', domID: 'MunitionOwningUnit', ddID: 'Units', valFieldID: 'MunitionOwningUnit'},
      {name: translations['Munition Name'], type: 'input', domID: 'MunitionName', valFieldID: 'MunitionName'},
      {name: translations['Munition Nomenclature'], type: 'input', domID: 'MunitionNomenclature', valFieldID: 'MunitionNomenclature'},
      {name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'MunitionRoles', valFieldID: 'MunitionRole'},
      {name: translations['Manufacture'], type: 'dropdown', domID: 'dispMunitionManufacturer', ddID: 'Manufacturer', valFieldID:'MunitionManufacturer'},
      {name: translations['Service Executive Agent'], type: 'input', domID: 'MunitionExecutiveAgent', valFieldID: 'MunitionExecutiveAgent'},
      {name: translations['Contract Program'], type: 'input', domID: 'MunitionContractProgram', valFieldID: 'MunitionContractProgram'},
      {name: translations['Cost'], type: 'number', domID: 'MunitionCost', valFieldID: 'MunitionCost'},
      {name: translations['Cost notes'], type: 'input', domID: 'MunitionCostNotes', valFieldID: 'MunitionCostNotes'},
    ];

    const crewFields = [
      {name: translations['Munitions Crew Count'], type: 'number', domID: 'MunitionCrewCount', valFieldID: 'MunitionCrewCount'},
      {name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'MunitionMOS1'},
      {name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'MunitionMOS2'},
      {name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'MunitionMOS3'},
    ];

    const technicalFields = [
      {name: translations['Type'], type: 'input', domID: 'MunitionType', valFieldID: 'MunitionType'},
      {name: translations['Caliber'], type: 'input', domID: 'MunitionCaliber', valFieldID: 'MunitionCaliber'},
      {name: translations['Drive System'], type: 'input', domID: 'MunitionDriveSystem', valFieldID: 'MunitionDriveSystem'},
      {name: translations['Feed System'], type: 'input', domID: 'MunitionFeedSystem', valFieldID: 'MunitionFeedSystem'},
      {name: translations['Rate of Fire'], type: 'input', domID: 'MunitionRateFire', valFieldID: 'MunitionRateFire'},
      {name: translations['Muzzle Velocity'], type: 'input', domID: 'MunitionMuzzleVelocity', valFieldID: 'MunitionMuzzleVelocity'},
      {name: translations['Projectile Weight'], type: 'input', domID: 'MunitionProjectileWeight', valFieldID: 'MunitionProjectileWeight'},
      {name: translations['Mussel Energy'], type: 'input', domID: 'MunitionMusselEnergy', valFieldID: 'MunitionMusselEnergy'},
      {name: translations['Length'], type: 'number', domID: 'MunitionLength', valFieldID: 'MunitionLength'},
      {name: translations['Width/Diameter'], type: 'number', domID: 'MunitionWidthDiameter', valFieldID: 'MunitionWidthDiameter'},
      {name: translations['Height'], type: 'number', domID: 'MunitionHeight', valFieldID: 'MunitionHeight'},
      {name: translations['Weight Unloaded(lbs.)'], type: 'number', domID: 'MunitionWeightUnloaded', valFieldID: 'MunitionWeightUnloaded'},
      {name: translations['Weight Loaded(lbs.)'], type: 'number', domID: 'MunitionWeightLoaded', valFieldID: 'MunitionWeightLoaded'},
      {name: translations['Rounds Carried'], type: 'input', domID: 'MunitionRoundsCarried', valFieldID: 'MunitionRoundsCarried'},
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
                  {translations["guns administration"]}
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
              </div>
              <div className="personnel-content">
                <div className="col-md-8 image-block">
                  {$imagePreview}
                </div>
                <div className="col-md-4 upload-block">
                  <div className="upload-imagery">
                    <img src="/assets/img/admin/upload_1.png" alt=""/>
                    <div className="header-text">
                      upload imagery & datasheets
                    </div>
                    <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
                  </div>
                  <div className="upload-content">
                  <div className="upload-line">
                      <div>
                        {translations['Photo Image']}
                      </div>
                      <input type="file"  name="file" id="MunitionPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Wireframe Image']}
                      </div>
                      <input type="file"  name="file" id="MunitionWireframe" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['3D Model']}
                      </div>
                      <input type="file"  name="file" id="Munition3D" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['2D Icon']}
                      </div>
                      <input type="file"  name="file" id="MunitionIcon" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Milspec Icon']}
                      </div>
                      <input type="file"  name="file" id="Munition2525B" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Datasheets']}
                      </div>
                      <input type="file"  name="file" id="MunitionDatasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right"  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-munitions-content">
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields}
                data={this.handleMunitionGeneralData} initstate ={this.state.munition}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields}
                data={this.handleMunitionCrewData} initstate ={this.state.munition}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Technical specification"]} fields={technicalFields}
                data={this.handleMunitionTechnicalData} initstate ={this.state.munition}/>
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

GunModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addMunition: (munition) => {
      dispatch(addMunition(munition));
    },

    fetchMunitions: () => {
      dispatch(fetchMunitions());
    },

    uploadFile: (fileData) => {
      dispatch(uploadFile(fileData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GunModal);
