import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusTable from '../reusable/StatusTable';
import FullHeaderLine from '../reusable/FullHeaderLine';
import HalfHeaderLine from '../reusable/HalfHeaderLine';
import CircleStatus from '../reusable/CircleStatus';
import ButtonsList from '../reusable/ButtonsList';
import Modal  from '../reusable/Modal';
import Dropdown from "../reusable/Dropdown";
import FilterDropdown from '../reusable/FilterDropdown';
import CustomButton from '../reusable/CustomButton';

import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';


import "react-table/react-table.css";
import ReactTable from 'react-table';
import PlatformStatus from './status/PlatformStatus';
import PayloadStatus from './status/PayloadStatus';
import PersonnelStatus from './status/PersonnelStatus';
import MunitionsStatus from './status/MunitionsStatus';
import { defaultFilter, formatDateTime } from '../../util/helpers';

let rn = 0;
class AdminStatusComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClear();
    this.onSubmit();
    this.state={
      statusModalOpen:false,
      whichModal:'Platform',
      update: false,
      status:'',
      etic:'',
      remark:'',
      rowno: 0,
      platformEditId:0,
      payloadEditId:0,
      personnelEditId:0,
      munitionEditId:0,
      platformStatusOpen:false,
      payloadStatusOpen:false,
      personnelStatusOpen:false,
      munitionStatusOpen:false
    }
  }

  componentDidMount() {
    this.props.fetchPlatformsStatus();
    this.props.fetchPayloadsStatus();
    this.props.fetchMunitionsStatus();
    this.props.fetchPersonnelsStatus();
  }

  openPlatformForm = (row) => {
    this.setState({
      platformEditId: row,
      platformStatusOpen: true
    });
  }

  openPayloadForm = (row) => {
    this.setState({
      payloadEditId: row,
      payloadStatusOpen: true
    });
    console.log(this.state.payloadEditId);
  }

  openPersonnelForm = (row) => {
    this.setState({
      personnelEditId: row,
      personnelStatusOpen: true
    });
  }

  openMunitionForm = (row) => {
    this.setState({
      munitionEditId: row,
      munitionStatusOpen: true
    });
  }

  closePlatformForm = () => {
    this.props.fetchPlatformsStatus();
    this.setState({
      platformEditId: 0,
      platformStatusOpen: false,
    });
  }

  closePayloadForm = () => {
    this.props.fetchPayloadsStatus();
    this.setState({
      payloadEditId: 0,
      payloadStatusOpen: false,
    });
  }

  closePersonnelForm = () => {
    this.props.fetchPersonnelsStatus();
    this.setState({
      personnelEditId: 0,
      personnelStatusOpen: false,
    });
  }

  closeMunitionForm = () => {
    this.props.fetchMunitionsStatus();
    this.setState({
      munitionEditId: 0,
      munitionStatusOpen: false,
    });
  }

  onFind(){   
    console.log("find");
  }

  statusModal(event) {
    let test = event.target.id;
    console.log(event);
    this.setState({
      statusModalOpen: !this.state.statusModalOpen,
      whichModal: test
    });
  }

  reset() {
    update: false;
    console.log("Resetting");
  }

  

  onClear(){
    console.log("clear");
  }

  onSubmit(){
    console.log("submit");
  }

  updateRows() {

      let stat = document.getElementById("status_id");
      let statopt = stat.options[stat.selectedIndex].text;

      console.log(statopt);

      let et = document.getElementById("etic_id");
      let etopt = et.options[et.selectedIndex].text;

      let remarks = document.getElementById("remark_id").value;
      console.log(remarks);
      

      this.setState({
        update:true,
        status: statopt,
        etic: etopt,
        remark:remarks
      });
      rn = this.state.rowno;

  }

  render() {

    const { statusplatform } = this.props;
    const { statuspayload } = this.props;
    const { statuspersonnel } = this.props;
    const { statusmunition } = this.props;

    let langs = ['val 1', 'val 2'];

    let {whichModal} = this.state;
    let $what=''; 
    switch (whichModal) {
      case 'Platform':
              $what = (<select className="form-control" name="status_id" id="status_id"><option value="In-Flight">In-Flight</option>
              <option value="Flight-Ready">Flight-Ready</option>
              <option value="In Transit">In Transit</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Training">Training</option>
              <option value="Lost">Lost</option>
              <option value="Decommissioned">Decommissioned</option></select>);
          
        break;

        case 'Payload':
              $what = (<select className="form-control" name="status_id" id="status_id"><option value="In-Flight">In-Flight</option>
              <option value="Flight-Ready">Flight-Ready</option>
              <option value="In Transit">In Transit</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Training">Training</option>
              <option value="Lost">Lost</option>
              <option value="Decommissioned">Decommissioned</option></select>);
          
        break;

        case 'Equipment':
              $what = (<select className="form-control" name="status_id" id="status_id"><option value="In Stock">In Stock</option>
              <option value="Critical Low">Critical Low</option>
              <option value="Low Stock">Low Stock</option>
              <option value="On Order">On Order</option>
              <option value="In Transit">In Transit</option>
              <option value="Training">Training</option>
              <option value="Lost">Lost</option>
              <option value="Decommissioned">Decommissioned</option></select>);

        break;

        case 'PED':
              $what = (<select className="form-control" name="status_id" id="status_id"><option value="On Mission">On Mission</option>
              <option value="Mission Ready">Mission Ready</option>
              <option value="PTO">PTO</option>
              <option value="TDY">TDY</option>
              <option value="Training">Training</option>
              <option value="In-Transit">In-Transit</option></select>);

        break;

        case 'Personnel':
              $what = (<select className="form-control" name="status_id" id="status_id">
              <option value="On Mission">On Mission</option>
              <option value="Mission Ready">Mission Ready</option>
              <option value="PTO">PTO</option>
              <option value="TDY">TDY</option>
              <option value="Training">Training</option>
              <option value="In-Transit">In-Transit</option>
              <option value="Medical">Medical</option>
              </select>);

        break;

    
      default:
        break;
    } 
    let numbers = new Array(); 
    for (let i=0; i<=180; i++)
    {
        numbers[i] = i;
    }

    

    let $etic = (<select className="form-control" id="etic_id">{numbers.map(function(data, key){  return (
      <option key={key} value={data[key]}>{key}</option> )
  })}</select>);
  
    const {translations} = this.props;

    let {update} = this.state;

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
      },
      {
        Header: translations['update'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png"  id="Platform" onClick={() => this.openPlatformForm(row.value)}/></span>// Custom cell components!
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
      },
      {
        Header: translations['update'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png"  id="Payload" onClick={() => this.openPayloadForm(row.value)}/></span>// Custom cell components!
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
      }, 
      {
        Header: translations['update'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png"  id="Munition" onClick={() => this.openMunitionForm(row.value)}/></span>// Custom cell components!
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
      }, 
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/pen_icon.png"  id="PED"/></span>// Custom cell components!
      }
    ];

    const personnelHead = [ translations['Name'], translations['Rank'], translations['mos'], translations['duty pos.'], translations['arrive'], translations['depart'], translations['update'], ];
    const personnel = [
      { name:'Jones, rodney', rank:'a1c', status:'flight ready', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
      { name:'kennedy, tate', rank:'a1c', status:'flight ready', duty:'airops spec.', arrive:'03-mar-17', depart:'10-jan-18', update:'update' },
      { name:'Nelson, max', rank:'sra', status:'flight ready', duty:'aviator off.', arrive:'05-june-17', depart:'22-jan-18', update:'update' },
      { name:'hampton, kyle', rank:'sra', status:'flight ready', duty:'aviator off.', arrive:'23-jan-17', depart:'12-oct-18', update:'update' },
      { name:'springer, dan', rank:'ssgt', status:'off-line', duty:'air repair sup.', arrive:'17-july-17', depart:'12-apr-18', update:'update' },
      { name:'marlow, barry', rank:'tsgt', status:'flight ready', duty:'avionic mech.', arrive:'01-oct-17', depart:'02-oct-18', update:'update' },
      { name:'Jones, rodney', rank:'a1c', status:'off-line', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
    ];

    if(update) {

      if (whichModal == 'Platform')
     { 

      console.log(rownumber);

      platform[rn]['status'] = this.state.status;
      platform[rn]['etic'] = this.state.etic;
      platform[rn]['remark'] = this.state.remark;
      

      this.reset();
     }

      else if (whichModal == 'Payload') 
        {

          payload[rn]['status'] = this.state.status;
          payload[rn]['etic'] = this.state.etic;
          payload[rn]['remark'] = this.state.remark;
          

        }

        else if (whichModal == 'Equipment') 
        {

          equipment[rn]['status'] = this.state.status;
          equipment[rn]['etic'] = this.state.etic;
          equipment[rn]['remark'] = this.state.remark;
          
          
        }

        else if (whichModal == 'PED') 
        {

          petTeam[rn]['status'] = this.state.status;
          petTeam[rn]['etic'] = this.state.etic;
          petTeam[rn]['remark'] = this.state.remark;
          
          
        }
        else 
        {

          personnel[rn]['status'] = this.state.status;
          personnel[rn]['etic'] = this.state.etic;
          personnel[rn]['remark'] = this.state.remark;
          
          
        }
    }


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
      },
      {
        Header: translations['update'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png" id="Personnel" onClick={() => this.openPersonnelForm(row.value)}/></span>// Custom cell components!
      }
    ];

    const commentHead = ['commanders remarks'];
    const comment = [
      'Currently coordinating with U.S. units and anto patners on joint mission training to begin on 05 januar...'
    ];

    return (
      <div>
        <div className="row orders-assets" style={{marginBottom:0}}>
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["status entry"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
        </div>

        <div className="row status">
        {this.state.platformStatusOpen ?
        <PlatformStatus editId = {this.state.platformEditId} onClose={this.closePlatformForm} translations={translations} />
        : null }
        </div>

        <div className="row status">
        {this.state.payloadStatusOpen ?
        <PayloadStatus editId = {this.state.payloadEditId} onClose={this.closePayloadForm} translations={translations} />
        : null }
        </div>

        <div className="row status">
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["platform"]} />
              <ReactTable data={statusplatform} columns={platformColumns} defaultPageSize={5} className="-striped -highlight" filterable
               defaultFilterMethod={defaultFilter}

                  // getTdProps={(state, rowInfo, column, instance) => {
                  //   return {
                  //     onClick: e =>{
  
                  //       console.log(rowInfo);
                  //       console.log(column);

                  //       console.log(rowInfo.index);
  
                  //        if (column.Header == 'update')
                  //       {
                  //         this.setState({
                  //           statusModalOpen: !this.state.statusModalOpen,
                  //           whichModal: 'Platform',
                  //           rowno: rowInfo.index
                  //         });
                  //       }
  
                  //     }
  
  
                  //   };
                  // }}
              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["payload"]} />
              <ReactTable data={statuspayload} columns={payloadColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter}
              />
            </div>
          </div>

        <div className="row status">
        {this.state.munitionStatusOpen ?
        <MunitionsStatus editId = {this.state.munitionEditId} onClose={this.closeMunitionForm} translations={translations} />
        : null }
        </div>

          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText="Munition" />
              <ReactTable data={statusmunition} columns={equipmentColumns} defaultPageSize={5} className="-striped -highlight" filterable={true}
               defaultFilterMethod={defaultFilter}
              />     
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["ped teams"]} />
              <ReactTable data={petTeam} columns={petTeamColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter}

                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: e =>{
  
                        console.log(rowInfo);
                        console.log(column);
  
                         if (column.Header == 'update')
                        {
                          this.setState({
                            statusModalOpen: !this.state.statusModalOpen,
                            whichModal: 'PED',
                            rowno: rowInfo.index
                          });
                        }
  
                      }
  
  
                    };
                  }}
              />
            </div>
          </div>

        <div className="row status">
        {this.state.personnelStatusOpen ?
        <PersonnelStatus editId = {this.state.personnelEditId} onClose={this.closePersonnelForm} translations={translations} />
        : null }
        </div>

          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["personnel"]} />
              <ReactTable data={statuspersonnel} columns={personnelColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={defaultFilter}
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
                    <textarea className="comment-body" width="100%">
                      {comment}
                    </textarea>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row action-buttons" >
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onClear.bind(this)}>
              {translations["clear"]}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onSubmit.bind(this)}>
              {translations["submit"]}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>
        <Modal show={this.state.statusModalOpen}
          onClose={this.statusModal.bind(this)}>
          
            <div className="modal-header-text">STATUS ENTRY/UPDATE</div>
            <div className="col-md-12">
              <div className="col-md-6 ">
                <div className="status-change">
                  <div className="status-label">
                    Status:
                  </div>
                  <div className="status-select pull-right">
                  {$what}
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="status-change">
                  <div className="status-label">
                    ETIC:
                  </div>
                  <div className="status-select pull-right">
                    {$etic}                 
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="status-remarks">
                <div className="remarks-label">
                  Remark:
                </div>
                <div className="remarks-detail">
                  <textarea rows="5" id="remark_id"/>
                </div>
              </div>
            </div>
            <div className="col-md-12" style={{textAlign:'center'}}>
              <div className="action-buttons" >
                <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                <button className="highlighted-button" onClick={this.updateRows.bind(this)}>
                  Save
                </button>
                <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
              </div>
            </div>            
        </Modal>
      </div>
    );
  }
}

AdminStatusComponent.propTypes = {
  children: PropTypes.element,

};

export default AdminStatusComponent;
