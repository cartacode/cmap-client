import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import CcirPirModal from './ccir-pirs/CcirPirModal';
import { defaultFilter } from '../../util/helpers';
import { TableDefaults } from '../../dictionary/constants';

class CcirPirComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      ccirModalOpen:false,
      tableRowDetailModalOpen: false     ,
      addCcirPirModalOpen: false,
      editId: '0', 
    }
  }

  // ccirModal = () => {
  //   this.setState({
  //     ccirModalOpen: !this.state.ccirModalOpen
  //   })
  // }

  componentDidMount() {
    // Fetch List of Records 
    this.props.fetchCcirPirs();
  }



// Open form Add/Edit Rerocd
  openCcirPirForm = (row) => {
    this.setState({
      editId: row,
      addCcirPirModalOpen: true,
    });
  }

  // Close Add/Edit Form
closeCcirPirForm = (messageType) => {
  //show Success Message
  this.loadData(messageType);
  this.props.fetchCcirPirs();
  this.setState({
    editId: '0',
    addCcirPirModalOpen: false,
  });
}


loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchCcirPirs();
}

// will call from onClose in CcirPirModal
callCloseCcirPirForm = () =>{
  this.closeCcirPirForm('');
}

// Delete Record
deleteCcirPirRecord(row){
  this.props.deleteCcirPirById(row).then(() => {
    //Refresh List
    this.closeCcirPirForm('DELETE');
  });
}

// function to Display Success Messages
notify =(type)=>{
  const { translations } = this.props;
  if(type === 'DELETE'){
    NotificationManager.success(translations['Delete CCIRPIR Message'], translations['CCIRPIR Title'], 5000);

  }
  else if(type === 'ADD'){
    //NotificationManager.success(translations['Delete CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
    NotificationManager.success(translations['Add CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
  }
  else if(type === 'UPDATE'){
    NotificationManager.success(translations['Update CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
  }
  else{

  }
}


  // tableRowDetailModal = () => {
  //   this.setState({
  //     tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
  //   })
  // }

  // onFind(){
  //   console.log("find");
  // }


  render() {

    
    const {translations} = this.props;
    const {allCcirPirs} = this.props;

    const ccirPirs = [translations['missile'], translations['rocket'], translations['gun'],];

    // const data = [    
    //   {cocom: 'a-cocom', country:'j-country', region:'a-region', unit:'unit', commander:'c-commander', recorddate:'3/15/2018', view:'view'},
      
    // ];

    // Set Columns and Data to display in the Table List
    const columns = [
      {
        Header: translations['Mission Name'],
        accessor: 'MissionName',
      },
      {
        Header: translations['COCOM'],
        accessor: 'COCOM',
      },
      {
        Header: translations['Region'],
        accessor: 'RegionName',
      }, 
      {
        Header: translations['Country'],
        accessor: 'CountryName',
      },
     
      {
        Header: translations['Unit'],
        accessor: 'UnitName',
       
      },
      {
        Header: translations['Commander'],
        accessor: 'CommanderName',
      },  
      {
        Header: translations['Type'],
        accessor: 'Type',
       
      },
      {
        Header: translations['view'],
        accessor: 'CCIRPIRId',
        filterable: false,
        //Cell: row => <div><span className='number change-cursor-to-pointer'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openCcirPirForm(row.value)} /></span> <span className='number change-cursor-to-pointer'><img src="/assets/img/general/trash_icon.png"  onClick={() => this.deleteCcirPirRecord(row.value)} /></span></div>
        Cell: row => <div><a href="#" className="btn btn-primary" onClick={() => this.openCcirPirForm(row.value)} ><span className="glyphicon glyphicon-edit"/></a>&nbsp; <a href="#" onClick={() => this.deleteCcirPirRecord(row.value)} className="btn btn-danger" > <span className="glyphicon glyphicon-trash"/></a></div>,

      } 
    ];

  return (
    <div>
      
      <div className="row orders-assets">
        <div className="header-line">
          <img src="/assets/img/admin/personnel_1.png" alt=""/>
          <div className="header-text">
            {translations["Ccir/Pir"]}
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
        </div>
        <div className="col-md-12 filter-line">
          <div className="add-button">
            <button className="ccir-button" onClick={() => this.openCcirPirForm('0')} >{translations["Add Ccir/Pirs"]}</button>
          </div>
        </div>
        {this.state.addCcirPirModalOpen ?
          <CcirPirModal  editId = {this.state.editId} onClose={this.closeCcirPirForm} translations = {translations} />
          : null
        }
        
          <div className="col-md-12">
            <ReactTable
              data={allCcirPirs}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.PAGE_SIZE}
              className="-striped -highlight"
              filterable={true}
						  defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
      </div>
  );
}
}

CcirPirComponent.propTypes = {
  children: PropTypes.element,

};

export default CcirPirComponent;
