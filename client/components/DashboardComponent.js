import React from 'react';  
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CustomDatePicker from './reusable/CustomDatePicker';
import ConfigBlock from './reusable/ConfigBlock';
import FullHeaderLine from './reusable/FullHeaderLine';
import Dropdown from './reusable/Dropdown';
import FormBlock from "./reusable/FormBlock";
import StatusTable from "./reusable/StatusTable";
import HalfHeaderLine from './reusable/HalfHeaderLine';
import DashboardCircleStatus from './reusable/DashboardCircleStatus';
import NumBlock from './reusable/NumBlock';
import OperationVideoBlock from './reusable/OperationVideoBlock';


import FilterDropdown from './reusable/FilterDropdown';
import FilterDatePicker from './reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let langs = ['val 1', 'val 2'];

    const {translations: {translations}} = this.props;

    const actionRequired = [
      {name: 'Intel request #8232-2 awating review', type: 'checkbox'},
      {name: 'Req. Overlap on #9232-2 / #8823-2', type: 'checkbox'},
      {name: 'Update/Add PRISM Imagery #3233-2', type: 'checkbox'},
      {name: 'Contingency Required #5922-1', type: 'checkbox'},
    ];

    const notification = [
      {name: 'Mission Request #2322-3 AOT Issued', type: 'checkbox'},
      {name: 'Mission Flag Day 9 Line-HVT in AO', type: 'checkbox'},
      {name: 'Mission LightWave Flight Plan Posted', type: 'checkbox'},
      {name: 'Mission Green Eye Fully Resourced', type: 'checkbox'}
    ];

    const priorityAlerts = [
      {name: 'Rolling Thunder Start in 1h 06m', type: 'checkbox'},
      {name: 'Mission FlagDay Cancel', type: 'checkbox'},
      {name: 'Mission LightHit Delay - Maintenance', type: 'checkbox'},
      {name: 'DVB-RCS Channels 10-18 Down', type: 'checkbox'}
    ];

    const latestIntellegence = [
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
      {date:'11/03/17', mission:'end game', area:'kandahar, afg', type:'force protection', class:'UNC'},
    ];

    const intelColumns = [
      {
        Header: translations["date"],
        accessor: 'date', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Mission Name'],
        accessor: 'mission',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['area'],
        accessor: 'area',
      }, 
      {
        Header: translations['Mission Type'],
        accessor: 'type',
      },
      {
        Header: translations['class'],
        accessor: 'class',
      }
    ];

    const upcomingMission = [
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
      {countdown:'00d 00h 16m', mission:'green eye', area:'kandahar, AFG', type:'force protection', class:'UNC'},
    ];

    const missionColumns = [
      {
        Header: translations["countdown"],
        accessor: 'countdown', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Mission Name'],
        accessor: 'mission',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['area'],
        accessor: 'area',
      }, 
      {
        Header: translations['Mission Type'],
        accessor: 'type',
      },
      {
        Header: translations['class'],
        accessor: 'class',
      }
    ];

    return (
      <div>
        <div className="row dashboard">
          <div className="col-md-12" style={{padding:0}}>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["action required"]} fields={actionRequired} block="1" />
            </div>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["notification"]} fields={notification} block="2"/>
            </div>
            <div className="col-md-4">
              <ConfigBlock subHeaderText={translations["Priority Alerts"]} fields={priorityAlerts} block="3"/>
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <div className="header-line">
              <img src="/images/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                {translations["a-isr operation status"]}
              </div>
              <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
            </div>
          </div>
          <div className="col-md-12 operating-status">
            <NumBlock headerText="Requests" blockValue="23" />
            <img src= "/images/dashboard/status_divider.png" />
            <NumBlock headerText={translations["pending"]} blockValue="12" />
            <img className="mirrored-Y-image" src="/images/dashboard/status_divider.png" alt=""/>
            <NumBlock headerText={translations["denied"]} blockValue="3" />
            <img src= "/images/dashboard/status_divider.png" />
            <NumBlock headerText={translations["assigned"]} blockValue="16" />
            <img className="mirrored-Y-image" src="/images/dashboard/status_divider.png" alt=""/>
            <NumBlock headerText={translations["active"]} blockValue="12" />
            <img src= "/images/dashboard/status_divider.png" />
            <NumBlock headerText={translations["canceled"]} blockValue="1" />
            <img className="mirrored-Y-image" src="/images/dashboard/status_divider.png" alt=""/>
            <NumBlock headerText={translations["completed"]} blockValue="15" />
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="status-block-header">{translations["ops utilization"]}</div>
              <div className="status-block">
                <DashboardCircleStatus statusHeader={translations["platform"]} statusPercent="88%"  />
                <DashboardCircleStatus statusHeader={translations["payload"]} statusPercent="55%"  />
                <DashboardCircleStatus statusHeader={translations["flight crew"]} statusPercent="89%" />
                <DashboardCircleStatus statusHeader={translations["line crew"]} statusPercent="80%" />
                <DashboardCircleStatus statusHeader={translations["ped crew"]} statusPercent="78%" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="status-block-header">{translations["intel performance"]}</div>
              <div className="status-block">
                <DashboardCircleStatus statusHeader={translations["ccri's"]} statusPercent="85%"  />
                <DashboardCircleStatus statusHeader={translations["pir's"]} statusPercent="72%"  />
                <DashboardCircleStatus statusHeader={translations["eei's"]} statusPercent="68%" />
                <DashboardCircleStatus statusHeader={translations["nai's"]} statusPercent="72%" />
                <DashboardCircleStatus statusHeader={translations["pid's"]} statusPercent="43%" />
              </div>
            </div>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["live operation"]} />
          </div>
          <div className="col-md-12">
            <div className="operating-content">
              <OperationVideoBlock blockHeader={translations["blue devil"]} percent="90%" remainTime="05:21:33"/>
              <OperationVideoBlock blockHeader={translations["valient angel"]} percent="80%" remainTime="06:21:33"/>
              <OperationVideoBlock blockHeader={translations["rolling thunder"]} percent="50%" remainTime="01:25:18"/>
              <OperationVideoBlock blockHeader={translations["she devil"]} percent="50%" remainTime="02:30:03"/>
            </div>        
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["operating environment"]} />
          </div>
          <div className="col-md-12">
            <div className="operating-content">
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations["sigacts"]}
                    </div>
                    <div className="col-md-6 pull-right">
                      <Dropdown key="1" id="1" items={langs}/>
                    </div>
                  </div>
                  <img src="/images/intel_request/operating_picture/sigacts.png" className="photo" alt=""/>  
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations["current weather"]}
                    </div>
                    <div className="col-md-6 pull-right">
                      <Dropdown key="1" id="1" items={langs}/>
                    </div>
                  </div>
                  <img src="/images/intel_request/operating_picture/current_weather.png" className="photo" alt=""/>  
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations["a-isr coverage"]}
                    </div>
                    <div className="col-md-6 pull-right">
                      <Dropdown key="1" id="1" items={langs}/>
                    </div>
                  </div>
                  <img src="/images/intel_request/operating_picture/a-isr.png" className="photo" alt=""/>  
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations["force positions"]}
                    </div>
                    <div className="col-md-6 pull-right">
                      <Dropdown key="1" id="1" items={langs}/>
                    </div>
                  </div>
                  <img src="/images/intel_request/operating_picture/force_position.png" className="photo" alt=""/>  
                </div>
              </div>    
            </div>        
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12" style={{padding:0}}>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["latest intelligence"]} />
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
              <HalfHeaderLine headerText={translations["upcoming mission"]} />
              <ReactTable
                data={upcomingMission}
                columns={missionColumns}
                defaultPageSize={5}
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
            <img src="/images/admin/exclamation_mark.png" alt=""/>
            <div>flash alert: [08:12:00] vbied in massoud square: 54 civ, 3 nato casulties ... developing ... [08:01:01] vbied in massoud square: 54 civ, 3 narto casul</div>
            <img src="/images/admin/exclamation_mark.png" alt="" />
          </div>
        </div>


      </div>
    );
  }
}

DashboardComponent.propTypes = {
  children: PropTypes.element,
};

export default DashboardComponent;
