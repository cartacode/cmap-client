import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadBlock from '../../reusable/UploadBlock';
import ContentBlock from '../../reusable/ContentBlock';

import { uploadFile } from 'actions/file';
import { addPayloadInventory, updatePayloadInventory, fetchPayloadInventoryById } from 'actions/payloadinventory';

class AddPayloadsInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
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

  componentWillMount() {
    const { editId } = this.props;
    console.log('edit id'+editId);
    if(editId !== '0') {
      this.props.fetchPayloadInventoryById(editId);
    }else {
      // this.setState({ onePayloadInventory: {} });
    }
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
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { payloads } = this.state;
    if (editId !== undefined && editId !== '0') {
      // const data = {
      //   id: editId,
      //   payloadInventory: payloads,
      // };
      payloads.id = editId;
      this.props.updatePayloadInventory(editId, payloads);
    } else {
      this.props.addPayloadInventory(this.state.payloads);
    }
    
    
    this.props.onClose('0');
  }

  resetForm() {
    this.setState(this.baseState);
    console.log('FORM RESET DONE');
    if (confirm('Do you want to clear all data from this form?')) {
      const inputs = document.body.getElementsByTagName('input');
      const drops = document.body.getElementsByTagName('select');
      for (const item of inputs) {
        item.value = '';
      }
      for (const item of drops) {
        item.value = 0;
      }
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
      { name: 'Location Category', type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' },
      { name: 'Location ID', type: 'dropdown', domID: 'locationID', ddID: 'Locations/GetLocationsByCategory?Category=2', valFieldID: 'locationID' },
      { name: 'Owning Unit', type: 'dropdown', domID: 'owningUnit', ddID: 'Units', valFieldID: 'owningUnit' },
      { name: 'Serial Number', type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber', required: true },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >

        <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div>
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
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handlePayloadGeneralData} initstate ={this.props.onePayloadInventory}/>
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button">
              {translations.Delete}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button">
              {translations.save}
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
