import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, NoticeType, MissionConsts, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime, showAlert, getMinRowsForTable } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import { missionATOUser } from '../../dictionary/auth';
import ReactTooltip  from 'react-tooltip';
import Dropzone from "react-dropzone";
import ContentFull from '../reusable/ContentFull';
import ContentBlock from '../reusable/ContentBlock';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class AtoWizardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.ATO,
      radioUnitId: '',
      platformInventoryID:'',
      modalOpen: false,
      row: {},
      fileName:null,
      files:[],
      cols:[],
      rows:[],
      wizard:{
        LocationCOCOM: '',
        soure:''
      },
    };
  }

  componentDidMount() {
    // this.loadData();
  }

  onDrop = acceptedFiles => {
    console.log(this.state);
    acceptedFiles.forEach(file => {
        console.log(file);
        if(file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) { 
          this.setState({
              files: [...this.state.files, file],
              fileName:file.name,
              rejected:false
          })
          ExcelRenderer(file, (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{
              this.setState({
                cols: resp.cols,
                rows: resp.rows
              });
            }
          });               
      
        }
        else {
          this.setState({
            rejected:true
          })
        }

    });
  }

  handleChange = (data) => {
    const { wizard } = this.state;
    console.log(data);
    this.setState({
      wizard: {
        ...wizard,
        LocationCOCOM: ''
      },
      fileName:null,
      files:[],
      rows:[],
      cols:[]
    });
  }

  

  render() {

    const { translations } = this.props;
    const { atoCollectionPlans } = this.props;
    const { atoGenerations } = this.props;
    // const columnsATOCollectionPlans = this.getLeftColumns();
    // const columnsATOGenerations = this.getRightColumns();

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => missionATOUser.includes(v));
    // let minRowsForTable = getMinRowsForTable(atoCollectionPlans.length,atoGenerations.length);

    const generalFields = [
      { name: 'Source', type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM', valFieldID: 'LocationCOCOM' }
    ];

    return ( access ? (
      <div>
        <div className="row mission-mgt">
           
          <div className="col-md-12">
            {/* <MissionNameModal show={this.state.modalOpen} onClose={this.missionModalNameModal} row = {this.state.row} moveLeft = {this.moveLeft} translations = {translations}  /> */}
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-4"></div>
              <div className="col-md-7 fileUploadSource">
                <ContentBlock
                fields={generalFields} data={this.handleChange} initstate ={this.state.wizard} editId = {0} /> 
              </div>  
              <div className="col-md-4">
                
                <div >
  
                </div>
              </div>

              <div className="col-md-6">
                
                <div className='fileUpload'>
                  {this.state.rejected ? <p className="error-file">Incorrect File Type. Please upload Excel or CSV.</p> : null}
                    <Dropzone className="dropzoneClass" onDrop={this.onDrop}>{this.state.fileName == null ?
                        <span>Drag &amp; Drop or click to upload <b>XLSX/CSV:</b></span> : this.state.fileName} 
                    </Dropzone>
                </div>
              </div>
           
            </div>

          </div>
       
        </div>

        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div style={{maxWidth:'1200px',overflow:'scroll',maxHeight:'200px'}}>
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
              </div>
            </div>
            <div className="col-md-1"></div>
        </div>

        <div className="row action-buttons">
            <div className="menu-button">
                <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                <button type="submit" className='highlighted-button'>
                    {translations['submit']}
                </button>
                <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
        </div>
                
    </div> ) : null
    );
  }

}

AtoWizardComponent.propTypes = {
  children: PropTypes.element,

};

export default AtoWizardComponent;
