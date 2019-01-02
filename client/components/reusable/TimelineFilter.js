import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import 'react-table/react-table.css';
import CustomDatePicker from './CustomDatePicker';
import FullHeaderLine from './FullHeaderLine';
import MissionMgtDropDown from './MissionMgtDropDown';
import TickBox from './TickBox';
import { connect } from 'react-redux';
import { teamFilter, platformFilter } from '../../actions/mssionmgt';
import { MissionConsts, UnitConsts, DateConsts, TableDefaults } from '../../dictionary/constants';

import ReactTable from 'react-table';

class TimelineFilter extends React.Component {

  constructor(props) {
    super(props);
    // setting timeline date range default to 24 hours from now
    const startDate = moment().startOf('day').toDate();
    const endDate = moment().startOf('hour').add(24, 'hour').toDate();
    this.state = {
      clear: false,
      selectedRadio: '',
      selectedTeams: [],
      selectedPlatform: '',
      platformInventoryID:'',
      results: [],
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
        
      },
      pagingState: {
        pageSize: TableDefaults.PAGE_SIZE_7, // Default Page Size
        page: 0, // Page Number
        sorted: true,
        filtered: true,
        usePaging: true,
      },
      pages: null, // Total Number of Pages
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.fetchData = this.fetchData.bind(this);

  }

  componentWillMount = () => {
    const { defaultResource } = this.props;
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

  componentDidMount = () => {
    this.props.onRef(this);
    this.onFind();
    //this.fetchData(this.state.pagingState);
  }

  componentWillUnmount() {
    // this.props.onRef(undefined);
  }

  handleFilterData = (name, value) => {
    
    if( value === '0' )
      return;

    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        [name]: value,
      },
    });
    if(name === 'selectedResource' /* && this.props.tab === MissionConsts.TABS.FOP */) {
      this.props.updateResource(value);
    }
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
    const sidebarHeader = [{ Header: translations.platforms, columns: [
      {
        Header: translations.select,
        accessor: id,
        maxWidth: 62,
        Cell: row => <div>
          <input type="radio" id={row.original.id} name="selectedRadio" value={row.value} onChange={() => this.onRadioSelect(row)} />
          <label htmlFor={row.original.id}><span /></label>
        </div>,
      },
      {
        Header: translations.platform,
        accessor: 'Name',
      },
      {
        Header: translations.unit,
        accessor: 'OwningUnit',
      },
      {
        Header: translations['Tail#'],
        accessor: 'TailNumber',
      },
      {
        Header: translations.status,
        accessor: 'PlatformStatus',
        maxWidth: 61,
      },
      {
        Header: translations.payload,
        accessor: 'Payload',
      },
      {
        Header: translations.payload,
        accessor: 'Payload2',
      },
      {
        Header: translations.Location,
        accessor: 'Location',
      },
    ] },
    ];

    // remove radio button column and tail # if tab is ISR
    if(tab === MissionConsts.TABS.ISR) {
      sidebarHeader[0].columns.splice(3, 1);
      sidebarHeader[0].columns.splice(0, 1);
      // sidebarHeader[0].columns.splice(0, 1);
    }

    // remove tail # for ATO
    if(tab === MissionConsts.TABS.ATO) {
      sidebarHeader[0].columns.splice(3, 1);
    }

    // owning unit not needed in case of FOP
    if(tab === MissionConsts.TABS.FOP) {
      sidebarHeader[0].columns.splice(2, 1);
    }

    return sidebarHeader;

  }

  getTeamCols = () => {

    const { translations, tab } = this.props;

    const id = 'id'; //  this will be team id

    const sidebarHeader = [{ Header: translations.teams, columns: [
      {
        Header: translations.select,
        accessor: id,
        maxWidth: 62,
        Cell: row => <TickBox id={'team-' + row.original[id]} name="teams" value={row.value} onChecked={this.onTeamCheck} onUnchecked={this.onTeamUnCheck}/>,
        // <div>
        //   <input type="checkbox" id={row.original[id]} name="teams" onClick={() => this.onTeamCheck(row)} />
        //   <label htmlFor={row.original.id}><span /></label>
        // </div>,
      },
      {
        Header: translations.Location,
        accessor: 'Location',
      },
      {
        Header: translations.Unit,
        accessor: 'Unit',
      },
      {
        Header: translations.Name,
        accessor: 'TeamName',
      },
      {
        Header: translations.Type,
        accessor: 'TeamType',
      },
    ] },
    ];

    // remove radio button column if tab is ISR
    if(tab === MissionConsts.TABS.ISR) {
      sidebarHeader[0].columns.splice(0, 1);
    } else{
      sidebarHeader[0].columns.splice(4, 1);
    }

    return sidebarHeader;

  }

  // Removing team from teams array
  onTeamUnCheck = (teamId) => {
    const { selectedTeams } = this.state;
    const idx = selectedTeams.indexOf(teamId);
    if(idx !== -1) {
      selectedTeams.splice(idx, 1);
    }
    this.setState({
      selectedTeams,
    });
  }

  // Pushing teamId to teams array
  onTeamCheck = (teamId) => {
    const { selectedTeams } = this.state;
    // selectedTeams.push(teamId);
    this.setState({
      selectedTeams: [...selectedTeams, teamId],
    });
  }

  radioFilterSelect = (row) => {
    const value = row.value;
    const { filter } = this.state;
    const generatedData = {
      resourceId: filter.selectedResource,
      value: value !== undefined ? value : '',
    };
    this.props.radioFilterSelect(generatedData);
  }

  onRadioSelect = (row) => {
    let value = row;
    let platformInventoryID='';

    if(row.original !== undefined) {
      value = row.original.UnitId;
      platformInventoryID = row.original.id;
    }
    // const { tab } = this.props;
    // const { selectedResource } = this.state.filter;
    // let value = row.original.id;

    // if(selectedResource === MissionConsts.RESOURCE.TEAM) {
    //   value = row.original.UnitId;
    // }
    // // IF Tab ATO selected.
    // if(tab === MissionConsts.TABS.ATO) {
    //   value = row.original.UnitId;
    // }
    this.setState({
      selectedRadio: value,
      platformInventoryID,
    }, () => {
      this.props.radioFilterSelect(this.state.selectedRadio,this.state.platformInventoryID);
    });
  }

  /**
   * Click event of Find & Filter Button.
   */
  onFind = () => {
    // event.preventDefault();
    const { selectedResource } = this.state.filter;
    
    if(selectedResource === MissionConsts.RESOURCE.PLATFORM) {
      this.findPlatformBased();
    } else if(selectedResource === MissionConsts.RESOURCE.TEAM) {
      this.findTeamBased();
    }
  }

  findPlatformBased = () => {
    const { filter, pagingState } = this.state;
    const startDate = moment(filter.startDate).format(DateConsts.DB_DATETIME_FORMAT);
    const endDate = moment(filter.endDate).format(DateConsts.DB_DATETIME_FORMAT);
    // this.callbackFunction = callback;
    const data =
      {
        'COCOMId': filter.cocomId,
        'UnitId': filter.unitId,
        'StatusId': filter.platformStatusId,
        'StartDate': startDate,
        'EndDate': endDate,
      };

    this.props.platformFilter(data, pagingState.usePaging, pagingState.pageSize, pagingState.page).then(() => {
      const { filterResults } = this.props;
      this.setState({
        results: filterResults.data,
        pages: filterResults.totalPages,
      });
    });
  }

  findTeamBased =()=> {

    const { filter, pagingState } = this.state;
    const { tab } = this.props;
    const session = JSON.parse(localStorage.getItem('session'));
    let unitType = filter.UnitType;
    if(tab === MissionConsts.TABS.FOP) {
      unitType = UnitConsts.TYPE.CREW;
    }

    if(tab === MissionConsts.TABS.PED) {
      unitType = UnitConsts.TYPE.PED;
    }
    const startDate = moment(filter.startDate).format(DateConsts.DB_DATETIME_FORMAT);
    const endDate = moment(filter.endDate).format(DateConsts.DB_DATETIME_FORMAT);
    // const unitId = 15; // this will come from session
   
    const unitId = session.AssignedUnit;
    const data =
      {
        'ParentUnitId': unitId,
        'UnitType': unitType,
        'StatusId': filter.teamStatusId,
        'StartDate': startDate,
        'EndDate': endDate,
      };
    this.props.teamFilter(data, pagingState.usePaging, pagingState.pageSize, pagingState.page).then(() => {
      const { filterResults } = this.props;
      this.setState({
        results: filterResults.data,
        pages: filterResults.totalPages,
      });
    });
  }


  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({
    //   // loading: true,
      pagingState: {
        pageSize: state.pageSize,
        page: state.page + 1,
        sorted: state.sorted,
        filtered: state.filtered,
        usePaging: true,
      },
    }, () =>{
      // Request the data however you want.  Here, we'll use our mocked service we created earlier
      this.onFind();
    }
    );
    
  }

  render() {
    const { translations, tab } = this.props;
    const { selectedResource } = this.state.filter;
    let { startDate, endDate } = this.state.filter;
    let { pages } = this.state;

    const keys = {
      groupIdKey: 'id',
      groupTitleKey: 'title',
      groupRightTitleKey: 'rightTitle',
      itemIdKey: 'id',
      itemTitleKey: 'title',
      itemDivTitleKey: 'title',
      itemGroupKey: 'group',
      itemTimeStartKey: 'start_time',
      itemTimeEndKey: 'end_time',
    };

    // as custom datepicker retunrs strig date on date select so nned to convert this to date obj
    if(typeof startDate === 'string') {
      startDate = moment(startDate).toDate();
    }
    if(typeof endDate === 'string') {
      endDate = moment(endDate).toDate();
    }
    
    let { results, data } = this.state;

    const resourceFilter = [
      { id: MissionConsts.RESOURCE.PLATFORM, description: translations.platform },
      { id: MissionConsts.RESOURCE.TEAM, description: translations.teams },
    ];

    const columns = this.getColumns(selectedResource);
    let groups = [];
    let items = [];

    let titleField = 'Name';
    // const rootUnitId = 15;
    const session = JSON.parse(localStorage.getItem('session'));
    const rootUnitId = session.AssignedUnit;
    // units api will be diff for FlighOps and Ped Screens
    let unitsUrl = 'CommandStructure/GetUserUnitAndSubordinateUnits?rootUnitID=' + rootUnitId;
    if(selectedResource === MissionConsts.RESOURCE.TEAM) {
      titleField = 'TeamName';
      if(tab === MissionConsts.TABS.FOP) {
        unitsUrl += '&unitType=2';
      } else if(tab === MissionConsts.TABS.PED) {
        unitsUrl += '&unitType=1';
      }
    }

    if(results !== undefined) {
      results.map((row, index) => {
        // creating groups
        const group = { id: row.id, title: row[titleField] };
        groups.push(group);
        // creating items for timeline
        const timeLine = row.TimeLine;
        const length = timeLine.length;
        for(let i = 0; i < length; i++) {
          const id = 'idx-' + index + '-' + i;
          const obj = timeLine[i];
          const missionName = (obj.missionName !== null && obj.missionName !== '') ? obj.missionName : translations.mission + ' - ' + obj.missionID;
          const item = {
            id,
            group: group.id,
            title: missionName,
            start_time: moment(obj.startDate),
            end_time: moment(obj.endDate)            
          };
          items.push(item);
        }

        /*    timeLine.map((timeRow, timeIndex) => {
          const newItem = { id: index, group: groupId, title: timeRow.statusId, start_time: timeRow.startDate, end_time: timeRow.endDate};
          newItems.push(newItem);
        }); */
      });
      // adding an empty group to make make another row in timeline corresponding to pagination space in table on left
      groups.push({});
    } else {
      results = [];
    }

    // For ATO only Platform can be selecteed and for PED only Team can be selected
    let resourceDisabled = false;
    if(tab === MissionConsts.TABS.ATO || tab === MissionConsts.TABS.PED) {
      resourceDisabled = true;
    }
    
    const pageSize = results.length === 0 ? 1 : results.length;
    
    return(
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12 ">
            <FullHeaderLine headerText={this.props.headerTxt} />
          </div>
          <div className="col-md-12 filter-line text-center">
            {tab === MissionConsts.TABS.ISR || tab === MissionConsts.TABS.FOP ?
              <MissionMgtDropDown name="selectedResource" label={translations.resource} data={this.handleFilterData} options={resourceFilter} defaultValue = {selectedResource} disable={resourceDisabled}/>
              : ''
            }

            {selectedResource === MissionConsts.RESOURCE.TEAM && tab == MissionConsts.TABS.ISR ?
              <MissionMgtDropDown name="teamStatusId" label={translations.teamStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=6" />
              : ''
            }
            {selectedResource === MissionConsts.RESOURCE.PLATFORM && tab == MissionConsts.TABS.ISR ?
              <MissionMgtDropDown name="platformStatusId" label={translations.platformStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=5" />
              : ''
            }
            {selectedResource === MissionConsts.RESOURCE.PLATFORM && tab == MissionConsts.TABS.ISR ?
              <MissionMgtDropDown name="cocomId" label={translations.cocom} data={this.handleFilterData} dropdownDataUrl="COCOM/GetCOCOMs" />
              : ''
            }

            { (selectedResource === MissionConsts.RESOURCE.TEAM && tab == MissionConsts.TABS.ISR) ?
              <MissionMgtDropDown name="UnitType" label={translations.teamType} data={this.handleFilterData} dropdownDataUrl="UnitTypes/GetUnitType" />
              : ''
            }
            { (tab == MissionConsts.TABS.ISR) ?
              <MissionMgtDropDown name="unitId" label={translations.units} data={this.handleFilterData} dropdownDataUrl={unitsUrl} labelName="UnitName" valueName = "unitID" />
              : ''
            }
            {/* <MissionMgtDropDown  name="selectedAssetType" label={translations['assets type']} data={this.handleFilterData} dropdownDataUrl="AssetTypes/GetAssetTypes" /> */}
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
            <div className="filter-button">
              <div className="row action-buttons" >
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <a className="highlighted-button btn filter" onClick={this.onFind.bind(this)}>
                    {translations['find & filter']}
                  </a>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mission-mgt">
          { (results !== undefined && results.length > 0) ?
            <div className="col-md-12 timeline-border">
              <div className="col-md-4" style={{ padding: 0 }}>
                {/* <StatusTable thead={columns} lines={filterResults} translations={translations} /> */}
                <div id="timeline">
                  <ReactTable
                    data={results}
                    columns={columns}
                    loading={this.props.isLoading}
                    //pageSize={5}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    pages={pages} // Display the total number of pages
                    onFetchData={this.fetchData} // Request new data when things change
                    defaultPageSize={TableDefaults.PAGE_SIZE_7}
                    pageSizeOptions={[7, 10, 20, 25, 50, 100]}

                  // previousText="&#8678;"
                  // nextText="&#8680;"
                  // defaultFilterMethod={defaultFilter}
                  />
                </div>

              </div>
              <div className="col-md-8" style={{ padding: 0 }}>
                <Timeline
                  className="react-calendar-timeline"
                  sidebarWidth={0}
                  groups={groups}
                  lineHeight={52}
                  headerLabelGroupHeight={28}
                  headerLabelHeight={32}
                  itemHeightRatio={0.50}
                  // rightSidebarWidth={100}
                  items={items}
                  keys={keys}
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
  updateResource: PropTypes.func,
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
