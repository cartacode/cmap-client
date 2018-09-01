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
import { teamFilter, platformFilter } from '../../actions/mssionmgt';
import { MissionConsts } from '../../dictionary/constants';

class TimelineFilter extends React.Component {

  constructor(props) {
    super(props);
    // setting timeline date range default to 24 hours from now
    const startDate = moment().startOf('hour').toDate();
    const endDate = moment().startOf('hour').add(24, 'hour').toDate();
    console.log('resource '+props.defaultResource);
    this.state = {
      clear: false,
      selectedRadio: '',
      filter: {
        selectedResource: props.defaultResource,
        teamId: '',
        platformStatusId: '',
        unitTypeId: '',
        cocomId: '',
        unitId: '',
        selectedAssetType: '',
        startDate,
        endDate,
        
      },
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { defaultResource } = this.props;
    this.setState({ clear: true });
    
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

  getColumns = (selectedResource) => {
    if(selectedResource === MissionConsts.RESOURCE.PLATFORM) {
      return this.getPlatformCols();
    } else if(selectedResource === MissionConsts.RESOURCE.TEAM) {
      return this.getTeamCols();
    }
  }

  getPlatformCols = () => {
    const { translations, tab } = this.props;

    let id = 'id';// this varies based on tab
    if(tab === MissionConsts.TABS.ATO) {
      // in case of ATO we are assigning unit id
      id = 'UnitId';
    }
    const sidebarHeader = [{ Header: translations['platforms'], columns: [
      {
        Header: translations.select,
        accessor: id,
        Cell: row => <div>
          <input type="radio" id={row.original.id} name="selectedRadio" value={row.value} onChange={() => this.onRadioSelect(row.value)} />
          <label htmlFor={row.original.id}><span /></label> 
        </div>,
      },
      {
        Header: translations['Tail#'],
        accessor: 'TailNumber',
      },
      {
        Header: translations.Location,
        accessor: 'Location',
      },
      {
        Header: translations.platform,
        accessor: 'Name',
      },
      {
        Header: translations['Unit'],
        accessor: 'OwningUnit',
      },
      {
        Header: translations['payload'],
        accessor: 'Payload',
      },
      {
        Header: translations['Armed'],
        accessor: 'IsArmed',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
    ] },
    ];

    // remove radio button column if tab is ISR
    if(tab === MissionConsts.TABS.ISR) {
      sidebarHeader[0].columns.splice(0, 2);
      // sidebarHeader[0].columns.splice(0, 1);
    }
    // tail # not needed in case of ATO and ISR Sync
    if(tab !== MissionConsts.TABS.FOP) {
      sidebarHeader[0].columns.splice(1, 1);
    }

    return sidebarHeader;

  }

  getTeamCols = () => {

    const { translations, tab } = this.props;

    let id = 'id'; // this varies based on tab // this will be team id
    
    const sidebarHeader = [{ Header: translations['platforms'], columns: [
      {
        Header: translations.select,
        accessor: id,
        Cell: row => <div>
          <input type="radio" id={row.original[id]} name="selectedRadio" onClick={() => this.radioFilterSelect(row.value)} />
          {/* <label htmlFor={row.original.id}><span /></label> */}
        </div>,
      },
      {
        Header: translations.Location,
        accessor: 'location',
      },
      {
        Header: translations['Unit'],
        accessor: 'unit',
      },
      {
        Header: translations['Name'],
        accessor: 'teamName',
      },
      
      {
        Header: translations['Type'],
        accessor: 'teamType',
      },
      {
        Header: translations['Specialization'],
        accessor: 'Specialization',
      },
      
    ] },
    ];

    // remove radio button column if tab is ISR
    if(tab === MissionConsts.TABS.ISR) {
      sidebarHeader[0].columns.splice(0, 1);
    }

    return sidebarHeader;

  }

  radioFilterSelect = (value) => {
    const { filter } = this.state;
    const generatedData = {
      resourceId: filter.selectedResource,
      value: value !== undefined ? value : '',
    };
    this.props.radioFilterSelect(generatedData);
  }

  onRadioSelect = (value) => {
    // alert(value);
    this.setState({
      selectedRadio: value,
    }, () => {
      this.props.radioFilterSelect(this.state.selectedRadio);
    });
  }

  /**
   * Click event of Find & Filter Button.
   */
  onFind = () => {
    event.preventDefault();
    const { selectedResource } = this.state.filter;
    if(selectedResource === MissionConsts.RESOURCE.PLATFORM) {
      this.findPlatformBased();
    } else if(selectedResource === MissionConsts.RESOURCE.TEAM) {
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

    this.props.platformFilter(data).then( () => {
      const { filterResults } = this.props;
    });
  }

  findTeamBased =()=> {
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
    const { translations, tab } = this.props;
    const { selectedResource, startDate, endDate } = this.state.filter;
    let { filterResults } = this.props;


    const resourceFilter = [
      { id: MissionConsts.RESOURCE.PLATFORM, description: translations.platform },
      { id: MissionConsts.RESOURCE.TEAM, description: translations.teams },
    ];

    const columns = this.getColumns(selectedResource);

    // const { tab } = this.props;
    // if(tab === MissionConsts.TABS.ISR) {
    //   sideTableHeader[0].columns.splice(0, 1);
    // }

    const groups = [];
    // let content = [];
    let timelines = [];
    

    if(filterResults) {
      filterResults.map((row, index) => {
        // creating groups
        const group = { id: row.id, title: row.Name};
        groups.push(group);

        //TODO : Timeline Content.
        
      });
    } else {
      filterResults = [];
    }

    console.log('Filter results' + JSON.stringify(filterResults));
    console.log('Groups' + JSON.stringify(groups));
    // const sideTableContent = [
    //   { id: 1, select: 'check', Unit: '116th MIB', team: 'Blue', type: 'FMV', location: 'theater'},
    //   { id: 2, select: 'check', Unit: '116th MIB', team: 'red', type: 'Fmv', location: 'theater'},
    //   { id: 3, select: 'check', Unit: '116th MIB', team: 'Yellow', type: 'fmv', location: 'theater'},
    //   { id: 4, select: 'check', Unit: '116th MIB', team: 'Delta', type: 'fmv', location: 'SRO'},
    //   { id: 5, select: 'check', Unit: '116th MIB', team: 'Delta', type: 'fmv', location: 'SRO'},
    //   { id: 6, select: 'check', Unit: '116th MIB', team: 'Alpha', type: 'fmv', location: 'ASR'},
    // ];
    
    // const groups = [
    //   { id: 1, title: 'group 1', rightTitle: 'Plar', },
    //   { id: 2, title: 'group 2', rightTitle: 'Plat', },
    //   { id: 3, title: 'group 3', rightTitle: 'Plat', },
    //   { id: 4, title: 'group 4', rightTitle: 'Platss' },
    //   { id: 5, title: 'group 5', rightTitle: 'Platss' },
    //   { id: 6, title: 'group 6', rightTitle: 'Platss' },
    // ];

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

    // let currentDateTime = new Date();
    const todate = moment().startOf('hour').toDate();

    // unist api will be diff for FlighOps and Ped Screens
    let unitsUrl = 'Units/GetUnits';    
    if(selectedResource === MissionConsts.RESOURCE.TEAM) {
      if(tab === MissionConsts.TABS.FOP ) {
        unitsUrl += '?unitType=2';
      } else if(tab === MissionConsts.TABS.PED) {
        unitsUrl += '?unitType=1';
      }
    }
    
    let resourceDisabled = false;
    if(tab === MissionConsts.TABS.ATO || tab === MissionConsts.TABS.PED) {
      resourceDisabled = true;
    }

    return(
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={this.props.headerTxt} />
          </div>
          <div className="col-md-12 filter-line ">

            <MissionMgtDropDown name="selectedResource" label={translations.resource} data={this.handleFilterData} options={resourceFilter} defaultValue = {selectedResource} disable={resourceDisabled}/>
            
            {selectedResource === MissionConsts.RESOURCE.TEAM ? 
              <MissionMgtDropDown name="teamId" label={translations.teamStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=6" />
              : ''
            }
            {selectedResource === MissionConsts.RESOURCE.PLATFORM ? 
              <MissionMgtDropDown name="platformStatusId" label={translations.platformStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=5" />
              : ''
            } 
            {selectedResource === MissionConsts.RESOURCE.PLATFORM ? 
              <MissionMgtDropDown name="cocomId" label={translations.cocom} data={this.handleFilterData} dropdownDataUrl="COCOM/GetCOCOMs" />
              : ''
            }

            { (selectedResource === MissionConsts.RESOURCE.TEAM && tab == MissionConsts.TABS.ISR) ?
              <MissionMgtDropDown name="unitTypeId" label={translations.teamType} data={this.handleFilterData} dropdownDataUrl="UnitTypes/GetUnitType" />
              : ''
            }
            <MissionMgtDropDown name="unitId" label={translations.units} data={this.handleFilterData} dropdownDataUrl={unitsUrl} />
            {/* <MissionMgtDropDown  name="selectedAssetType" label={translations['assets type']} data={this.handleFilterData} dropdownDataUrl="AssetTypes/GetAssetTypes" /> */}
            <div className="each-select text-left">
              <div className="date-pic">
                <label>Start Date</label>
                <CustomDatePicker name="startDate" defaultValue={startDate} changeDate={this.handleChangeDate}/>
              </div>
            </div>
            <div className="each-select text-left">
              <div className="date-pic">
                <label>End Date</label>
                <CustomDatePicker name="endDate" defaultValue={endDate} changeDate={this.handleChangeDate}/>
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
          {filterResults.length > 0 ?
            <div className="col-md-12">
              <div className="col-md-4" style={{ padding: 0 }}>
                <StatusTable thead={columns} lines={filterResults} translations={translations} />
              </div>
              <div className="col-md-8" style={{ padding: 0 }}>
                <Timeline
                  className="react-calendar-timeline"
                  sidebarWidth={0}
                  groups={groups}
                  lineHeight={51}
                  // rightSidebarWidth={100}
                  items={items}
                  defaultTimeStart={startDate}
                  defaultTimeEnd={endDate}
                  visibleTimeStart={startDate.getTime()}
                  visibleTimeEnd={endDate.getTime()}
                // defaultTimeStart={moment().add(-5, 'hours')}
                // defaultTimeEnd={moment().add(12, 'hours')}
                // visibleTimeStart={moment().add(-5, 'hours').valueOf()}
                // visibleTimeEnd={moment().add(12, 'hours').valueOf()}
                />
              </div>
            </div>
            
            : <div className="col-md-12 text-center">
              <strong>Oops!</strong> No Records Found.
              {/* <span className="border">No Records Found</span> */}
              {/* <div className="alert alert-danger">
                <strong>Oops!</strong> No Records Found.
              </div> */}
              
            </div> } 
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
  platformFilter, teamFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilter);