import React from 'react';
import PropTypes from 'prop-types';
import UploadFileBlock from '../reusable/UploadFileBlock';

import FormBlock from '../reusable/FormBlock';

import Loader from '../reusable/Loader';


class MissionDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      missionDetail: {},
      missionReport: null,
      missionReportUrl: '',
      editFetched: false,
      loading: false,
    };
  }


  componentDidMount = () =>{

    const { match: { params } } = this.props;
    const editId = params.editId;

    if(editId !== undefined && editId !== '') {
      this.props.fetchMissionDetailById(editId).then(()=> {
        this.setState(
          {

            missionDetail: this.props.oneMissionDetail,
            missionId: editId,
            editFetched: true,

          });
      });
    }
  }


  handleSubmit = event => {
    event.preventDefault();

    const { missionId, missionReport, missionDetail } = this.state;
    // adding Id field as missionId nede for put request of mission
    const data = {...missionDetail, 'Id': missionId };
    const formData = new FormData();
    if (missionReport) {
      formData.append('MissionReport', missionReport, missionReport.name);
    }
    formData.append('missionFormData', JSON.stringify(data));
    this.setState({loading: true });
    this.props.uploadMissionReport(missionId, formData).then(() => {
      this.setState({loading: false});
    });

  }

  stopupd = () => {
    this.setState({editFetched:false});
  }

  handleUploadFileData = (uploadFileData) => {
    // const { missionReport } = this.state;
    this.setState({
      missionReport: uploadFileData.MissionReport,
    });
  }

  /**
   * This is callback method called automatically and show selected image preview.
   */
  handleFilePreview = (uploadedFile) => {
    
    let reader = new FileReader();
    let file = uploadedFile.originalFile;
    // Todo set download for Uploaded file
    reader.readAsDataURL(file);
  }



  render() {

    const {translations} = this.props;

    const {missionDetail} = this.state;

    const missionBlock1= [
      {name: translations['Mission Name'], type: 'input',  valueField:"MissionName",readonly:true},
      {name: translations['Mission#'], type: 'input', readonly:true,  valueField:"Mission"},
      {name: translations['Originating Req #'], type: 'input', readonly:true,  valueField:"ReqUserFrndlyID"},
      //{name: translations['Air Tasking Order #'], type: 'input', readonly:true},
      {name: translations['ATO Issue Date'], type: 'input', readonly:true,  valueField: "ATOIssueDate"},
      {name: translations['Supported Command'], type: 'input', readonly:true, valueField:"SupportedCommand"},
      {name: translations['Supported Unit'], type: 'input', readonly:true,  valueField:"SupportedUnit"},
      {name: translations['Named Operation'], type: 'input', readonly:true, valueField: "NamedOperation"},
      {name: translations['Mission Type'], type: 'input', readonly:true,  valueField:"MissionType"},
      {name: translations['Sub-Mission Type'], type: 'input', readonly:true,  valueField:"SubMissionType"},
      {name: translations['Active Dates'], type: 'input', readonly:true,  valueField:"ActiveDateTimeStart" }
    ];

    const missionBlock2= [
      {name: translations['ISR Asset Country'], type: 'input', readonly:true,  valueField:"ISRAssetCountary"},
      {name: translations['ISR Unit'], type: 'input', readonly:true,  valueField:"ISRUnit"},
      {name: translations['ISR Platform'], type: 'input', readonly:true,  valueField:"ISRPlatform"},
      {name: translations['Primary Payload'], type: 'input', readonly:true, valueField:"PrimaryPayload"},
      {name: translations['Secondary Payload'], type: 'input', readonly:true,  valueField:"SecondaryPayload"},
      {name: translations['Armed'], type: 'input', readonly:true,  valueField:"Armed"},
      {name: translations['Operations Area'], type: 'input', readonly:true,  valueField:"AreaOfOperations"},
      {name: translations['Air Operation Center'], type: 'input', readonly:true,  valueField:"AirOperationsCenter"},
      {name: translations['Collection Operations COCOM'], type: 'input', readonly:true,  valueField:"CollectionOperationsCOCOM"},
      {name: translations['Take-off Beddown COCOM'], type: 'input', readonly:true},
      {name: translations['Recovery Beddown COCOM'], type: 'input', readonly:true}
    ];

    const missionBlock3= [
      {name: translations['Priority Intel Req'], type: 'input', readonly:true,  valueField:"PriorityIntelRequirement"},
      {name: translations['Departure Time'], type: 'input', readonly:true,  valueField:"DepartureTime"},
      {name: translations['On Station'], type: 'input', readonly:true,  valueField:"OnStation"},
      {name: translations['Off Station'], type: 'input', readonly:true,  valueField:"OffStation"},
      {name: translations['Land Time'], type: 'input', readonly:true,  valueField:"LandTime"},
      {name: translations['Best Collection Time'], type: 'input', readonly:true,  valueField:"BestCollectionTime"},
      {name: translations['Latest Time of Intel Value'], type: 'input', readonly:true, valueField:"LatestTimeIntelValue"},
      {name: translations['Report Classification'], type: 'input', readonly:true, valueField:"ReportClassification"},
      {name: translations['Ped Team']+' #1', type: 'input', readonly:true,  valueField:"PedTeam"},
      //{name: translations['Crew Team'], type: 'input', readonly:true, },
      //{name: translations['IR'], type: 'input', readonly:true,  valueField:"ReqUserFrndlyID"},



    ];

    const missionBlock4 = [  
      { name: translations.IntelReport, type: 'file', domID: 'IntelReport', valFieldID: 'IntelReport', fileType: 'file' },
      { name: translations.FlightPlan, type: 'file', domID: 'FlightPlan', valFieldID: 'FlightPlan', fileType: 'file' },

    ];

    const requirementsHeader = [translations['Priority#'], translations['eei#'], translations['Name'], translations['threat'], translations['Location'], translations['grid'], translations['POIs'], translations['LIMIDS Request'], translations['view'], translations['edit'], translations['del'],];
    const requirementContent = [
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
      { priority:'001', eei:'0000-01', name:'torani farmhouse', threat:'ied', locaton:'gardez, afg', grid:'42swc20821753', pois:'poi-06', limid:'us/noforn', view:'view', edit:'edit', del:'del'},
    ];

    return (
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12 header-line">
            {/* <img className="full-line" src="/assets/img/general/full_line.png" /> */}
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {translations['mission detail']}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          <div className="col-md-12">
            <FormBlock fields={missionBlock1} data={this.handleMissionBlock1} initstate ={missionDetail} editFetched={this.state.editFetched} stopupd = {this.stopupd}/>
            <FormBlock fields={missionBlock2} data={this.handleMissionBlock2} initstate ={missionDetail} editFetched={this.state.editFetched} stopupd = {this.stopupd}/>
            <FormBlock fields={missionBlock3} data={this.handleMissionBlock3} initstate ={missionDetail} editFetched={this.state.editFetched} stopupd = {this.stopupd}/>
          </div>

        </div>


        <form action="" onSubmit={this.handleSubmit} id="platform">
          <div className="row mission-mgt">
            <Loader loading={this.state.loading} />

            <div className="col-md-12 header-line">
              
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                {translations.MissionData}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
            <div className="col-md-12 text-center">
              <UploadFileBlock fields={missionBlock4} data={this.handleUploadFileData} 
                initstate={this.state.missionDetail} previewFile={this.handleFilePreview} 
                isImagedRequired={true} />
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="submit" className="highlighted-button">
                {translations['upload']}

              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </form>

      </div>
    );
  }
}

MissionDetailComponent.propTypes = {
  children: PropTypes.element,

};

export default MissionDetailComponent;
