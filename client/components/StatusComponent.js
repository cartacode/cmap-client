import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusTable from './reusable/StatusTable';
import FullHeaderLine from './reusable/FullHeaderLine';
import HalfHeaderLine from './reusable/HalfHeaderLine';
import CircleStatus from './reusable/CircleStatus';
import ButtonsList from './reusable/ButtonsList';
import Modal  from './reusable/Modal';
import Dropdown from "./reusable/Dropdown";
import FilterDropdown from './reusable/FilterDropdown';
import CustomButton from './reusable/CustomButton';

import CustomDatePicker from './reusable/CustomDatePicker';
import DropDownButton from './reusable/DropDownButton';
import axios from 'axios';
import { baseUrl } from 'dictionary/network';

import "react-table/react-table.css";
import ReactTable from 'react-table';

import { defaultFilter, formatDateTime } from '../util/helpers';
import { TableDefaults } from 'dictionary/constants';

class StatusComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClear();
    this.onSubmit();
    this.state={
      statusModalOpen:false,
      payloadpct:'',
      platformpct:'',
      payloadnum:'',
      payloaddenom:'',
      platformnum:'',
      platformdenom:''
    }
  }

  componentDidMount() {
    this.stats();
    this.props.fetchPlatformsStatus();
    this.props.fetchPayloadsStatus();
    this.props.fetchMunitionsStatus();
    this.props.fetchPersonnelsStatus();
  }

  statusModal = () => {
    this.setState({
      statusModalOpen: !this.state.statusModalOpen
    });
  }

  onClear(){
    console.log("clear");
  }

  onSubmit(){
    console.log("submit");
  }

  stats = () => {
    const apiUrl = `${baseUrl}/StatusStats/GetStatusStats`;
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        this.setState({
          platformpct:response.data.PlatformReadyPct+"%",
          payloadpct:response.data.PayloadReadyPct+"%",
          platformnum:response.data.PlatformReadyCount,
          payloadnum:response.data.PayloadReadyCount,
          platformdenom:response.data.PlatformCount,
          payloaddenom:response.data.PayloadCount,
        });
      })
      .catch((error) => {
        console.log('Exception comes:' + error);
      });
  }

  render() {

    let langs = ['val 1', 'val 2'];

    const {translations} = this.props;
    const { statusplatform } = this.props;
    const { statuspayload } = this.props;
    const { statuspersonnel } = this.props;
    const { statusmunition } = this.props;

    const platform = [
      { platform:'grey eagle', tail:'fg2592', status:'flight ready', remark:'none', etic:'90 days', update:'update' },
      { platform:'grey eagle', tail:'an9444', status:'flight ready', remark:'none', etic:'90 days', update:'update'},
      { platform:'grey eagle', tail:'tf59393', status:'off-line', remark:'ppm', etic:'60 days', update:'update'},
      { platform:'predator', tail:'ks69223', status:'off-line', remark:'fuel leak', etic:'30 days', update:'update'},
      { platform:'mc-12w', tail:'df23992', status:'flight ready', remark:'none', etic:'90 days', update:'update'},
      { platform:'global hawk', tail:'ji239223', status:'off-line', remark:'landing gear', etic:'10 days', update:'update'},
      { platform:'global hawk', tail:'ji239223', status:'off-line', remark:'landing gear', etic:'10 days', update:'update'}

    ];
    const platformColumns = [
      {
        Header: translations['platform'],
        accessor: 'name',
      },
      {
        Header: translations['Tail#'],
        accessor: 'tailNbr',
      },
      {
        Header: translations['status'],
        accessor: 'status',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',
      }, 
      {
        Header: translations['etic'],
        accessor: 'ETIC',
      }
    ];


    
    const payload = [
      { payload:'acs-9', serial:'434343224', status:'flight ready', remark:'none', etic:'20 days', update:'update' },
      { payload:'acs-2', serial:'282932992', status:'flight ready', remark:'none', etic:'20 days', update:'update' },
      { payload:'vader', serial:'098392990', status:'off-line', remark:'none', etic:'ppm', update:'update' },
      { payload:'tsp-3', serial:'430480203', status:'off-line', remark:'serial cable', etic:'20 days', update:'update' },
      { payload:'mx-20', serial:'220239922', status:'flight ready', remark:'none', etic:'90 days', update:'update' },
      { payload:'acs-3', serial:'092928822', status:'off-line', remark:'imu calib', etic:'10 days', update:'update' },
      { payload:'acs-9', serial:'434343224', status:'flight ready', remark:'none', etic:'20 days', update:'update' }
    ];

    const payloadColumns = [
      {
        Header: translations['payload'],
        accessor: 'name', 
      },
      {
        Header: translations['serial#'],
        accessor: 'serialNbr',
      },
      {
        Header: translations['status'],
        accessor: 'status',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',
      }, 
      {
        Header: translations['etic'],
        accessor: 'ETIC',
      }
    ];

    const equipment = [
      { equipment:'strut align', serial:'2932sx21', status:'ready', inventory:'12', remark:'none', update:'update' },
      { equipment:'hydraulic jack', serial:'303-4332', status:'ready', inventory:'8', remark:'none', update:'update' },
      { equipment:'mq river set', serial:'oo-23212', status:'ready', inventory:'23', remark:'none', update:'update' },
      { equipment:'mc deicing kit', serial:'8202334d', status:'low', inventory:'2', remark:'req', update:'update' },
      { equipment:'gh-9 turbine', serial:'pdm2321', status:'ready', inventory:'3', remark:'none', update:'update' },
      { equipment:'satcom kit', serial:'239230x2', status:'ready', inventory:'6', remark:'none', update:'update' },
      { equipment:'strut align', serial:'2932sx21', status:'ready', inventory:'12', remark:'none', update:'update' }
    ];

    const equipmentColumns = [
      {
        Header: "Munition",
        accessor: 'name', 
      },
      {
        Header: translations['serial#'],
        accessor: 'serialNbr',
      },
      {
        Header: translations['status'],
        accessor: 'status',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',
      }
    ];
    
    const petTeam = [
      { team:'blue', type:'fmv', status:'ready', day:'11-nov-17', time:'08:00', remark:'none', update:'update' },
      { team:'yellow', type:'fmv', status:'ready', day:'12-nov-17', time:'09:00', remark:'none', update:'update' },
      { team:'green', type:'fmv', status:'ready', day:'11-nov-17', time:'16:00', remark:'none', update:'update' },
      { team:'black', type:'sigint', status:'off-line', day:'14-nov-17', time:'09:30', remark:'training', update:'update' },
      { team:'red', type:'sigint', status:'off-line', day:'10-nov-17', time:'21:00', remark:'transfer', update:'update' },
      { team:'pink', type:'imint', status:'off-line', day:'12-nov-17', time:'19:30', remark:'training', update:'update' },
      { team:'gray', type:'fmv', status:'ready', day:'11-nov-17', time:'08:00', remark:'none', update:'update' }
    ];

    const petTeamColumns = [
      {
        Header: translations['team'],
        accessor: 'team', 
      },
      {
        Header: translations['type'],
        accessor: 'type',
      },
      {
        Header: translations['status'],
        accessor: 'status',

      },
      {
        Header: translations['day'],
        accessor: 'day',
      },
      {
        Header: translations['Time'],
        accessor: 'time',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',

      }
    ];

    const personnelHead = [ translations['Name'], translations['Rank'], translations['mos'], translations['duty pos.'], translations['arrive'], translations['depart'], translations['update'], ];
    const personnel = [
      { name:'Jones, rodney', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
      { name:'kennedy, tate', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'03-mar-17', depart:'10-jan-18', update:'update' },
      { name:'Nelson, max', rank:'sra', mos:'15o', duty:'aviator off.', arrive:'05-june-17', depart:'22-jan-18', update:'update' },
      { name:'hampton, kyle', rank:'sra', mos:'15o', duty:'aviator off.', arrive:'23-jan-17', depart:'12-oct-18', update:'update' },
      { name:'springer, dan', rank:'ssgt', mos:'15k', duty:'air repair sup.', arrive:'17-july-17', depart:'12-apr-18', update:'update' },
      { name:'marlow, barry', rank:'tsgt', mos:'15n', duty:'avionic mech.', arrive:'01-oct-17', depart:'02-oct-18', update:'update' },
      { name:'Jones, rodney', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
    ];

    const personnelColumns = [
      {
        Header: translations['Name'],
        accessor: 'fullName',
      },
      {
        Header: translations['Rank'],
        accessor: 'rank',
      },
      {
        Header: translations['duty pos.'],
        accessor: 'dutyPos',
      },
      {
        Header: translations['status'],
        accessor: 'status',
      },
      {
        Header: translations['arrive'],
        accessor: 'arrive',
      },
      {
        Header: translations['depart'],
        accessor: 'depart',
      }
    ];

    const commentHead = ['commanders remarks'];
    const comment = [
      'Currently coordinating with U.S. units and anto patners on joint mission training to begin on 05 januar...'
    ];

    return (
      <div>
          <div className="row status" >
            <FullHeaderLine headerText={translations["unit status report"]} />
            <div className="status-content">
              <div className="col-md-4 image-block">
                <img src="/assets/img/status/status_logo.png" className="photo" alt="" />
              </div>
              <div className="col-md-8 status-block">
                <CircleStatus statusHeader={translations["platform"]} statusPercent={this.state.platformpct} statusNumber={this.state.platformnum + "/" + this.state.platformdenom} />
                <CircleStatus statusHeader={translations["payload"]} statusPercent={this.state.payloadpct} statusNumber={this.state.payloadnum + "/" + this.state.payloaddenom} />
                <CircleStatus statusHeader={translations["flight crew"]} statusPercent="89%" statusNumber="239/270" />
                <CircleStatus statusHeader={translations["line crew"]} statusPercent="80%" statusNumber="12/15" />
                <CircleStatus statusHeader={translations["ped crew"]} statusPercent="78%" statusNumber="492/550" />
              </div>
            </div>
          </div>
          <div className="row status">
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["platform"]} />
              <ReactTable data={statusplatform} columns={platformColumns} defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter} showPageSizeOptions={false}
              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["payload"]} />
              <ReactTable data={statuspayload} columns={payloadColumns} defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter} showPageSizeOptions={false}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText="Munition" />
              <ReactTable data={statusmunition} columns={equipmentColumns} defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter} showPageSizeOptions={false}
              />     
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["ped teams"]} />
              <ReactTable data={petTeam} columns={petTeamColumns} defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter} showPageSizeOptions={false}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["personnel"]} />
              <ReactTable data={statuspersonnel} columns={personnelColumns} defaultPageSize={TableDefaults.PAGE_SIZE}
              minRows={TableDefaults.PAGE_SIZE} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter} showPageSizeOptions={false}
              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["comment"]} />
              <table className="table">
                <thead className="thead">
                <tr className="tr">
                  <td>
                    <div className="comment-image">
                      {translations["comment"]} 
                    </div>
                  </td>
                </tr>
                </thead>
                <tbody className="tbody">
                  <tr >
                    <div className="comment-body">
                      {comment}
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="row action-buttons" >

          </div>
          <Modal show={this.state.statusModalOpen}
            onClose={this.statusModal}>
              <div className="modal-header-text">STATUS ENTRY/UPDATE</div>
              <div className="col-md-12">
                <div className="col-md-6 ">
                  <div className="status-change">
                    <div className="status-label">
                      Status:
                    </div>
                    <div className="status-select pull-right">
                      <Dropdown key="status_key" id="status_id" items={langs}/>                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="status-change">
                    <div className="status-label">
                      ETIC:
                    </div>
                    <div className="status-select pull-right">
                      <Dropdown key="etic_key" id="etic_id" items={langs}/>                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="status-remarks">
                  <div className="remarks-label">
                    Description:
                  </div>
                  <div className="remarks-detail">
                    <textarea rows="5"/>
                  </div>
                </div>
              </div>
              <div className="col-md-12" style={{textAlign:'center'}}>
                <CustomButton buttonName="save" />
              </div>            
          </Modal>
      </div>
    );
  }
}

StatusComponent.propTypes = {
  children: PropTypes.element,

};

export default StatusComponent;
