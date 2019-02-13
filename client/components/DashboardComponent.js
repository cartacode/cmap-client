import React from 'react';
import PropTypes from 'prop-types';
import ConfigBlock from './reusable/ConfigBlock';
import FullHeaderLine from './reusable/FullHeaderLine';
import Dropdown from './reusable/Dropdown';
import moment from 'moment';
import HalfHeaderLine from './reusable/HalfHeaderLine';
import DashboardCircleStatus from './reusable/DashboardCircleStatus';
import NumBlock from './reusable/NumBlock';
import OperationVideoBlock from './reusable/OperationVideoBlock';

import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { dashboardUser } from '../dictionary/auth';
import { formatDateTime, getTime, getMissionProgressPercentage, getDiffInMin, getDiffInSec, getHHMMSSFromSec, getMissionStatusColor } from '../util/helpers';

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session){
    this.loadData();
    }
    else { <Redirect to="/login"/> }
  }

  loadData = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.DeployedUnit || session.AssignedUnit;

    this.props.fetchOPSUtilizationPayload();
    this.props.fetchOPSUtilizationPlatform();
    this.props.fetchOPSUtilizationMission();
    this.props.fetchAISROpreationStatus();

    /* Latest Intelligence:- List of Intel Posted to Library */
    this.props.fetchLatestIntelligence(unitId);

    /* Upcoming Mission:- List of Missions with status Intel Posted.
    "Statusid": 38,"StatusAbbrev": "IPOST", */
    this.props.fetchUpcomingMission(35, unitId);

    //Live Operation Only those Missions which status is active and except videos.
    //"Active" Status-36
    this.props.fetchLiveOperation(36, unitId);
  };

  getAISROperationStatuses(statusText) {
    const { aisrOperation } = this.props;
    let statusCount = 0;
    if(aisrOperation !== undefined && aisrOperation !== null) {
      for(let index = 0; index < aisrOperation.length; index++) {
        const isrStatus = aisrOperation[index];
        if(isrStatus.Status !== undefined && statusText === isrStatus.Status.toUpperCase()) {
          statusCount = isrStatus.Count;
          break;
        }
      }
    }
    return statusCount;
  }

  getOPSUtilizationPercentage(unitType) {
    const { opsMissions } = this.props;
    let percent = 0;
    if(opsMissions !== undefined && opsMissions !== null) {
      for(let index = 0; index < opsMissions.length; index++) {
        const opsMission = opsMissions[index];
        if(unitType === opsMission.Unittype) {
          percent = opsMission.percentage;
          break;
        }
      }
    }
    return percent + '%';
  }

  getColor= (item) => {
    const color = getMissionStatusColor(item.Status);
    return color.color;
  }

  /**
   * TODO: this is the temporary fixing URL, in future it will be from Mission It means from server side according specific mission .
   */
  getLiveMissionUrl = (index) =>{
    let liveMissionURL = 'http://18.219.160.200:1935/vod/mp4:DayFlightVODF.mp4/manifest.mpd';
    if(index % 2 === 0) {
      liveMissionURL = 'http://18.219.160.200:1935/vod/mp4:TruckVODF.mp4/manifest.mpd';
    }
    return liveMissionURL;
  }

  getOperationVideoBlock() {
    // const { translations } = this.props;
    const dummyLiveOperations = [];
    const oper1 = { MissionName: 'BLUE DEVIL', missionProgress: '33%', rtb: '02:44:32', color: 'blue', liveUrl: 'http://18.219.160.200:1935/vod/mp4:Vid1.mp4/manifest.mpd' };
    const oper2 = { MissionName: 'VALIENT ANGEL', missionProgress: '70%', rtb: '04:40:11', color: 'magenta', liveUrl: 'http://18.219.160.200:1935/vod/mp4:CONUStrafficISR.mp4/manifest.mpd' };
    const oper3 = { MissionName: 'ROLLING THUNDER', missionProgress: '50%', rtb: '03:00:21', color: 'red', liveUrl: 'http://18.219.160.200:1935/vod/mp4:UAVWinter.mp4/manifest.mpd' };
    const oper4 = { MissionName: 'GODS EYE', missionProgress: '80%', rtb: '05:23:09', color: 'green', liveUrl: 'http://18.219.160.200:1935/vod/mp4:Vid3.mp4/manifest.mpd' };

    dummyLiveOperations.push(oper1);
    dummyLiveOperations.push(oper2);
    dummyLiveOperations.push(oper3);
    dummyLiveOperations.push(oper4);

    return dummyLiveOperations.map((item, i) => (
      <OperationVideoBlock key={'op' + i} blockHeader={item.MissionName} percent={item.missionProgress} remainTime={item.rtb} progressbarColor = {item.color} liveMissionURL = {item.liveUrl}/>
    ));
    // uncomment below one and comment above one for actulal data
    // return this.props.allLiveOperations.map((item, i) => (
    //   <OperationVideoBlock key={'op' + i} blockHeader={item.MissionName} percent={this.getMissionProgress(item.StartDate, item.EndDate)} remainTime={this.getRTB(item.StartDate, item.EndDate)} progressbarColor = {this.getColor(item)} liveMissionURL = {this.getLiveMissionUrl(i)}/>
    // ));
  }

  getCountdown(row) {
    //const oneDay = 1000 * 60 * 60 * 24;
    let startDate = row.original.StartDate;
    startDate = new Date(startDate);
    const currentDate = new Date();
    // get total seconds between the times
    let differenceMS = Math.abs(startDate - currentDate) / 1000;
    // calculate (and subtract) whole days
    let days =  Math.floor(differenceMS / 86400);
    differenceMS -= days * 86400;
    // calculate (and subtract) whole hours
    let hours = Math.floor(differenceMS / 3600) % 24;
    differenceMS -= hours * 3600;
    // calculate (and subtract) whole minutes
    let minutes = Math.floor(differenceMS / 60) % 60;
    differenceMS -= minutes * 60;
    // what's left is seconds
    let seconds = Math.floor(differenceMS) % 60;
    return days + 'd ' + hours + 'h ' + minutes + 'm ' ;
  }

  getIntelColumns() {
    const { translations } = this.props;

    return  [
      {
        Header: translations.date,
        accessor: 'StartDate',

        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value),

        sortMethod: (a, b) => {
          if (a.length === b.length) {
            return a > b ? 1 : -1;
          }
          return a.length > b.length ? 1 : -1;
        }, // String-based value accessors!
        Cell : d => <div><span>

        <a href={(d.original.Report)} target="_blank">
          {formatDateTime(d.BestCollectionTime)}
        </a>
        </span>

        </div>,

      },
      {
        Header: translations['Supported Command'],
        accessor: 'SupportedCommand',
      },
      {
        Header: translations['Named Operation'],
        accessor: 'NamedOperation',
      },
      {
        Header: translations['Threat Group'],
        accessor: 'ThreatGroup',
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionType',
      },
      {
        Header: translations.classification,
        accessor: 'Classification',
        maxWidth: 60,
      },
    ];
  }

  getMissionColumns() {
    const { translations } = this.props;
    return [
      {
        Header: translations.countdown,
        accessor: 'countdown',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value),

        sortMethod: (a, b) => {
          const temp = moment(a);
          const tmp2 = moment(b);
          return temp.diff(tmp2);
        },
        Cell: row => <div>

        <Link to={{ pathname: `/mission-mgt/mission-detail/${row.original.MissionID}` }} target="_blank">
          <span>{this.getCountdown(row)}</span>
        </Link>
        </div>,
      },
      {
        Header: translations['Supported Command'],
        accessor: 'SupportedCommand',
      },
      {
        Header: translations['Threat Group'],
        accessor: 'ThreatGroup',
      },
      {
        Header: translations['Named Operation'],
        accessor: 'NamedOperation',
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionType',
      },
      {
        Header: translations.classification,
        accessor: 'Classification',
        maxWidth: 60,
      },
    ];
  }

    getMissionProgress = (startDate, endDate) => {
      const currentDate = new Date();
      // const start = moment(startDate);
      // const end = moment(endDate);
      const num = getDiffInMin(startDate, currentDate);
      const denom = getDiffInMin(startDate, endDate);
      let progress = Math.floor((num / denom) * 100);
      if(progress < 0 || progress > 100) {
        progress = 1;
      }

      return progress + '%';
    }

    // Time elapsed for mission
getRTB = (startDate, endDate) => {


  const currentDate = new Date();
  // const start = moment(startDate);
  let secondsElapsed = getDiffInSec(startDate, currentDate);
  if(secondsElapsed < 0) {
    secondsElapsed = 1;
  }
  // const formattedTime = moment.duration(secondsElapsed, 'seconds').format('hh:mm:ss');
  const formattedTime = getHHMMSSFromSec(secondsElapsed);

  return formattedTime;

}

  render() {

    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = ses.UserRoles;
    const roles2 = JSON.parse(roles);
    const access = roles2.some(v => dashboardUser.includes(v));
    console.log(access);

    const langs = ['val 1', 'val 2'];

    const sigacts = [{value:'Kinetic Strikes', label:'Kinetic Strikes'},{value:'Small Arms Fire', label:'Small Arms Fire'},{value:'IEDs', label:'IEDs'},
    {value:'Mortar Fire', label:'Mortar Fire'}, {value:'Casualty-Enemy', label:'Casualty-Enemy'}, {value:'Casualty-Civilian', label:'Casualty-Civilian'},
    {value:'Abduction', label:'Abduction'},{value:'Suspicious Activity', label:'Suspicious Activity'},{value:'Friendly Activity', label:'Friendly Activity'}
    ];

    const weather = [{value:'Current Surface', label:'Current Surface'},{value:'Current Air', label:'Current Air'},{value:'Current Sea', label:'Current Sea'},
    {value:'Next 24-Surface', label:'Next 24-Surface'}, {value:'Next 24-Air', label:'Next 24-Air'}, {value:'Next 24-Sea', label:'Next 24-Sea'} ];

    const aisr = [{value:'Active Missions', label:'Active Missions'},{value:'Past 30 Days', label:'Past 30 Days'},{value:'Past 5 Days', label:'Past 5 Days'},
    {value:'Past 1 Day', label:'Past 1 Day'}, {value:'Upcoming 1 Day', label:'Upcoming 1 Day'}, {value:'Upcoming 5 Days', label:'Upcoming 5 Days'} ];

    const force = [{value:'Blue Forces', label:'Blue Forces'},{value:'Red Forces', label:'Red Forces'},{value:'Green Forces', label:'Green Forces'},
    {value:'Yellow Forces', label:'Yellow Forces'}, {value:'All Forces', label:'All Forces'}];

    const { translations } = this.props;

    // For Platform
    let { opsPlatform } = this.props;
    // For Payload
    let { opsPayload } = this.props;
    // For Flight, Line, PED
    const { opsMissions } = this.props;

    const { aisrOperation } = this.props;

    // For Left Table
    const { allLatestIntelligence } = this.props;

    // For right table
    const { allUpcomingMissions } = this.props;

    const { allLiveOperatallLatestIntelligenceions } = this.props;



    if(opsPlatform instanceof Object) {
      opsPlatform = '0';
    }

    if(opsPayload instanceof Object) {
      opsPayload = '0';
    }

    const actionRequired = [
      { name: 'Intel request #8232-2 awating review', type: 'checkbox' },
      { name: 'Req. Overlap on #9232-2 / #8823-2', type: 'checkbox' },
      { name: 'Update/Add PRISM Imagery #3233-2', type: 'checkbox' },
      { name: 'Contingency Required #5922-1', type: 'checkbox' },
    ];

    const notification = [
      { name: 'Mission Request #2322-3 AOT Issued', type: 'checkbox' },
      { name: 'Mission Flag Day 9 Line-HVT in AO', type: 'checkbox' },
      { name: 'Mission LightWave Flight Plan Posted', type: 'checkbox' },
      { name: 'Mission Green Eye Fully Resourced', type: 'checkbox' },
    ];

    const priorityAlerts = [
      { name: 'Rolling Thunder Start in 1h 06m', type: 'checkbox' },
      { name: 'Mission FlagDay Cancel', type: 'checkbox' },
      { name: 'Mission LightHit Delay - Maintenance', type: 'checkbox' },
      { name: 'DVB-RCS Channels 10-18 Down', type: 'checkbox' },
    ];
    const latestIntellegence = allLatestIntelligence;
    const intelColumns = this.getIntelColumns();
    const upcomingMission = allUpcomingMissions;
    const missionColumns = this.getMissionColumns();;

    return (access ? (
      <div>
        <div className="row dashboard">
          <div className="col-md-12" style={{ padding: 0 }}>
            <div className="col-md-4 col-xs-12">
              <ConfigBlock subHeaderText={translations['action required']} fields={actionRequired} block="1" />
            </div>
            <div className="col-md-4 col-xs-12">
              <ConfigBlock subHeaderText={translations.notification} fields={notification} block="2"/>
            </div>
            <div className="col-md-4 col-xs-12">
              <ConfigBlock subHeaderText={translations['Priority Alerts']} fields={priorityAlerts} block="3"/>
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                {translations['a-isr operation status']}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
            </div>
          </div>

          <div className="col-md-12 operating-status">
            <NumBlock headerText={translations["Requests"]} blockValue={this.getAISROperationStatuses('REQUEST')} />
            <img src= "/assets/img/dashboard/status_divider.png" />

            <NumBlock headerText={translations.pending} blockValue={this.getAISROperationStatuses('PENDING')} />
            <img className="mirrored-Y-image" src="/assets/img/dashboard/status_divider.png" alt=""/>

            <NumBlock headerText={translations.denied} blockValue={this.getAISROperationStatuses('DENIED')} />
            <img src= "/assets/img/dashboard/status_divider.png" />

            <NumBlock headerText={translations.assigned} blockValue={this.getAISROperationStatuses('ASSIGNED')} />
            <img className="mirrored-Y-image" src="/assets/img/dashboard/status_divider.png" alt=""/>

            <NumBlock headerText={translations.active} blockValue={this.getAISROperationStatuses('ACTIVE')} />
            <img src= "/assets/img/dashboard/status_divider.png" />

            <NumBlock headerText={translations.canceled} blockValue={this.getAISROperationStatuses('CANCELED')} />
            <img className="mirrored-Y-image" src="/assets/img/dashboard/status_divider.png" alt=""/>

            <NumBlock headerText={translations.completed} blockValue={this.getAISROperationStatuses('COMPLETED')} />

          </div>

          <div className="col-md-12">
            <div className="col-md-6"> *
            <div className="status-block-header">{translations['ops utilization']}</div>
            <div className="status-block">
              <DashboardCircleStatus statusHeader={translations.platform} statusPercent={(opsPlatform !== null && opsPlatform !== undefined) ? opsPlatform + '%' : '0%'} />
              <DashboardCircleStatus statusHeader={translations.payload} statusPercent={(opsPayload !== null && opsPayload !== undefined) ? opsPayload + '%' : '0%' } />
              <DashboardCircleStatus statusHeader={translations['flight crew']} statusPercent={this.getOPSUtilizationPercentage(2)} />
              <DashboardCircleStatus statusHeader={translations['line crew']} statusPercent={this.getOPSUtilizationPercentage(3)} />
              <DashboardCircleStatus statusHeader={translations['ped crew']} statusPercent={this.getOPSUtilizationPercentage(1)} />
            </div>
             </div>
            <div className="col-md-6">
              <div className="status-block-header">{translations['intel performance']}</div>
              <div className="status-block">
                <DashboardCircleStatus statusHeader={translations['ccri\'s']} statusPercent="85%" />
                <DashboardCircleStatus statusHeader={translations['pir\'s']} statusPercent="72%" />
                <DashboardCircleStatus statusHeader={translations['eei\'s']} statusPercent="68%" />
                <DashboardCircleStatus statusHeader={translations['nai\'s']} statusPercent="72%" />
                <DashboardCircleStatus statusHeader={translations['pid\'s']} statusPercent="43%" />
              </div>
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['live operation']} />
          </div>
          <div className="col-md-12">
            <div className="operating-content">
            {this.getOperationVideoBlock()}
              {/* { (allLiveOperations.length > 0) ? this.getOperationVideoBlock() : 'No Live Operations' } */}
              {/* <OperationVideoBlock blockHeader={translations['blue devil']} percent="10%" remainTime="05:21:33"/>
              <OperationVideoBlock blockHeader={translations['valient angel']} percent="80%" remainTime="06:21:33"/>
              <OperationVideoBlock blockHeader={translations['rolling thunder']} percent="50%" remainTime="01:25:18"/>
              <OperationVideoBlock blockHeader={translations['she devil']} percent="50%" remainTime="02:30:03"/> */}
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['operating environment']} />
          </div>
          <div className="col-md-12">
            <div className="operating-content">
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations.sigacts}
                    </div>
                    <div className="col-md-6 t">
                      <Dropdown key="1" id="1" options={sigacts}/>

                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/sigacts.png" className="photo" alt=""/>
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['current weather']}
                    </div>
                    <div className="col-md-6 ">
                      <Dropdown key="1" id="1" options={weather}/>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/current_weather.png" className="photo" alt=""/>
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['a-isr coverage']}
                    </div>
                    <div className="col-md-6 ">
                      <Dropdown key="1" id="1" options={aisr}/>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/a-isr.png" className="photo" alt=""/>
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['force positions']}
                    </div>
                    <div className="col-md-6 ">
                      <Dropdown key="1" id="1" options={force}/>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/force_position.png" className="photo" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12" style={{ padding: 0 }}>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations['latest intelligence']} />
              <ReactTable
                    data={latestIntellegence}
                columns={intelColumns}
                defaultPageSize={5}
                className="-striped -highlight"

                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}


              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations['upcoming mission']} />
              <ReactTable
                data={upcomingMission}
                columns={missionColumns}
                defaultPageSize={5}
                getTrProps={(state, rowInfo) => ({

                 // onClick: () => this.props.history.push(`mission-mgt/mission-detail/`+rowInfo.original.MissionID)
                 // onClick: () => '<a href="" >df</a>'
                 })}
                className="-striped -highlight"
                filterable

                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12 alert">
            <img src="/assets/img/admin/exclamation_mark.png" alt=""/>
            <div>flash alert: [08:12:00] vbied in massoud square: 54 civ, 3 nato casulties ... developing ... [08:01:01] vbied in massoud square: 54 civ, 3 narto casul</div>
            <img src="/assets/img/admin/exclamation_mark.png" alt="" />
          </div>
        </div>

      </div>) : null
    );
  }
}

DashboardComponent.propTypes = {
  children: PropTypes.element,
};

export default DashboardComponent;
