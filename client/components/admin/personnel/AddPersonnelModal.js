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

import axios from 'axios';

import { getTranslations, addPersonnel, fetchPersonnels, uploadFile } from '../../../actions/actions';


class AddPersonnelModal extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            imagePreviewUrl2: '',
            personnel: {
                PersonnelPhoto: '',
                FirstName: '',
                MiddleInitial: '',
                LastName: '',
                PayGrade: '',
                Rank: '',
                Nationality: '',
                Clearance: '',
                CACid: '',
                CallSign: '',
                ServiceBranch: '',
                Company: '',
                AssignedUnit: '',
                DeployedUnit: '',
                MOS1: '',
                MOS2: '',
                MOS3: '',
                DutyPosition1: '',
                DutyPosition2: '',
                DutyPosition3: '',
                SpecialQuals1: '',
                SpecialQuals2: '',
                SpecialQuals3: '',
                CurrentAssignmentStart: '',
                CurrentAssignmentEnd: '',
                DSN: '',
                EmailNIPR: '',
                EmailSIPR: '',
                ChatID: ''
            },

        }
        this.resetForm = this.resetForm.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;
  }

  handleGeneralPersonnelData = (generalData) => {
      const {personnel} = this.state;
      this.setState({
          personnel: {
              ...personnel,
              FirstName: generalData.FirstName,
              MiddleInitial: generalData.MiddleInitial,
              LastName: generalData.LastName,
              PayGrade: generalData.PayGrade,
              Rank: generalData.Rank,
              Nationality: generalData.Nationality,
              Clearance: generalData.Clearance,
              CACid: generalData.CACid,
              CallSign: generalData.CallSign
          }
      }, () => {
          console.log("New state in ASYNC callback:22222", this.state.personnel);
      });
  }

  handleOrganizationAndDutyData = (organizationAndDutyData) => {
      const {personnel} = this.state;
      this.setState({
          personnel: {
              ...personnel,
              ServiceBranch: organizationAndDutyData.ServiceBranch,
              Company: organizationAndDutyData.Company,
              AssignedUnit: organizationAndDutyData.AssignedUnit,
              DeployedUnit: organizationAndDutyData.DeployedUnit,
              DutyPosition1: organizationAndDutyData.DutyPosition1,
              MOS1: organizationAndDutyData.MOS1,
              DutyPosition2: organizationAndDutyData.DutyPosition2,
              MOS2: organizationAndDutyData.MOS2,
              DutyPosition3: organizationAndDutyData.DutyPosition3,
              MOS3: organizationAndDutyData.MOS3,
              CurrentAssignmentStart: organizationAndDutyData.CurrentAssignmentStart,
              CurrentAssignmentEnd: organizationAndDutyData.CurrentAssignmentEnd,
              SpecialQuals1: organizationAndDutyData.SpecialQuals1,
              SpecialQuals2: organizationAndDutyData.SpecialQuals2,
              SpecialQuals3: organizationAndDutyData.SpecialQuals3,

          }
      }, () => {
          console.log("New state in ASYNC callback:11111", this.state.personnel);
      });
  }

  handleContactInformationData = (contactInformationData) => {
      const {personnel} = this.state;
      this.setState({
          personnel: {
              ...personnel,
              DSN: contactInformationData.DSN,
              EmailNIPR: contactInformationData.EmailNIPR,
              EmailSIPR: contactInformationData.EmailSIPR,
              ChatID: contactInformationData.ChatID
          }
      }, () => {
          console.log("New state in ASYNC callback3333:", this.state.personnel);
      });
  }

  handleUploadImgFile(event){
      event.preventDefault();
      const {personnel} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
              imagePreviewUrl2: reader.result
          });
      }
      reader.readAsDataURL(file)

      let parametername = event.target.id;

      this.setState({
          personnel: {
              ...personnel,
              [parametername]: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.personnel);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);


  /*    axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      }); */

  }

  handleUploadTxtFile(event) {
      event.preventDefault();

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
          });
      }
      reader.readAsDataURL(file)

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);


      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });

  }

  handleUploadFile(event){
      event.preventDefault();
      const {payload} = this.state;
      if(event.target.id == "PayloadPhoto") {
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
          payload: {
              ...payload,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.payload);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      // this.props.uploadFile(data);
  }

  handleSubmit = event => {
      event.preventDefault();
      console.log('--here--');
      console.log(this.state.personnel);
      let flag;
      this.props.addPersonnel(this.state.personnel);
      this.props.onClose();
      this.props.fetchPersonnels();
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
      $imagePreview = (<img src="/images/admin/photo_1.png" className="photo" alt=""/>);
    }

    let {imagePreviewUrl2} = this.state;
    let $imagePreview2 = '';

    if (imagePreviewUrl2) {
      $imagePreview2 = (<img src={imagePreviewUrl2} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview2 = (<img src="/images/admin/primoris_backgr.png" className="photo" alt=""/>);
    }

    const {personnel} = this.state;
    const {translations: {translations}} = this.props;

    const generalFields = [
        {name: translations['First Name'], type: 'input', domID: 'FirstName', valFieldID: 'FirstName'},
        {name: translations['Middle Initial'], type: 'input', domID: 'MiddleInitial', valFieldID: 'MiddleInitial'},
        {name: translations['Last Name'], type: 'input', domID: 'LastName', valFieldID: 'LastName'},
        {name: translations['Rank'], type: 'dropdown', domID: 'dispRank', ddID: "Ranks", valFieldID: 'Rank'},
        {name: translations['Pay Grade'], type: 'dropdown', domID: 'dispPayGrade', ddID: "PayGrades", valFieldID: 'PayGrade'},
        {name: translations['Nationality'], type: 'dropdown', domID: 'dispNationality', ddID: "Countries", valFieldID: 'Nationality'},
        {name: translations['Clearance Level'], type: 'dropdown', domID: 'dispClearance', ddID: "Clearance", valFieldID: 'Clearance'},
        {name: translations['CAC ID'], type: 'input', domID: 'CACid'},
        {name: translations['Call Sign'], type: 'input', domID: 'CallSign'},
    ];

    const organisationFields = [
        {name: translations['Branch'], type: 'dropdown', domID: 'dispServiceBranch', ddID: "BranchOfService", valFieldID: 'ServiceBranch'},
        {name: translations['Company'], type: 'dropdown', domID: 'dispCompany', ddID: "Companies", valFieldID: 'Company'},
        {name: translations['Assigned Unit'], type: 'dropdown', domID: 'dispAssignedUnit', ddID: "Units", valFieldID: 'AssignedUnit'},
        {name: translations['Deployed Unit'], type: 'dropdown', domID: 'dispDeployedUnit', ddID: "Units", valFieldID: 'DeployedUnit'},
        {name: translations['Duty Position#1'], type: 'dropdown', domID: 'dispDutyPosition1', ddID: "DutyPosition", valFieldID: 'DutyPosition1'},
        {name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'MOS1'},
        {name: translations['Duty Position#2'], type: 'dropdown', domID: 'dispDutyPosition2', ddID: "DutyPosition", valFieldID: 'DutyPosition2'},
        {name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'MOS2'},
        {name: translations['Duty Position#3'], type: 'dropdown', domID: 'dispDutyPosition3', ddID: "DutyPosition", valFieldID: 'DutyPosition3'},
        {name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'MOS3'},
        {name: translations['Special Quats']+'1', type: 'dropdown', domID: 'dispSpecialQuals1', ddID: "SpecQuals", valFieldID: 'SpecialQuals1'},
        {name: translations['Special Quats']+'2', type: 'dropdown', domID: 'dispSpecialQuals2', ddID: "SpecQuals", valFieldID: 'SpecialQuals2' },
        {name: translations['Dates of Current Assignment Start'], type: 'date', domID: 'CurrentAssignmentStart',  valFieldID: 'CurrentAssignmentStart'},
        {name: translations['Dates of Current Assignment End'], type: 'date', domID: 'CurrentAssignmentEnd', valFieldID: 'CurrentAssignmentEnd' }
        
    ];

    const contactFields = [
        {name: translations['DSN'], type: 'input', domID: 'DSN', valFieldID: 'DSN'},
        {name: translations['Email-NIPR'], type: 'input', domID: 'EmailNIPR', valFieldID: 'EmailNIPR'},
        {name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'EmailSIPR'},
        {name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'ChatID'},

    ];

    return (
      <div className="payload-modal modal-overlay" >
      <form action="" onSubmit={this.handleSubmit} >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/images/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="payload-content">
            <div className="row personnel" >
              <div className="header-line">
                <img src="/images/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  {translations["Personnel Administration"]}
                </div>
                <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
              </div>
              <div className="personnel-content">
                <div className="col-md-4 image-block">
                  {$imagePreview}
                </div>
                <div className="col-md-4 image-block">
                  {$imagePreview2}
                </div>
                <div className="col-md-4 upload-block">
                  <div className="upload-imagery">
                    <img src="/images/admin/upload_1.png" alt=""/>
                    <div className="header-text">
                      upload imagery & datasheets
                    </div>
                    <img className="mirrored-X-image" src="/images/admin/upload_1.png" alt=""/>
                  </div>
                  <div className="upload-content">
                    <div className="upload-line">
                      <div>
                        {translations['Photo Image']}
                      </div>
                      <input type="file"  name="file" id="PayloadPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right"  required/>
                    </div>
                    <div className="upload-line">
                      <div>
                        Organization Logo
                      </div>
                      <input type="file"  name="file" id="PaylodWireframe" onChange= {this.handleUploadImgFile.bind(this)} className="hidden_input pull-right" required/>
                    </div>
                    <div className="upload-line">
                      <div>
                        Datasheet
                      </div>
                      <input type="file"  name="file" id="Datasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-payload-content">
                <ContentBlock headerLine="/images/admin/upload_1.png" title={translations["General"]}
                                      fields={generalFields} data={this.handleGeneralPersonnelData} initstate ={this.state.personnel}/>
                <ContentBlock headerLine="/images/admin/upload_1.png"
                              title="Organization & Duty" fields={organisationFields}
                              data={this.handleOrganizationAndDutyData} initstate ={this.state.personnel}/>
                <ContentBlock headerLine="/images/admin/upload_1.png"
                              title={translations["Contact Information"]} fields={contactFields}
                              data={this.handleContactInformationData} initstate ={this.state.personnel} />
              </div>
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
                {translations['clear']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className='highlighted-button'>
                {translations['Delete']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button type="submit" className='highlighted-button'>
                {translations['save']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

AddPersonnelModal.propTypes = {
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

    addPersonnel: (personnel) => {
      dispatch(addPersonnel(personnel));
      console.log("Cool");
    },

    fetchPersonnels: () => {
      dispatch(fetchPersonnels());
    },

    uploadFile: (fileData) => {
      dispatch(uploadFile(fileData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnelModal);
