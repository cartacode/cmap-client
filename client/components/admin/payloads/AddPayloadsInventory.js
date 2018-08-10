import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadBlock from '../../reusable/UploadBlock';
import ContentBlock from '../../reusable/ContentBlock';
import { baseUrl } from 'dictionary/network';
import axios from 'axios';

import { uploadFile } from 'actions/file';
import { addPayloadInventory, updatePayloadInventory, fetchPayloadInventoryById } from 'actions/payloadinventory';

class AddPayloadsInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      editFetched:false,
      imagePreviewUrl: '',
      locationcategory: '',
      onePayloadInventory: {},
      // payloads : {
      // metaDataID:'',
      // locationID:'',
      // owningUnit:'',
      // serialNumber:''
      // },
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const { editId } = this.props;
    console.log('edit id'+editId);
    if(editId !== '0') {
      this.props.fetchPayloadInventoryById(editId);
    }else {
      // this.setState({ onePayloadInventory: {} });
    }
  }

  componentDidUpdate = () => {
    
    let {editForm} = this.props;
    let { editId } = this.props;
    
    if(editForm) {
        
        this.props.stopupdate();
        this.props.fetchPayloadInventoryById(editId).then(() => {this.setState({editFetched:true}); this.state.payloads = this.props.onePayloadInventory;});
        
    }
  }

  stopupd = () => {
    this.setState({editFetched:false});
  }


  handlePayloadGeneralData = (generalData) => {
    const { payloads } = this.state;
    this.setState({ locationcategory: generalData.locationcategory });
    this.setState({
      payloads: {
        ...payloads,
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        serialNumber: generalData.serialNumber,
        id: this.props.editId,
      },
    }, () => {
      console.log('New state in ASYNC callback:22222', this.state.payloads);
    });

    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) 
    {
      
      console.log("Category Selected");
      this.updatelocationid(generalData);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { payloads } = this.state;
    if (editId !== undefined && editId !== '0') {
      payloads.id = editId;
      this.props.updatePayloadInventory(editId, payloads).then( () => {this.props.onClose('UPDATE');});
    } else {
      this.props.addPayloadInventory(this.state.payloads).then( () => {this.props.onClose('ADD');});
    }
    
  }

  updatelocationid (generalData) 
  {
     let locationselect = document.getElementsByName('locationID')[0];
     let items = [{'label': '--Select Item--', 'value': 0}];
     const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=`+generalData.locationcategory;
        axios.get(apiUrl)
          .then(response => {
            console.log(response.data);
            if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
            response.data.map(item => {
              items.push({ 'label': item['description'], 'value': item['id'].trim() });
            });
            if (locationselect.length > 0) {locationselect.length = 0;}
            for(let i in items) {
              locationselect.add(new Option(items[i].label, items[i].value));
            }
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });   
  }

  stopset () {
    this.setState({clear:false});
  }

  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
       this.setState({clear:true});
     }
     else {
 
     }
  }

  render() {
    // Render nothing if the "show" prop is false
    // if(!this.props.show) {
    //   return null;
    // }

    const { translations } = this.props;
    // let { onePayloadInventory } = this.props;
    // if (onePayloadInventory === undefined) {
    //   onePayloadInventory = {};
    // }

    const generalFields = [
      { name: 'Payload Specifications', type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: translations['Serial#'], type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber', required: true },
      // { name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM', valFieldID: 'LocationCOCOM', required:true},
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit' },
      { name: 'Location Category', type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' },
      { name: 'Location ID', type: 'dropdown', domID: 'locationID', ddID: '', valFieldID: 'locationID' },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >

       {/*  <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> */}
        <div className="payload-content">
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                  Add Payloads Inventory
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
            </div>
          </div>

          <div className="row personnel" >

            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handlePayloadGeneralData} initstate ={this.props.onePayloadInventory} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button">
              {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>

      </form>

    );
  }
}

AddPayloadsInventory.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayloadInventory: state.payloadinventory.onePayloadInventory,
  };
};

const mapDispatchToProps = {
  uploadFile,
  addPayloadInventory,
  updatePayloadInventory,
  fetchPayloadInventoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPayloadsInventory);
