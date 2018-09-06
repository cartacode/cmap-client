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
import { MissionConsts, UnitConsts } from '../../dictionary/constants';
import { defaultFilter } from '../../util/helpers';
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
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
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
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleFilterData = (name, value) => {

    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        [name]: value,
      },
    });
    if(name === 'selectedResource' && this.props.tab === MissionConsts.TABS.FOP) {
      this.props.updateResource(value);
    }
  }

  handleChangeDate = (changeDate, name) => {
    const { filter } = this.state;
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
    const sidebarHeader = [{ Header: translations.platforms, columns: [
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
        Header: translations.Unit,
        accessor: 'OwningUnit',
      },
      {
        Header: translations.payload,
        accessor: 'Payload',
      },
      {
        Header: translations.Armed,
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

    const id = 'id'; //  this will be team id

    const sidebarHeader = [{ Header: translations.teams, columns: [
      {
        Header: translations.select,
        accessor: id,
        Cell: row => <div>
          <input type="radio" id={row.original[id]} name="selectedRadio" onClick={() => this.onRadioSelect(row.value)} />
          <label htmlFor={row.original.id}><span /></label>
        </div>,
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
      {
        Header: translations.Specialization,
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

  radioFilterSelect = (row) => {
    const value = row.value;
    const { filter } = this.state;
    const generatedData = {
      resourceId: filter.selectedResource,
      value: value !== undefined ? value : '',
    };
    this.props.radioFilterSelect(generatedData);
  }

  onRadioSelect = (value) => {
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
    }, () => {
      this.props.radioFilterSelect(this.state.selectedRadio);
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

  findPlatformBased =()=>{
    const { filter } = this.state;
    const data =
      {
        'COCOMId': filter.cocomId,
        'UnitId': filter.unitId,
        'StatusId': filter.platformStatusId,
        'StartDate': filter.startDate,
        'EndDate': filter.endDate,
      };

    this.props.platformFilter(data).then(() => {
      const { filterResults } = this.props;
      this.setState({
        results: filterResults,
      });
    });
  }

  findTeamBased =()=> {
    const { filter } = this.state;
    const {tab}  = this.props;

    let unitType = '';
    if(this.props.tab === MissionConsts.TABS.FOP) {
      unitType = UnitConsts.TYPE.CREW;
    }

    if(this.props.tab === MissionConsts.TABS.PED) {
      unitType = UnitConsts.TYPE.PED;
    }
    const unitId = 15; // this will come from session
    const data =
      {
        'ParentUnitId': unitId,
        'UnitType': unitType,
        'StatusId': filter.teamStatusId,
        'StartDate': filter.startDate,
        'EndDate': filter.endDate,
      };
    console.log('Team data'+JSON.stringify(data));
    this.props.teamFilter(data).then(() => {
      const { filterResults } = this.props;
      this.setState({
        results: filterResults,
      });
    });
  }

  render() {
    const { translations, tab } = this.props;
    const { selectedResource, startDate, endDate } = this.state.filter;
    // let { filterResults } = this.props;
    let { results } = this.state;

    const resourceFilter = [
      { id: MissionConsts.RESOURCE.PLATFORM, description: translations.platform },
      { id: MissionConsts.RESOURCE.TEAM, description: translations.teams },
    ];

    const columns = this.getColumns(selectedResource);

    const groups = [];
    // let content = [];
    const newItems = [];

    let itemCount = 0;


    let titleField = 'Name';
    const rootUnitId = 15;
    // unist api will be diff for FlighOps and Ped Screens
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
        const timeLine = row.TimeLine;
        for(let i = 0; i < timeLine.length; i++) {
          itemCount++;
          const newItem = { id: itemCount, group: group.id, title: timeLine[i].statusId, start_time: moment(timeLine[i].startDate), end_time: moment(timeLine[i].endDate) };
          newItems.push(newItem);
        }

        /*    timeLine.map((timeRow, timeIndex) => {
          const newItem = { id: index, group: groupId, title: timeRow.statusId, start_time: timeRow.startDate, end_time: timeRow.endDate};
          newItems.push(newItem);
        }); */
      });
    } else {
      results = [];
    }

    console.log('Filter results' + JSON.stringify(results));
    console.log('Filter results Size ' + results.length);
    console.log('Groups' + JSON.stringify(groups));
    console.log('Groups Size ' + groups.length);
    console.log('*************TimeLines*********************** ' + JSON.stringify(newItems));
    console.log('*************TimeLines Size *********************** ' + newItems.length);
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

    const items =  [
      { id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
      { id: 4, group: 1, title: 'item 4', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') },
      { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour') },
      { id: 5, group: 2, title: 'item 5', start_time: moment().add(1, 'hour'), end_time: moment().add(1.2, 'hour') },
      { id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') },
      { id: 6, group: 6, title: 'item 3', start_time: moment().add(3, 'hour'), end_time: moment().add(5, 'hour') },
      { id: 7, group: 5, title: 'item 4', start_time: moment().add(3, 'hour'), end_time: moment().add(5, 'hour') },
      { id: 8, group: 5, title: 'item 5', start_time: moment().add(5, 'hour'), end_time: moment().add(7, 'hour') },
    ] ;

    // let currentDateTime = new Date();
    const todate = moment().startOf('hour').toDate();

    

    // For ATO only Platform can be selecteed and for PED only Team can be selected
    let resourceDisabled = false;
    if(tab === MissionConsts.TABS.ATO || tab === MissionConsts.TABS.PED) {
      resourceDisabled = true;
    }
    const pageSize = results.length === 0 ? 1 : results.length;

    return(
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={this.props.headerTxt} />
          </div>
          <div className="col-md-12 filter-line ">

            <MissionMgtDropDown name="selectedResource" label={translations.resource} data={this.handleFilterData} options={resourceFilter} defaultValue = {selectedResource} disable={resourceDisabled}/>

            {selectedResource === MissionConsts.RESOURCE.TEAM ?
              <MissionMgtDropDown name="teamStatusId" label={translations.teamStatus} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=6" />
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
              <MissionMgtDropDown name="UnitType" label={translations.teamType} data={this.handleFilterData} dropdownDataUrl="UnitTypes/GetUnitType" />
              : ''
            }
            <MissionMgtDropDown name="unitId" label={translations.units} data={this.handleFilterData} dropdownDataUrl={unitsUrl} labelName="UnitName" valueName = "unitID" />
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
                  <a className="highlighted-button btn btn-info" onClick={this.onFind.bind(this)}>
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
            <div className="col-md-12">
              <div className="col-md-4" style={{ padding: 0 }}>
                {/* <StatusTable thead={columns} lines={filterResults} translations={translations} /> */}

                <ReactTable
                  data={results}
                  columns={columns}
                  loading={this.props.isLoading}
                  //defaultPageSize={pageSize}
                  minRows={pageSize}
                  className="-striped -highlight"
                  filterable={false}
                  showPageSizeOptions={false}
                  showPagination={false}
                  previousText="&#8678;"
                  nextText="&#8680;"
                  defaultFilterMethod={defaultFilter}
                />

              </div>
              <div className="col-md-8" style={{ padding: 0 }}>
                <Timeline
                  className="react-calendar-timeline"
                  sidebarWidth={0}
                  groups={groups}
                  lineHeight={51}
                  // rightSidebarWidth={100}
                  items={newItems}
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
