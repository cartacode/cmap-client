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

class TimelineFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clear: false,
      filter: {
        selectedResource: '',
        selectedView: '',
        selectedCOCOM: '',
        selectedUnit: '',
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

  componentDidUpdate = (prevProps, prevState) => {
          
  }

  handleFilterData = (selectedDropDownType, selectedDropdownValue) => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        selectedResource: selectedDropDownType === '1' ? selectedDropdownValue : filter.selectedResource,
        selectedView: selectedDropDownType === '2' ? selectedDropdownValue : filter.selectedView,
        selectedCOCOM: selectedDropDownType === '3' ? selectedDropdownValue : filter.selectedCOCOM,
        selectedUnit: selectedDropDownType === '4' ? selectedDropdownValue : filter.selectedUnit,
        selectedAssetType: selectedDropDownType === '5' ? selectedDropdownValue : filter.selectedAssetType,
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
   
//console.log(JSON.stringify(this.state.filter));
console.log("*****************************"+JSON.stringify(filter));

  }


  radioFilterSelect=(value)=>{
    debugger;
    const { filter } = this.state;
    const generatedData = {
      resourceId: filter.selectedResource,
      value:value != undefined? value:'',
    };
    this.props.radioFilterSelect(generatedData);
  }

  onFind() {
    console.log('find');
    const { filter } = this.state;
  }

  render() {
    const { translations } = this.props;

    const sideTableContent = [
      { id: 1, select: 'check', Unit: '116th MIB', team: 'Blue', type: 'FMV', location: 'theater' },
      { id: 2, select: 'check', Unit: '116th MIB', team: 'red', type: 'Fmv', location: 'theater' },
      { id: 3, select: 'check', Unit: '116th MIB', team: 'Yellow', type: 'fmv', location: 'theater' },
    ];

    const sideTableHeader = [
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
    ];

    const { tab } = this.props;
    if(tab === 'ISR') {
      sideTableHeader.splice(0, 1);
    }

    const groups = [
      { id: 1, title: '<table><tr><td style = "padding:20px">aaa</td><td>aaaa</td></tr></table>' },
      { id: 2, title: 'group 2' },
      { id: 3, title: 'group 3' },
    ];

    const items = [
      { id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour') },
      { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour') },
      { id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') },
    ];

    let currentDateTime = new Date();
    
    return(
      <div>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <FullHeaderLine headerText={this.props.headerTxt} />
          </div>
          <div className="col-md-12 filter-line">
            <MissionMgtDropDown key="1" id="1" label={translations.resource} data={this.handleFilterData} options={this.props.resource} defaultResource ={this.props.defaultResource}/>
            <MissionMgtDropDown key="2" id="2" label={translations.view} data={this.handleFilterData} dropdownDataUrl="StatusCodes/GetStatusCodes?type=5" />
            <MissionMgtDropDown key="3" id="3" label={translations.cocom} data={this.handleFilterData} dropdownDataUrl="COCOM/GetCOCOMs" />
            <MissionMgtDropDown key="4" id="4" label={translations.unit} data={this.handleFilterData} dropdownDataUrl="Units/GetUnits" />
            <MissionMgtDropDown key="5" id="5" label={translations['assets type']} data={this.handleFilterData} dropdownDataUrl="AssetTypes/GetAssetTypes" />
            <div className="each-select">
              <div className="date-pic">
                 <CustomDatePicker  name="startDate" defaultValue={currentDateTime} changeDate={this.handleChangeDate}/> 
              </div>
              <div className="date-pic">
                  <CustomDatePicker  name="endDate" defaultValue={currentDateTime}  changeDate={this.handleChangeDate}/> 
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
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
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
  tab: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilter);

