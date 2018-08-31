import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import 'react-table/react-table.css';
import CustomDatePicker from './CustomDatePicker';
import FullHeaderLine from './FullHeaderLine';
import MissionMgtDropDown from './MissionMgtDropDown';
import StatusTable from './StatusTable';
import { connect } from 'react-redux';
import { searachAndFilter } from '../../actions/mssionmgt';

class TimelineFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clear: false,
      filter: {
        selectedResource: '',
        teamId: '',
        platformStatusId: '',
        unitTypeId: '',
        cocomId: '',
        unitId:'',
        selectedAssetType: '',
        startDate: '',
        endDate: '',
      },
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { defaultResource } = this.props;
    this.setState({ clear: true });
    console.log('defaultResource' + defaultResource);
    if(defaultResource != undefined && defaultResource !== '') {
      const { filter } = this.state;
      this.setState({
        filter: {
          ...filter,
          selectedResource: defaultResource,
        },
      });
    }
  }

  // componentDidUpdate = (prevProps, prevState) => {
  // }

  handleFilterData = (name, value) => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        [name]: value,
      },
    });
  }

  handleChangeDate = (changeDate, name) => {
    console.log(changeDate._d);
    console.log(name);

    const { filter } = this.state;
    console.log(JSON.stringify(this.state.filter));
    this.setState({
      filter: {
        ...filter,
        [name]: changeDate._d,
      },
    });
  }


  radioFilterSelect=(value)=>{
    const { filter } = this.state;
    const generatedData = {
      resourceId: filter.selectedResource,
      value: value !== undefined ? value : '',
    };
    this.props.radioFilterSelect(generatedData);
  }

  onFind() {
    event.preventDefault();
    console.log('find');
    const { selectedResource } = this.state.filter;
    if(selectedResource === '1') {
      this.findPlatformBased();
    }else{
      this.findTeamBased();
    }   
  }

  findPlatformBased =()=>{
    const { filter } = this.state;
    const data = 
      {
        'COCOMId': filter.cocomId,
        'UnitId': filter.unitId,
        'statusId': filter.platformStatusId,
        'StartDate': filter.startDate,
        'EndDate': filter.endDate,
      };

    this.props.searachAndFilter(data).then( () => {
      const { filterResults } = this.props;
    });
  }

  findTeamBased =()=>{
    const { filter } = this.state;
    const data = 
      {
        'COCOMId': filter.cocomId,
        'UnitId': filter.unitTypeId,
        'statusId': filter.platformStatusId,
        'StartDate': '2018-08-29T12:29:33.755Z',
        'EndDate': '2018-08-29T12:29:33.755Z'
      };
  /*   this.props.searachAndFilter(data).then( () => {
      debugger;
      const { filterResults } = this.props;
      console.log('************************DONE searching**********And Results**************'+filterResults);
    }); */
  }

  render() {
    const { translations } = this.props;
    const { selectedResource } = this.state.filter;
    const { filterResults } = this.props;

    const sideTableHeader = [{ Header: 'Platforms', columns: [
      {
        Header: translations.select,
        accessor: 'id',
        Cell: row => <div>
          <input type="radio" id={row.original.id} name="chk" onClick={() => this.radioFilterSelect(row.value)} />
          <label htmlFor={row.original.id}><span /></label>
        </div>,
      },
      {
        Header: translations.unit,
        accessor: 'Unit',
      },
      {
        Header: translations.team,
        accessor: 'team',
      },
      {
        Header: translations.Type,
        accessor: 'type',
      },
      {
        Header: translations.Location,
        accessor: 'location',
      },
    ] },
    ];

    const { tab } = this.props;
    if(tab === 'ISR') {
      sideTableHeader[0].columns.splice(0, 1);
    }

    const sideTableContent = [
      { id: 1, select: 'check', Unit: '116th MIB', team: 'Blue', type: 'FMV', location: 'theater'},
      { id: 2, select: 'check', Unit: '116th MIB', team: 'red', type: 'Fmv', location: 'theater'},
      { id: 3, select: 'check', Unit: '116th MIB', team: 'Yellow', type: 'fmv', location: 'theater'},
      { id: 4, select: 'check', Unit: '116th MIB', team: 'Delta', type: 'fmv', location: 'SRO'},
      { id: 5, select: 'check', Unit: '116th MIB', team: 'Delta', type: 'fmv', location: 'SRO'},
      { id: 6, select: 'check', Unit: '116th MIB', team: 'Alpha', type: 'fmv', location: 'ASR'},
    ];
    
    const groups = [
      { id: 1, title: 'group 1', rightTitle: 'Plar', },
      { id: 2, title: 'group 2', rightTitle: 'Plat', },
      { id: 3, title: 'group 3', rightTitle: 'Plat', },
      { id: 4, title: 'group 4', rightTitle: 'Platss' },
      { id: 5, title: 'group 5', rightTitle: 'Platss' },
      { id: 6, title: 'group 6', rightTitle: 'Platss' },
    ];

    const items = [
      { id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
      { id: 4, group: 1, title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') },
      { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour') },
      { id: 5, group: 2, title: 'item 5', start_time: moment().add(1, 'hour'), end_time: moment().add(1.2, 'hour') },
      { id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') },
      { id: 6, group: 6, title: 'item 3', start_time: moment().add(3, 'hour'), end_time: moment().add(5, 'hour') },
      { id: 7, group: 5, title: 'item 4', start_time: moment().add(3, 'hour'), end_time: moment().add(5, 'hour') },
      { id: 8, group: 5, title: 'item 5', start_time: moment().add(5, 'hour'), end_time: moment().add(7, 'hour') },
    ];

    let currentDateTime = new Date();
    
    return(
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={this.props.headerTxt} />
          </div>
          <div className="col-md-12 filter-line">
            <MissionMgtDropDown name="selectedResource" label={translations.resource} data={this.handleFilterData} options={this.props.resource} defaultResource ={this.props.defaultResource}/>
            
            {/* For Team */}
            {selectedResource === '2' ? 
              <MissionMgtDropDown name="teamId" label={translations.teamStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=6" />
              : ''
            }

            {/* For Platform  */}
            {selectedResource === '1' ? 
              <MissionMgtDropDown name="platformStatusId" label={translations.platformStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=5" />
              : ''
            } 

            {/* For Platform  */}
            {selectedResource === '1' ? 
              <MissionMgtDropDown name="cocomId" label={translations.cocom} data={this.handleFilterData} dropdownDataUrl="COCOM/GetCOCOMs" />
              : ''
            }
            {/* Should't be visible to the 'FLIGHT_OPS' Or 'PED_TASK' tabs.*/}
            { (tab !== 'FLIGHT_OPS' && tab !== 'PED_TASK') ? 
              <MissionMgtDropDown name="unitTypeId" label={translations.unitType} data={this.handleFilterData} dropdownDataUrl="UnitTypes/GetUnitType" />
              : ''
            }
         
            <MissionMgtDropDown name="unitId" label={translations.units} data={this.handleFilterData} dropdownDataUrl="Units/GetUnits" />
            {/* <MissionMgtDropDown  name="selectedAssetType" label={translations['assets type']} data={this.handleFilterData} dropdownDataUrl="AssetTypes/GetAssetTypes" /> */}
            <div className="each-select text-left">
              <div className="date-pic">
                <label>Start Date</label>
                <CustomDatePicker name="startDate" defaultValue={currentDateTime} changeDate={this.handleChangeDate}/> 
              </div>
            </div>
            <div className="each-select text-left">
              <div className="date-pic">
                <label>End Date</label>
                <CustomDatePicker name="endDate" defaultValue={currentDateTime} changeDate={this.handleChangeDate}/> 
              </div>
            </div>
            <div className="filter-button">
              <div className="row action-buttons" >
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onFind.bind(this)}>
                    {translations['find & filter']}
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="col-md-4" style={{ padding: 0 }}>
              <StatusTable thead={sideTableHeader} lines={sideTableContent} translations={translations} />
            </div>
            <div className="col-md-8" style={{ padding: 0 }}>
              <Timeline
                className="react-calendar-timeline"
                sidebarWidth={0}
                groups={groups}
                lineHeight={51}
                // rightSidebarWidth={100}
                items={items}
                defaultTimeStart={moment().add(-5, 'hours')}
                defaultTimeEnd={moment().add(12, 'hours')}
                visibleTimeStart={moment().add(-5, 'hours').valueOf()}
                visibleTimeEnd={moment().add(12, 'hours').valueOf()}
              />
            </div>
          </div>
        </div>
	  </div>
    );
  }

}

TimelineFilter.propTypes = {
  children: PropTypes.element,
  defaultResource: PropTypes.string,
  headerTxt: PropTypes.string,
  radioFilterSelect: PropTypes.func,
  resource: PropTypes.array,
  showUnitType: PropTypes.bool,
  tab: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    filterResults: state.mssionmgts.filterResults,
    isLoading: state.mssionmgts.isFetching,
  };
};

const mapDispatchToProps = {
  searachAndFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilter);