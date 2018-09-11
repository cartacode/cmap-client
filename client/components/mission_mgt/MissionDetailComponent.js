import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormBlock from '../reusable/FormBlock';
import FullHeaderLine from '../reusable/FullHeaderLine';
import StatusTable from '../reusable/StatusTable';


class LiveViewComponent extends React.Component {

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
            
              missionDetail: this.props.oneMissionDetail[0],
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
    debugger;
    const missionBlock1= [
      {name: translations['Mission Name'], type: 'input', name:"MissionName" , valueField:"MissionName",readonly:true},
      {name: translations['Mission#'], type: 'input', readonly:true, name:"Mission", valueField:"Mission"},
      {name: translations['Originating Req #'], type: 'input', readonly:true},
      {name: translations['Air Tasking Order #'], type: 'input', readonly:true},
      {name: translations['ATO Issue Date'], type: 'input', readonly:true, name:"ATOIssueDate", valueField: "ATOIssueDate"},
      {name: translations['Supported Command'], type: 'input', readonly:true, name: "SupportedCommand", valueField:"SupportedCommand"},
      {name: translations['Supported Unit'], type: 'input', readonly:true, name:"SupportedUnit", valueField:"SupportedUnit"},
      {name: translations['Named Operation'], type: 'input', readonly:true, name:"NamedOperation", valueField: "NamedOperation"},
      {name: translations['Mission Type'], type: 'input', readonly:true, name:"MissionType", valueField:"MissionType"},
      {name: translations['Sub-Mission Type'], type: 'input', readonly:true, name:"SubMissionType", valueField:"SubMissionType"},
      {name: translations['Active Dates'], type: 'input', readonly:true, name:"ActiveDateTimeStart", valueField:"ActiveDateTimeStart" }
    ];
    
    const missionBlock2= [
      {name: translations['ISR Asset Country'], type: 'input', readonly:true, name:"ISRAssetCountary", valueField:"ISRAssetCountary"},
      {name: translations['ISR Unit'], type: 'input', readonly:true, name:"ISRUnit", valueField:"ISRUnit"},
      {name: translations['ISR Platform'], type: 'input', readonly:true, name:"ISRPlatform", valueField:"ISRPlatform"},
      {name: translations['Primary Payload'], type: 'input', readonly:true, name:"PrimaryPayload", valueField:"PrimaryPayload"},
      {name: translations['Secondary Payload'], type: 'input', readonly:true, name:"SecondaryPayload", valueField:"SecondaryPayload"},
      {name: translations['Armed'], type: 'input', readonly:true, name:"Armed", valueField:"Armed"},
      {name: translations['Operations Area'], type: 'input', readonly:true, name:"AreaOfOperations", valueField:"AreaOfOperations"},
      {name: translations['Air Operation Center'], type: 'input', readonly:true, name:"AirOperationsCenter", valueField:"AirOperationsCenter"},
      {name: translations['Collection Operations COCOM'], type: 'input', readonly:true, name:"CollectionOperationsCOCOM", valueField:"CollectionOperationsCOCOM"},
      {name: translations['Take-off Beddown COCOM'], type: 'input', readonly:true},
      {name: translations['Recovery Beddown COCOM'], type: 'input', readonly:true}
    ];

    const missionBlock3= [
      {name: translations['Priority Intel Req'], type: 'input', readonly:true, name:"PriorityIntelRequirement", valueField:"PriorityIntelRequirement"},
      {name: translations['Departure Time'], type: 'input', readonly:true, name:"DepartureTime", valueField:"DepartureTime"},
      {name: translations['On Station'], type: 'input', readonly:true, name:"OnStation", valueField:"OnStation"},
      {name: translations['Off Station'], type: 'input', readonly:true, name:"OffStation", valueField:"OffStation"},
      {name: translations['Land Time'], type: 'input', readonly:true, name:"LandTime", valueField:"LandTime"},
      {name: translations['Best Collection Time'], type: 'input', readonly:true, name:"BestCollectionTime", valueField:"BestCollectionTime"},
      {name: translations['Latest Time of Intel Value'], type: 'input', readonly:true},
      {name: translations['Report Classification'], type: 'input', readonly:true},
      {name: translations['Ped Team']+' #1', type: 'input', readonly:true, name:"PedTeam", valueField:"PedTeam"},
      {name: translations['Crew Team'], type: 'input', readonly:true, },
      {name: translations['IR'], type: 'input', readonly:true, name:"ReqUserFrndlyID", valueField:"ReqUserFrndlyID"},


      
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
            <img className="full-line" src="/assets/img/general/full_line.png" />
          </div>
          <div className="col-md-12">
            <FormBlock fields={missionBlock1} data={this.handleMissionBlock1} initstate ={this.state.missionDetail} editFetched={this.state.editFetched}  stopupd = {this.stopupd}/>
            <FormBlock fields={missionBlock2} data={this.handleMissionBlock2} initstate ={this.state.missionDetail} editFetched={this.state.editFetched}  stopupd = {this.stopupd}/>
            <FormBlock fields={missionBlock3} data={this.handleMissionBlock3} initstate ={this.state.missionDetail} editFetched={this.state.editFetched}  stopupd = {this.stopupd}/>
          </div>
        </div>
        
         
         
         
        
      </div>
    );
  }
}

LiveViewComponent.propTypes = {
  children: PropTypes.element,

};

export default LiveViewComponent;
