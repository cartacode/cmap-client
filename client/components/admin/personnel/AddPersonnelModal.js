import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import { baseUrl } from 'dictionary/network';

// import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
// import CustomDatePicker from '../../reusable/CustomDatePicker';
// import DropDownButton from '../../reusable/DropDownButton';
// import StatusTable from '../../reusable/StatusTable';

import axios from 'axios';

import { uploadFile } from 'actions/file';
import { addPersonnel, updatePersonnel, fetchPersonnels, fetchPersonnelById } from 'actions/personnel';

class AddPersonnelModal extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            selectedBranch: '',
            selectedRank: '',
            file: '',
            clear:false,
            editF:false,
            imagePreviewUrl: '',
            imagePreviewUrl2: '',
            personnel: {
            //     PersonnelPhoto: '',
            //     FirstName: '',
            //     MiddleInitial: '',
            //     LastName: '',
            //     PayGrade: '',
            //     Rank: '',
            //     Nationality: '',
            //     Clearance: '',
            //     CACid: '',
            //     CallSign: '',
            //     ServiceBranch: '',
            //     Company: '',
            //     AssignedUnit: '',
            //     DeployedUnit: '',
            //     MOS1: '',
            //     MOS2: '',
            //     MOS3: '',
            //     DutyPosition1: '',
            //     DutyPosition2: '',
            //     DutyPosition3: '',
            //     SpecialQuals1: '',
            //     SpecialQuals2: '',
            //     SpecialQuals3: '',
            //     CurrentAssignmentStart: '',
            //     CurrentAssignmentEnd: '',
            //     DSN: '',
            //     EmailNIPR: '',
            //     EmailSIPR: '',
            //     ChatID: ''
            },
            onePersonnel: {},
        }
        this.resetForm = this.resetForm.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;
  }

  componentDidMount = () => {
    // this.setState({personnel: this.props.personnel});
    let { editId } = this.props;

    if(editId !== '0') {
        console.log("this is called");
        console.log("Edit ID is"+editId);
      this.props.fetchPersonnelById(editId).then(() => { this.state.personnel = this.props.onePersonnel; });
    }
  }

  componentDidUpdate = () => {
    // this.setState({personnel: this.props.personnel});
    let {editForm} = this.props;
    let { editId } = this.props;
    console.log("Outer Update Called");
    if(editForm) {
        console.log("Inner Update Called");
        this.props.stopupdate();
        this.props.fetchPersonnelById(editId).then(() => {this.setState({editF:true}); this.state.personnel = this.props.onePersonnel;});
        
    }
  }

  stopupd = () => {
    this.setState({editF:false});
  }

  
  handleGeneralPersonnelData = (generalData) => {
    const { personnel } = this.state;
    console.log("Genera data is");
    console.log(generalData);
    console.log("Personnel State is");
    console.log(personnel);
    
    if( generalData.ServiceBranch && generalData.ServiceBranch !== this.state.selectedBranch) {
      this.updateRanks(generalData.ServiceBranch);
    }

    if( generalData.Rank && generalData.Rank !== this.state.selectedRank ) {
      this.updatePaygrade(generalData.Rank);
    }

    this.setState({
      personnel: {
        ...personnel,
        FirstName: generalData.FirstName,
        MiddleInitial: generalData.MiddleInitial,
        LastName: generalData.LastName,
        ServiceBranch: generalData.ServiceBranch,
        PayGrade: generalData.PayGrade,
        Rank: generalData.Rank,
        Nationality: generalData.Nationality,
        Clearance: generalData.Clearance,
        CACid: generalData.CACid,
        CallSign: generalData.CallSign,
      },
      selectedBranch: generalData.ServiceBranch,
      selectedRank: generalData.Rank,
    });

      //let personnell = generalData.Rank;
      //this.setPaygrade(personnell);
  }

  handleOrganizationAndDutyData = (organizationAndDutyData) => {
    const { personnel } = this.state;
    this.setState({
      personnel: {
        ...personnel,        
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
      },
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
          },
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
        //   console.log("New state in ASYNC callback:", this.props.personnel);
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
    let {  personnel } = this.state;
    let { editId } = this.props;
  
    if (editId !== undefined && editId !== '0') {
      
    //   const data = {
    //     id: editId,
    //     personnel: personnel
    //   }
        
      personnel.PersonnelID = editId;
      console.log('handle Submit '+ JSON.stringify(personnel));
      this.props.updatePersonnel(editId, personnel).then(() => {
        this.props.onClose();
      });
    } else {
      this.props.addPersonnel(this.state.personnel).then(() => {
        this.props.onClose();
      });
    }

    
    
  }

updateRanks= (branch) => {

    let rankSelect = document.getElementsByName('Rank')[0];
    let items = [{'label': '--Select Item--', 'value': 0}];
    const apiUrl = `${baseUrl}/Ranks/GetRanksByBranch?branchID=${branch}`;
       axios.get(apiUrl)
         .then(response => {
           console.log(response.data);
           if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
           response.data.map(item => {
             items.push({ 'label': item['description'], 'value': item['id'].trim() });
           });
           if (rankSelect.length > 0) {
               rankSelect.length = 0;
            }
           for(let i in items) {
            rankSelect.add(new Option(items[i].label, items[i].value));
           }
           
         })
         .catch((error) => {
           console.log('Exception comes:' + error);
         });

}

updatePaygrade= (rank) => {

    let paygradeSelect = document.getElementsByName('PayGrade')[0];
    const { personnel } = this.state;
    const apiUrl = `${baseUrl}/PayGrades/GetPayGradesByRank?rankID=${rank}`;
       axios.get(apiUrl)
         .then(response => {
             const paygrade = response.data[0];
             console.log(paygrade);
            this.setState({personnel: {  ...personnel, 
                PayGrade: paygrade.id }
            });
                paygradeSelect.selectedIndex = paygrade.id;
           
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
       document.getElementById('personnelform').reset();
     }
     else {
 
     }
  }

  render() {
    

    // const { show } = this.props;
    // // Render nothing if the "show" prop is false
    // if(!show) {
    //     return null;
    //   }


    let {imagePreviewUrl} = this.state;
    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview = (<img src="/assets/img/admin/photo_1.png" className="photo" alt=""/>);
    }

    let {imagePreviewUrl2} = this.state;
    let $imagePreview2 = '';

    if (imagePreviewUrl2) {
      $imagePreview2 = (<img src={imagePreviewUrl2} alt="" className="photo" alt=""/>);
    }
    else {
      $imagePreview2 = (<img src="/assets/img/admin/primoris_backgr.png" className="photo" alt=""/>);
    }

    
    
    const {translations} = this.props;

    const generalFields = [
        {name: translations['First Name'], type: 'input', domID: 'FirstName', valFieldID: 'FirstName', required:true},

        {name: translations['Middle Initial'], type: 'input', domID: 'MiddleInitial', valFieldID: 'MiddleInitial'},
        {name: translations['Last Name'], type: 'input', domID: 'LastName', valFieldID: 'LastName', required:true},
        {name: translations['Branch'], type: 'dropdown', domID: 'dispServiceBranch', ddID: "BranchOfService", valFieldID: 'ServiceBranch'},
        {name: translations['Rank'], type: 'dropdown', domID: 'dispRank', ddID: "Ranks", valFieldID: 'Rank'},
        {name: translations['Pay Grade'], type: 'dropdown', domID: 'dispPayGrade', ddID: "PayGrades", valFieldID: 'PayGrade'},
        {name: translations['Nationality'], type: 'dropdown', domID: 'dispNationality', ddID: "Countries", valFieldID: 'Nationality', required:true},
        {name: translations['Clearance Level'], type: 'dropdown', domID: 'dispClearance', ddID: "Clearance", valFieldID: 'Clearance', required:true},
        {name: translations['CAC ID'], type: 'input', domID: 'CACid', valFieldID: 'CACid'},
        {name: translations['Call Sign'], type: 'input', domID: 'CallSign', valFieldID:'CallSign'},
    ];

    const organisationFields = [
        {name: translations['Company'], type: 'dropdown', domID: 'dispCompany', ddID: "Companies", valFieldID: 'Company'},
        {name: translations['Assigned Unit'], type: 'dropdown', domID: 'dispAssignedUnit', ddID: "Units", valFieldID: 'AssignedUnit'},
        {name: translations['Deployed Unit'], type: 'dropdown', domID: 'dispDeployedUnit', ddID: "Units", valFieldID: 'DeployedUnit'},
        {name: translations['Duty Position#1'], type: 'dropdown', domID: 'dispDutyPosition1', ddID: "DutyPosition", valFieldID: 'DutyPosition1'},
        {name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'MOS1'},
        {name: translations['Duty Position#2'], type: 'dropdown', domID: 'dispDutyPosition2', ddID: "DutyPosition", valFieldID: 'DutyPosition2'},
        {name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'MOS2'},
        {name: translations['Duty Position#3'], type: 'dropdown', domID: 'dispDutyPosition3', ddID: "DutyPosition", valFieldID: 'DutyPosition3'},
        {name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'MOS3'},
        {name: translations['Special Qualifications']+' 1', type: 'dropdown', domID: 'dispSpecialQuals1', ddID: "SpecQuals", valFieldID: 'SpecialQuals1'},
        {name: translations['Special Qualifications']+' 2', type: 'dropdown', domID: 'dispSpecialQuals2', ddID: "SpecQuals", valFieldID: 'SpecialQuals2' },
        {name: translations['Dates of Current Assignment Start'], type: 'date', domID: 'CurrentAssignmentStart',  valFieldID: 'CurrentAssignmentStart'},
        {name: translations['Dates of Current Assignment End'], type: 'date', domID: 'CurrentAssignmentEnd', valFieldID: 'CurrentAssignmentEnd' }

    ];

    const contactFields = [
        {name: translations['DSN'], type: 'input', domID: 'DSN', valFieldID: 'DSN', required:true},
        {name: translations['Email-NIPR'], type: 'email', domID: 'EmailNIPR', valFieldID: 'EmailNIPR', required:true},
        {name: translations['Email-SIPR'], type: 'email', domID: 'EmailSIPR', valFieldID: 'EmailSIPR', required:true},
        {name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'ChatID'},

    ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="personnelform">
          <div className="payload-content">
            <div className="row personnel" >
              <div className="header-line">
                <img src="/assets/img/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  {translations["Personnel Administration"]}              

                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
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
                      <input type="file"  name="file" id="PayloadPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*"  />
                    </div>
                    <div className="upload-line">
                      <div>
                        Organization Logo 
                      </div>
                      <input type="file"  name="file" id="PaylodWireframe" onChange= {this.handleUploadImgFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                    </div>
                    <div className="upload-line">
                      <div>                      
                   Datasheet 
                      </div>
                      <input type="file"  name="file" id="Datasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-payload-content">
                <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]}
                                      fields={generalFields} data={this.handleGeneralPersonnelData} initstate ={this.props.onePersonnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editF = {this.state.editF} stopupd = {this.stopupd}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png"
                              title="Organization & Duty" fields={organisationFields}
                              data={this.handleOrganizationAndDutyData} initstate ={this.props.onePersonnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editF = {this.state.editF} stopupd = {this.stopupd}/>
                <ContentBlock headerLine="/assets/img/admin/upload_1.png"
                              title={translations["Contact Information"]} fields={contactFields}
                              data={this.handleContactInformationData} initstate ={this.props.onePersonnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editF = {this.state.editF} stopupd = {this.stopupd}/>
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

AddPersonnelModal.propTypes = {
  onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
  editId: PropTypes.string,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePersonnel: state.personnels.onePersonnel    
  };
};

const mapDispatchToProps = {
  addPersonnel,
  updatePersonnel,
  fetchPersonnels,
  uploadFile,
  fetchPersonnelById,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnelModal);
