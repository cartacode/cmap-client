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
import { addMunition, fetchMunitions, fetchMunitionsById, updateMunition } from 'actions/munition';

class MissileModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: '',
      editFetched: false,
      clear:false,
      imagePreviewUrl: '',
      oneMunition: {},
     /*  munition: {
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
      } */
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    //this.props.fetchMunitions();
  }

  /**
   * Auto invoked functions and Once initialized.
   */
  componentDidMount = () => {
    let { editId } = this.props;
    if (editId !== '0') {
      this.props.fetchMunitionsById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            munition: this.props.oneMunition,
          });
      });
    }
  }

  /**
   * Auto invoked functions. This Function works like as listener. This will update or call during changes in the value of input fields.
   */
  componentDidUpdate = (prevProps, prevState) => {
    let { editId } = this.props;
    if (editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchMunitionsById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            munition: this.props.oneMunition,
          });
      });
    }
  }

  stopupd = () => {
    this.setState({ editFetched: false });
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
        MunitionCostNotes: generalData.MunitionCostNotes,
        MunitionType: this.props.munitionType,
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
        MunitionLength: technicalData.MunitionLength,
        MunitionWidthDiameter: technicalData.MunitionWidthDiameter,
        MunitionHeight: technicalData.MunitionHeight,
        MunitionWeight: technicalData.MunitionWeight,
        MunitionWingspan: technicalData.MunitionWingspan,
        MunitionWarhead: technicalData.MunitionWarhead,
        MunitionEngine: technicalData.MunitionEngine,
        MunitionRange: technicalData.MunitionRange,
        MunitionSpeed: technicalData.MunitionSpeed,
        MunitionGuideanceSys: technicalData.MunitionGuideanceSys,
        MunitionLaunchPlatform: technicalData.MunitionLaunchPlatform,
        MunitionWeatherRestriction: technicalData.MunitionWeatherRestriction
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

      // this.props.uploadFile(data);
  }

  handleSubmit = event => {
    debugger;
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.munition);
    const {  munition } = this.state;
    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      munition.MunitionID = editId;
      this.props.updateMunition(editId, munition).then( () => {this.props.onClose('UPDATE');});
    } else {
      this.props.addMunition(munition).then( () => {this.props.onClose('ADD');});
    }
    
  }

  stopset () {
    this.setState({clear:false});
  }

  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
       this.setState({clear:true});
       document.getElementById('munitionform').reset();
     }
     else {
 
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

    /* let {munition} = this.state; */
    const {translations} = this.props;
    const { munitionType } = this.props;
    console.log("**************************************************Missile munitionType*************************************"+munitionType);


    const generalFields = [
      {name: translations['Serial#'], type: 'number', domID: 'MunitionSerial', valFieldID: 'MunitionSerial',required:true},
      {name: translations['Owning Unit'], type: 'dropdown', domID: 'MunitionOwningUnit', ddID: 'Units', valFieldID: 'MunitionOwningUnit'},
      {name: translations['Munition Name'], type: 'input', domID: 'MunitionName', valFieldID: 'MunitionName',required:true},
      {name: translations['Munition Nomenclature'], type: 'input', domID: 'MunitionNomenclature', valFieldID: 'MunitionNomenclature',required:true},
      {name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'MunitionRoles', valFieldID: 'MunitionRole',required:true},
      {name: translations['Manufacture'], type: 'dropdown', domID: 'dispMunitionManufacturer', ddID: 'Companies/GetCompanies', valFieldID:'MunitionManufacturer',required:true},
      {name: translations['Service Executive Agent'], type: 'input', domID: 'MunitionExecutiveAgent', valFieldID: 'MunitionExecutiveAgent',required:true},
      {name: translations['Contract Program'], type: 'input', domID: 'MunitionContractProgram', valFieldID: 'MunitionContractProgram',required:true},
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
      {name: translations['Length (in.)'], type: 'number', domID: 'MunitionLength', valFieldID: 'MunitionLength',required:true},
      {name: translations['Width/Diameter (in.)'], type: 'number', domID: 'MunitionWidthDiameter', valFieldID: 'MunitionWidthDiameter',required:true},
      {name: translations['Height (in.)'], type: 'number', domID: 'MunitionHeight', valFieldID: 'MunitionHeight',required:true},
      {name: translations['Weight (lbs.)'], type: 'number', domID: 'MunitionWeight', valFieldID: 'MunitionWeight',required:true},
      {name: translations['Wingspan (in.)'], type: 'number', domID: 'MunitionWingspan', valFieldID: 'MunitionWingspan',required:true},
      {name: translations['Warhead'], type: 'input', domID: 'MunitionWarhead', valFieldID: 'MunitionWarhead'},
      {name: translations['Engine'], type: 'input', domID: 'MunitionEngine', valFieldID: 'MunitionEngine'},
      {name: translations['Operational Range (miles)'], type: 'number', domID: 'MunitionRange', valFieldID: 'MunitionRange',required:true},
      {name: translations['Speed (mph)'], type: 'number', domID: 'MunitionSpeed', valFieldID: 'MunitionSpeed',required:true},
      {name: translations['Guidance System'], type: 'input', domID: 'MunitionGuidanceSys', valFieldID: 'MunitionGuideanceSys'},
      {name: translations['Launch Platform'], type: 'input', domID: 'MunitionLaunchPlatform', valFieldID: 'MunitionLaunchPlatform'},
      {name: translations['Weather Restriction'], type: 'input', domID: 'MunitionWeatherRestriction', valFieldID:'MunitionWeatherRestriction'},
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="munitionform">

         {/*  <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div> */}
          <div className="payload-content">
            <div className="row personnel" >
              <div className="header-line">
                <img src="/assets/img/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  {translations["missile administration"]}
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
                      <input type="file"  name="file" id="MunitionPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Wireframe Image']}
                      </div>
                      <input type="file"  name="file" id="MunitionWireframe" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['3D Model']}
                      </div>
                      <input type="file"  name="file" id="Munition3D" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['2D Icon']}
                      </div>
                      <input type="file"  name="file" id="MunitionIcon" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Milspec Icon']}
                      </div>
                      <input type="file"  name="file" id="Munition2525B" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Datasheets']}
                      </div>
                      <input type="file"  name="file" id="MunitionDatasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-munitions-content">
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields}
                data={this.handleMunitionGeneralData} initstate ={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}  
                editFetched={this.state.editFetched} stopupd={this.stopupd} />
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields}
                data={this.handleMunitionCrewData} initstate ={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Technical specification"]} fields={technicalFields}
                data={this.handleMunitionTechnicalData} initstate ={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd}/>
              </div>
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="button" className='highlighted-button' onClick={this.resetForm.bind(this)}>
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

MissileModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMunition: state.munitions.oneMunition,
  };
};

const mapDispatchToProps = {
  addMunition,
  updateMunition,
  fetchMunitions,
  fetchMunitionsById,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MissileModal);
