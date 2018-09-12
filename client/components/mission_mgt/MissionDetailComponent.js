import React from 'react';
import PropTypes from 'prop-types';


import FormBlock from '../reusable/FormBlock';


class MissionDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      missionDetail: {},
      editFetched: false
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
            editFetched: true
     
          });
      });
    }
  }


  onClear(){
    //console.log("clear");
  }

  onRoute(){
    //console.log("route");
  }


  stopupd = () => {
    this.setState({editFetched:false});
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

      </div>
    );
  }
}

MissionDetailComponent.propTypes = {
  children: PropTypes.element,

};

export default MissionDetailComponent;
