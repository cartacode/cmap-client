import React from 'react';
import PropTypes from 'prop-types';
import ModalFormBlock from '../../reusable/ModalFormBlock';
import CustomButton from '../../reusable/CustomButton';

class CcirPirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      addClicked: false  
    }

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd () 
  { 
      console.log("Is it here?");
    /*  let divid = document.getElementById("add");
      var div = document.createElement('div');
      div.innerHTML = '<div className="col-md-12"><div className="entry-field"><div className="entry-detail"><textarea rows="3"/></div><div className="add-buttion"><button onClick={this.props.onAdd}> add </button></div></div></div>';
      divid.appendChild(div);
      this.forceUpdate(); */
      this.setState({
        addClicked: true
      });

  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    let $newdiv = '';

    if(this.state.addClicked)
      {
      $newdiv=(<div className="col-md-12"><div className="entry-field"><div className="entry-detail"><textarea rows="3" className="description"/></div><div className="add-buttion"><button> add </button></div></div></div>);
      }
      else {$newdiv = '';}

    const generalFields = [
      {name: 'Creation Date/Time', type: 'date'},
      {name: 'COCOM', type: 'dropdown', ddID: 'COCOM'},
      {name: 'Branch', type: 'dropdown', ddID: 'BranchOfService'},
      {name: 'Country', type: 'dropdown', ddID: 'Countries'},
      {name: 'Region', type: 'dropdown', ddID: 'Regions'},
      {name: 'Unit', type: 'dropdown',ddID: 'Units'},
      {name: 'Commander', type: 'dropdown', ddID: 'Commander'},
      {name: 'Operation/Mission Name', type: 'input'},
      {name: 'Effective Area KML', type: 'file'}
    ];

   

    return (
      
        <div>
          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="modal-header-text">Add New CCRI/PIRs </div>
          <div className="col-md-12">
            <ModalFormBlock fields={generalFields} />
          </div>
          <div id="add"> 
          <div className="col-md-12">
            <div className="entry-field">
              <div className="entry-detail">
                <textarea rows="3" className="description"/>
              </div>
              <div className="add-buttion">
                <button onClick={this.handleAdd}> add </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="entry-field">
              <div className="entry-detail">
                <textarea rows="3" className="description"/>
              </div>
              <div className="add-buttion">
                <button> add </button>
              </div>
            </div>
          </div>
          {$newdiv}
          </div>
          <div className="col-md-12" style={{textAlign:'center'}}>
            <CustomButton buttonName="save" />
          </div>
        </div>
      
    );
  }
}

CcirPirModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default CcirPirModal;