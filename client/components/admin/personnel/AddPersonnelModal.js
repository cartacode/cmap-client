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
import UploadFileBlock from '../../reusable/UploadFileBlock';
import {NoticeType} from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import { requestHeaders } from '../../../dictionary/network';

class AddPersonnelModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBranch: '',
      selectedRank: '',
      selectedPaygrade: '',
      file: '',
      clear: false,
      editFetched: false,
      imagePreviewUrl:"/assets/img/admin/photo_1.png",
      imagePreviewUrl2:"/assets/img/admin/primoris_backgr.png",
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
      
      personnelFiles: {
        PersonnelPhoto: null,
        OrganizationLogo: null,
        Datasheet: null,
      },
      isImagedRequired: true,
      loading:false
    }
    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  
  componentDidMount = () => {
    
    let { editId } = this.props;
    this.setState({ clear: true });
    if(editId !== '0') {
      this.editComponent(editId);
    }
  }


  componentDidUpdate = (prevProps, prevState) => {

    const { editId } = this.props;
    if (editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if (editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true,
        imagePreviewUrl:'',
        imagePreviewUrl2:''
       });
    }
  }

  editComponent = (editId) => {
    this.setState({
       imagePreviewUrl:'',
       imagePreviewUrl2:''
   });

    this.props.fetchPersonnelById(editId).then(() => {
      this.setState(
        {
          editFetched: true,
          personnel: this.props.onePersonnel,
          imagePreviewUrl: this.props.onePersonnel.PersonnelPhoto,
          imagePreviewUrl2: this.props.onePersonnel.OrganizationLogo,
          isImagedRequired:  false
        });
    });
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }
  
  handleGeneralPersonnelData = (generalData) => {
    const { personnel, selectedBranch, selectedRank } = this.state;

    this.setState({
      personnel: {
        ...personnel,
        FirstName: generalData.FirstName,
        MiddleInitial: generalData.MiddleInitial,
        LastName: generalData.LastName,
        ServiceBranch: generalData.ServiceBranch,
        Rank: generalData.Rank,
        PayGrade: generalData.PayGrade,
        Nationality: generalData.Nationality,
        Clearance: generalData.Clearance,
        CACid: generalData.CACid,
        CallSign: generalData.CallSign,
        UserName: generalData.UserName,
        Password: generalData.Password,
        ConfirmPassword: generalData.ConfirmPassword,
      },
      // selectedBranch: generalData.ServiceBranch,
      // selectedRank: generalData.Rank,
      // selectedPaygrade: paygrade,
    }, () => {
      console.log(this.state.personnel);
      if (generalData.ServiceBranch && generalData.ServiceBranch !== selectedBranch) {
        this.updateRanks(generalData.ServiceBranch, generalData.Rank);
        this.updateAssignedUnits(generalData.ServiceBranch, personnel.AssignedUnit);
        this.updateDeployedUnits(generalData.ServiceBranch, personnel.DeployedUnit);
      }
      
      if (generalData.Rank && generalData.Rank !== selectedRank) {
        this.updatePaygrade(generalData.Rank);
      }

    });

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
  
  /**
   * This is callback method called automatically and update state with personnelFiles.
   */
  handleUploadFileData = (uploadFileData) => {
    const { personnel } = this.state;
    this.setState({
      personnelFiles: {
        ...personnel,
        PersonnelPhoto: uploadFileData.PersonnelPhoto,
        OrganizationLogo: uploadFileData.OrganizationLogo,
        Datasheet: uploadFileData.Datasheet,
      },
    });
  }



  /**
   * This is callback method called automatically and show selected image preview.
   */
  handlePhotoPreviewURL = (uploadedFile) => {
    
    let reader = new FileReader();
    let file = uploadedFile.originalFile;
    if (uploadedFile.name === 'PersonnelPhoto') {
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
    }
    if (uploadedFile.name === 'OrganizationLogo') {
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl2: reader.result
        });
      }
    }
    reader.readAsDataURL(file);
  }

  handleSubmit = event => {
    console.log(this.state.personnel);
    event.preventDefault();
    let {  personnel } = this.state;
    let { editId } = this.props;
    let {  selectedRank } = this.state;
    personnel.Rank = selectedRank;
    const { personnelFiles } = this.state;
    //We are going to upload files with JSON request body.
    const formData = new FormData();
    if (personnelFiles.PersonnelPhoto) {
      formData.append('PersonnelPhoto', personnelFiles.PersonnelPhoto, personnelFiles.PersonnelPhoto.name);
    }
    if (personnelFiles.OrganizationLogo) {
      formData.append('OrganizationLogo', personnelFiles.OrganizationLogo, personnelFiles.OrganizationLogo.name);
    }
    if (personnelFiles.Datasheet) {
      formData.append('Datasheet', personnelFiles.Datasheet, personnelFiles.Datasheet.name);
    }
    
    if (editId !== undefined && editId !== '0') {
      // Start Loader
      this.setState({loading:true});
      personnel.PersonnelID = editId;
      
      formData.append('personnelFormData', JSON.stringify(personnel));
      this.props.updatePersonnel(editId, formData).then(() => {
        // Stop Loader
        this.setState({loading:false});
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      console.log(personnel);
      formData.append('personnelFormData', JSON.stringify(personnel));
      // Start Loader
      this.setState({loading:true});
      this.props.addPersonnel(formData).then(() => {
        // Stop Loader
        this.setState({loading:false});
        this.props.onClose(NoticeType.ADD);
      });
    }

  }

updateRanks= (branch, rank) => {
  let rankSelect = document.getElementsByName('Rank')[0];
  let items = [{'label': '--Select Item--', 'value': 0}];
  const apiUrl = `${baseUrl}/Ranks/GetRanksByBranch?branchID=${branch}`;
  axios.get(apiUrl,{headers:requestHeaders})
    .then(response => {
      
      if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
      response.data.map(item => {
        items.push({ 'label': item['description'], 'value': item['id'].trim() });
      });
      if (rankSelect.length > 0) {
        rankSelect.length = 0;
      }
      for(let i in items) {
        let selected = false;
        if(rank && items[i].value === rank.toString()) {
          selected = true;
        }
        rankSelect.add(new Option(items[i].label, items[i].value, selected, selected));
      }

      this.setState(
        {
          selectedBranch: branch,
          selectedRank: rank,
        });
           
    })
    .catch((error) => {
      console.log('Exception comes:' + error);
    });

}

updateAssignedUnits= (branch,unit) => {
  let UnitSelect = document.getElementsByName('AssignedUnit')[0];
  let items = [{'label': '--Select Item--', 'value': 0}];
  const apiUrl = `${baseUrl}/Units/GetUnits?branchID=${branch}`;
  axios.get(apiUrl,{headers:requestHeaders})
    .then(response => {
      if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
      response.data.map(item => {
        items.push({ 'label': item['description'], 'value': item['id'].trim() });
      });
      if (UnitSelect.length > 0) {
        UnitSelect.length = 0;
      }
      for(let i in items) {
        let selected = false;
        if(unit && items[i].value === unit.toString()) {
          selected = true;
        }
        UnitSelect.add(new Option(items[i].label, items[i].value, selected, selected));
      }
           
    })
    .catch((error) => {
      console.log('Exception comes:' + error);
    });

}



updateDeployedUnits= (branch,unit) => {
  let UnitSelect = document.getElementsByName('DeployedUnit')[0];
  let items = [{'label': '--Select Item--', 'value': 0}];
  const apiUrl = `${baseUrl}/Units/GetUnits?branchID=${branch}`;
  axios.get(apiUrl,{headers:requestHeaders})
    .then(response => {
     
      if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
      response.data.map(item => {
        items.push({ 'label': item['description'], 'value': item['id'].trim() });
      });
      if (UnitSelect.length > 0) {
        UnitSelect.length = 0;
      }
      for(let i in items) {
        let selected = false;
        if(unit && items[i].value === unit.toString()) {
          selected = true;
        }
        UnitSelect.add(new Option(items[i].label, items[i].value, selected, selected));
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
  axios.get(apiUrl,{headers:requestHeaders})
    .then(response => {
      const paygrade = response.data[0];
      
      this.setState(
        { 
          personnel:
            { ...personnel,
              PayGrade: paygrade.id,
              // Rank: rank,
            },
          selectedPaygrade: paygrade.id,
          selectedRank: rank,
          editFetched: true, // to update data in chil components
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
  
  if (confirm("Do you want to clear all data from this form?")) {
    this.setState({clear:true,
      imagePreviewUrl:"/assets/img/admin/photo_1.png",
      imagePreviewUrl2:"/assets/img/admin/primoris_backgr.png"
    });
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
  let {imagePreviewUrl2} = this.state;
  let $imagePreview2 = '';
  const imageUrl = this.props.onePersonnel.PersonnelPhoto;
  const imageUrl2 = this.props.onePersonnel.OrganizationLogo;





  /* if (imageUrl !== undefined && imageUrl !== "" && this.props.editId != '0') {
    $imagePreview = (<img src={imageUrl} alt="" className="photo" alt=""/>);
  } */
  if (imagePreviewUrl || imagePreviewUrl === '') {
    $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
  }
  else {
    $imagePreview = (<img src="/assets/img/admin/photo_1.png" className="photo" alt=""/>);
  }
  
 

 /*  if (imageUrl2 !== undefined && imageUrl2 !=="" && this.props.editId != '0') {
    $imagePreview2 = (<img src={imageUrl2} alt="" className="photo" alt=""/>);
  } */
  if (imagePreviewUrl2 || imagePreviewUrl2 === '') {
    $imagePreview2 = (<img src={imagePreviewUrl2} alt="" className="photo" alt="" />);
  }
  else {
    $imagePreview2 = (<img src="/assets/img/admin/primoris_backgr.png" className="photo" alt=""/>);
  }
  

    
    
  const {translations} = this.props;

  let { personnel } = this.state;

  const generalFields = [
    {name: translations['First Name'], type: 'input', domID: 'FirstName', valFieldID: 'FirstName', required: true },

    {name: translations['Middle Initial'], type: 'input', domID: 'MiddleInitial', valFieldID: 'MiddleInitial'},
    {name: translations['Last Name'], type: 'input', domID: 'LastName', valFieldID: 'LastName', required: true },
    {name: translations['Branch'], type: 'dropdown', domID: 'dispServiceBranch', ddID: "BranchOfService", valFieldID: 'ServiceBranch'},
    {name: translations['Rank'], type: 'dropdown', domID: 'dispRank', ddID: "Ranks", valFieldID: 'Rank'},
    {name: translations['Pay Grade'], type: 'dropdown', domID: 'dispPayGrade', ddID: "PayGrades", valFieldID: 'PayGrade'},
    {name: translations['Nationality'], type: 'dropdown', domID: 'dispNationality', ddID: "Countries", valFieldID: 'Nationality', required:true},
    {name: translations['Clearance Level'], type: 'dropdown', domID: 'dispClearance', ddID: "Clearance", valFieldID: 'Clearance', required:true},
    {name: translations['CAC ID'], type: 'number', domID: 'CACid', valFieldID: 'CACid'},
    {name: translations['Call Sign'], type: 'input', domID: 'CallSign', valFieldID:'CallSign'},
    {name: 'User Name', type: 'input', domID: 'UserName', valFieldID: 'UserName', required: true },
    {name: 'Password', type: 'password', domID: 'Password', valFieldID: 'Password', required: true },
    {name: 'Confirm Password', type: 'password', domID: 'ConfirmPassword', valFieldID: 'ConfirmPassword', required: true},
  ];

  const organisationFields = [
    {name: translations['Company'], type: 'dropdown', domID: 'dispCompany', ddID: "Companies", valFieldID: 'Company'},
    {name: translations['Assigned Unit'], type: 'dropdown', domID: 'dispAssignedUnit', ddID: "Units/GetUnits", valFieldID: 'AssignedUnit'},
    {name: translations['Deployed Unit'], type: 'dropdown', domID: 'dispDeployedUnit', ddID: "Units/GetUnits", valFieldID: 'DeployedUnit'},
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
    {name: translations['DSN'], type: 'number', domID: 'DSN', valFieldID: 'DSN', required:true},
    {name: translations['Email-NIPR'], type: 'email', domID: 'EmailNIPR', valFieldID: 'EmailNIPR', required: true },
    {name: translations['Email-SIPR'], type: 'email', domID: 'EmailSIPR', valFieldID: 'EmailSIPR', required: true },
    {name: translations['Chat ID'], type: 'number', domID: 'ChatID', valFieldID: 'ChatID'},

  ];


  const uploadFileFields = [
    { name: translations['Photo Image'], type: 'file', domID: 'PersonnelPhoto', valFieldID: 'PersonnelPhoto', fileType: 'image'},
    { name: translations['Organization Logo'], type: 'file', domID: 'OrganizationLogo', valFieldID: 'OrganizationLogo', fileType: 'image' },
    { name: translations['DataSheet'], type: 'file', domID: 'Datasheet', valFieldID: 'Datasheet', fileType: 'file' },
  ];

  return (

    <form action="" onSubmit={this.handleSubmit} id="personnelform">
    
      <div className="payload-content">
        <Loader loading={this.state.loading} />
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

            <UploadFileBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Upload Imagery & Datasheets"]} fields={uploadFileFields}
              data={this.handleUploadFileData}  initstate={this.props.onePersonnel} previewFile={this.handlePhotoPreviewURL} isImagedRequired={this.state.isImagedRequired}></UploadFileBlock>

            {/* <div className="col-md-4 upload-block">
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
            </div> */}
          </div>
        </div>
        <div className="row personnel" >
          <div className="under-payload-content">
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]}
              fields={generalFields} data={this.handleGeneralPersonnelData} initstate ={this.state.personnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png"
              title="Organization & Duty" fields={organisationFields}
              data={this.handleOrganizationAndDutyData} initstate ={this.state.personnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png"
              title={translations["Contact Information"]} fields={contactFields}
              data={this.handleContactInformationData} initstate ={this.state.personnel} editId = {this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
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
          <button type="submit" className='highlighted-button'>
            {translations['submit']}
            {/*           {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
 */}          </button>
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
