import PropTypes from 'prop-types';
import React from 'react';
import 'react-table/react-table.css';
import moment from 'moment';
import TimelineFilter from '../reusable/TimelineFilter';
import FullHeaderLine from '../reusable/FullHeaderLine';
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import { MissionConsts } from '../../dictionary/constants';
import CustomDatePicker from '../reusable/CustomDatePicker';


class ReportsComponent extends React.Component {

  constructor(props) {
    super(props);
    const startDate = moment().startOf('day').toDate();
    const endDate = moment().startOf('hour').add(24, 'hour').toDate();
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.ISR,
      // showUnitType: true,
      filter: {
        selectedResource: '',
        teamId: '',
        platformStatusId: '',
        UnitType: '',
        cocomId: '',
        unitId: '',
        selectedAssetType: '',
        teamStatusId: '',
        startDate,
        endDate,
        
      }
    };
  }

  componentDidMount () {
  
  }

  

  

  updateSelectedResource = (resource) => {
    this.setState({
      defaultResource: resource,
    }, () => {
      this.timeLine.onFind();
    });
  }

  handleChangeDate = (changeDate, name) => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        [name]: changeDate,
      },
    });
  }

  handleFilterData = (name, value) => {
    const filePaths = [
        "1 Intelligence Requirements.pdf",
        "2 ISR Allocation Matrix.pdf",
        "3 Operational Synch Matrix.pdf",
        "4 Operations Order.pdf",
        "5 Chain of Command Report.pdf",
        "6 Beddown Location Report.pdf",
        "7 Collection Plan and Future Operations.pdf",
        "8 Daily ATO.pdf",
        "9 Flight Ops.pdf",
        "10 PED Tasking Order.pdf",
        "11 ATO Change.pdf",
        "12 ISR Synch Matrix.pdf",
        "13 Pre-Mision Preparation.pdf",
        "14 9-Line Mission Change.pdf",
        "15 ISR Mission Summary Report.pdf",
        "16 Intelligence Summary.pdf",
        "17 ISR Operational Summary.pdf",
        "18 Unit Status Report.pdf",
        "19 Unit Operational Summary.pdf",
        "20 User Summary.pdf",
        "21 Team Management.pdf",
        "22 Operational Variance Reports.pdf",
        "23 CCIR Report.pdf"
    ]
    console.log(value);
    var file_path = '../../assets/documents/Reports/'+filePaths[value];
    var a = document.createElement('A');
    a.href = file_path;
    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // if( value === '0' )
    //   return;

    // const { filter } = this.state;
    // this.setState({
    //   filter: {
    //     ...filter,
    //     [name]: value,
    //   },
    // });
    // if(name === 'selectedResource' /* && this.props.tab === MissionConsts.TABS.FOP */) {
    //   this.props.updateResource(value);
    // }


  }


  render() {
    const { translations } = this.props;

    const session = JSON.parse(localStorage.getItem('session'));
    const rootUnitId = session.DeployedUnit;
    // units api will be diff for FlighOps and Ped Screens
    let unitsUrl = 'CommandStructure/GetUserUnitAndSubordinateUnits?rootUnitID=' + rootUnitId;
    let { startDate, endDate } = this.state.filter;

    const optionItems = [
    { description: 'Intelligence Requirements', id: '0' },
    { description: 'ISR Allocation Matrix', id: '1' },
    { description: 'Operational Sync Matrix', id: '2' },
    { description: 'Operations Order', id: '3' },
    { description: 'Chain of Command Report', id: '4' },
    { description: 'Beddown Locations', id: '5' },
    { description: 'Collection Plan & Future Ops', id: '6' },
    { description: 'Daily ATO', id: '7' },
    { description: 'Flight Ops', id: '8' },
    { description: 'PED Tasking Order', id: '9' },
    { description: 'ATO Change', id: '10' },
    { description: 'ISR Sync Matrix', id: '11' },
    { description: 'Pre-Mission Prep', id: '12' },
    { description: '9 Line Missio Change', id: '13' },
    { description: 'ISR Mission Summary', id: '14' },
    { description: 'Intelligence Summary', id: '15' },
    { description: 'ISR Operational Summary', id: '16' },
    { description: 'Unit Status Report', id: '17' },
    { description: 'Unit Operational Summary', id: '18' },
    { description: 'Uses Summary', id: '19' },
    { description: 'Team Management', id: '20' },
    { description: 'Operational Variance Reports', id: '21' },
    { description: 'CCIR Report', id: '22' },
   ];

    
    return (
      <div>
        {/* <TimelineFilter onRef={ref => (this.timeLine = ref)} updateResource={this.updateSelectedResource} translations={translations} headerTxt={translations['isr sync']} defaultResource={this.state.defaultResource} tab={this.state.tab} showUnitType={this.state.showUnitType}/> */}

        <div className="row mission-mgt">
          <div className="col-md-12 ">
            <FullHeaderLine headerText="Reports" />
          </div>
          <div className="col-md-12 filter-line text-center">
            
            
              <MissionMgtDropDown name="cocomId" label={translations.cocom} data={this.handleFilterData} dropdownDataUrl="COCOM/GetCOCOMs" />
            
            
              <MissionMgtDropDown name="unitId" label={translations.units} data={this.handleFilterData} dropdownDataUrl={unitsUrl} labelName="UnitName" valueName = "unitID" />
            
            <div className="each-select text-left">
              <div className="date-pic">
                <label>Start Date</label>
                <CustomDatePicker name="startDate" defaultValue={startDate} changeDate={this.handleChangeDate} disablePreviousDate = {false}/>
              </div>
            </div>
            <div className="each-select text-left">
              <div className="date-pic">
                <label>End Date</label>
                <CustomDatePicker name="endDate" defaultValue={endDate} changeDate={this.handleChangeDate} disablePreviousDate = {false}/>
              </div>
            </div>

            <MissionMgtDropDown name="ReportType" label="Report Type" data={this.handleFilterData} options={optionItems}/>
            
          </div>
        </div>


      </div>
    );
  }
}

ReportsComponent.propTypes = {
  children: PropTypes.element,

};

export default ReportsComponent;
