import React from 'react';
import PropTypes from 'prop-types';
import ModalFormBlock from '../../reusable/ModalFormBlock';
import CustomButton from '../../reusable/CustomButton';

class CcirPirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      addClicked: false  ,
      ccirpir:{
        COCOM:'',
        Branch:'',
        Country:'',
        Region:'',
        Units:'',
        Commander:'',
        TypesEnum:'',
        Opname:'',
        KML:''

      }
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

  handlePlatformGeneralData = (generalData) => {
    const { ccirpir } = this.state;
    console.log(generalData);
    this.setState({
      ccirpir: {
        ...ccirpir,
        COCOM: generalData.COCOM,
        Branch: generalData.Branch,
        Country: generalData.Country,
        Region: generalData.Region,
        Unit: generalData.Unit,
        Commander: generalData.Commander,
        TypesEnum: generalData.TypesEnum,
        Opname: generalData.Opname,
        KML: generalData.KML
       
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
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
     /*  {name: 'Creation Date/Time', type: 'date'}, */
      {name: 'COCOM', type: 'dropdown', ddID: 'COCOM' , valFieldID: 'COCOM', domID: 'COCOM', valField: ''},
      {name: 'Branch', type: 'dropdown', ddID: 'BranchOfService',  valFieldID: 'Branch', domID: 'Branch', valField: ''},
      {name: 'Country', type: 'dropdown', ddID: 'Countries',  valFieldID: 'Country', domID: 'Country', valField: ''},
      {name: 'Region', type: 'dropdown', ddID: 'Regions',  valFieldID: 'Region', domID: 'Region', valField: ''},
      {name: 'Unit', type: 'dropdown',ddID: 'Units',  valFieldID: 'Unit', domID: 'Unit', valField: ''},
      {name: 'Commander', type: 'dropdown', ddID: 'Personnel/GetCommanderList',  valFieldID: 'Commander', domID: 'Commander', valField: ''},
      {name: 'Type', type: 'dropdown', ddID: 'TypesEnum',  valFieldID: 'TypesEnum', domID: 'TypesEnum', valField: ''},
      {name: 'Operation/Mission Name', type: 'input',  valFieldID: 'Opname', domID: 'Opname'},
      {name: 'Effective Area KML', type: 'file',  valFieldID: 'KML', domID: 'KML'}
    ];

    const typesEnum =[ 
        {name : 'CCIR'},
        {name : 'PIR'}
      ];
   

    return (
      
        <div>
          <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="modal-header-text"> </div>
          <div className="col-md-4 ">

             <div className="header-line addccir">
                <img src="/assets/img/admin/upload_1.png" alt=""/>
                <div className="header-text">
                CCIR/PIRs
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
              </div>
              <div className="col-md-12 info-content">

            <ModalFormBlock data={this.handlePlatformGeneralData} fields={generalFields} typesEnum={typesEnum} initstate={this.state.ccirpir}/>
            </div>
          </div>
          <div id="add"> 
          <div className="col-md-4 ">

               <div className="header-line addccir">
                <img src="/assets/img/admin/upload_1.png" alt=""/>
                <div className="header-text">
                 CCIR
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
              </div>
              <div className="col-md-12 info-content">
            <div className="entry-field">
              <div className="entry-detail col-md-8">
                <textarea rows="3" className="description ccir"/>
              </div>
              <div className="add-buttion col-md-4">
               

                          <div className="action-buttons ccir" >
        <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
        <button className="highlighted-button" onClick={this.handleAdd}>
        add
        </button>
        <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
      </div>
              </div>
            </div>
            </div>
          </div>
          <div className="col-md-4">
             <div className="header-line addccir">
                <img src="/assets/img/admin/upload_1.png" alt=""/>
                <div className="header-text">
                PIRs
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
              </div>
              <div className="col-md-12 info-content">
            <div className="entry-field ">
              <div className="entry-detail col-md-8">
                <textarea rows="3" className="description ccir"  />
              </div>
              <div className="add-buttion col-md-4 text-center">
               
                <div className="action-buttons ccir" >
        <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
        <button className="highlighted-button">
        add
        </button>
        <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
      </div>
              </div>
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