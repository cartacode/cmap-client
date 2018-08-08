import React from 'react';
import PropTypes from 'prop-types';
import ModalFormBlock from '../../reusable/ModalFormBlock';
import CustomButton from '../../reusable/CustomButton';
import { connect } from 'react-redux';
import { addCcirPir,  updateCcirPir,  fetchCcirPirById } from 'actions/ccirpir';

class CcirPirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      addClicked: false  ,
      //  ccirpir:{
      //   COCOMId:'',
      //   BranchId:'',
      //   CountryId:'',
      //   RegionId:'',
      //   UnitId:'',
      //   CommanderId:'',
      //   Type:'',
      //   MissionName:'',
      //   EffectiveAreaKML:''

      //  },
     // ccirpir:{},
      oneCcirPir: {}
    }

    // this.handleAdd = this.handleAdd.bind(this);

    this.handleChange = this.handleChange.bind(this);

    // preserve the initial state in a new object
    this.baseState = this.state;

  }


  componentDidMount() {
    const { editId } = this.props;
    if(editId !== '0') {
      this.props.fetchCcirPirById(editId);
    }else {
      // this.setState({ onePayloadInventory: {} });
    }
  }


  // handleAdd () 
  // { 
  //     console.log("Is it here?");
  //   /*  let divid = document.getElementById("add");
  //     var div = document.createElement('div');
  //     div.innerHTML = '<div className="col-md-12"><div className="entry-field"><div className="entry-detail"><textarea rows="3"/></div><div className="add-buttion"><button onClick={this.props.onAdd}> add </button></div></div></div>';
  //     divid.appendChild(div);
  //     this.forceUpdate(); */
  //     this.setState({
  //       addClicked: true
  //     });

  // }

  handleCcirPirGeneralData = (generalData) => {
    let { ccirpir } = this.state;
    this.setState({
      ccirpir: {
        ...ccirpir,
        COCOMId: generalData.COCOMId,
        BranchId: generalData.BranchId,
        CountryId: generalData.CountryId,
        RegionId: generalData.RegionId,
        UnitId: generalData.UnitId,
        CommanderId: generalData.CommanderId,
        Type: generalData.Type,
        MissionName: generalData.MissionName,
        EffectiveAreaKML: generalData.EffectiveAreaKML,
        CCIRPIRId: this.props.editId,

      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.ccirpir);
    });
  }


  handleSubmit = event => {
    debugger;
    event.preventDefault();
    const { editId } = this.props;
    let { ccirpir } = this.state;
    if (editId !== undefined && editId !== '0') {
      ccirpir.CCIRPIRId = editId;
      ccirpir.LastUpdateUserId =  null;
      //ccirpir.Description =  "string";
      //ccirpir.Description2 =  "Description 2";
      //ccirpir.Description3 =  "Description 3";
      //ccirpir.Description4 =  "Description 4";
      console.log(ccirpir);
      console.log(JSON.stringify(ccirpir));
      this.props.updateCcirPir(editId, ccirpir).then( () => {this.props.onClose();});
    } else {
      ccirpir.LastUpdateUserId =  null;
      //ccirpir.Description =  "Description 1";
      //ccirpir.Description2 =  "Description 2";
      //ccirpir.Description3 =  "Description 3";
      //ccirpir.Description4 =  "Description 4";


      console.log(ccirpir);
      console.log(JSON.stringify(ccirpir));
      this.props.addCcirPir(this.state.ccirpir).then( () => {this.props.onClose();});
    }
    
  }


  handleChange = (e) =>{
    const { name, value } = e.target;
   
    const { ccirpir } = this.state;
    this.setState({
      ccirpir: {
             ...ccirpir,
             [name]: value
         }
     }, () =>{
       //console.log("m   m m m m    "+JSON.stringify(this.state.ccirpir) );
        //this.props.data(this.state.ccirpir);
    });
     
 }

 


  render() {
    // Render nothing if the "show" prop is false
    // if(!this.props.show) {
    //   return null;
    // }

    // let $newdiv = '';

    // if(this.state.addClicked)
    //   {
    //   $newdiv=(<div className="col-md-12"><div className="entry-field"><div className="entry-detail"><textarea rows="3" className="description"/></div><div className="add-buttion"><button> add </button></div></div></div>);
    //   }
    //   else {$newdiv = '';}

    const { translations } = this.props;

    const generalFields = [
     /*  {name: 'Creation Date/Time', type: 'date'}, */
      {name: 'COCOM', type: 'dropdown', ddID: 'COCOM' , valFieldID: 'COCOMId', domID: 'COCOM'},
      {name: 'Branch', type: 'dropdown', ddID: 'BranchOfService',  valFieldID: 'BranchId', domID: 'Branch'},
      {name: 'Country', type: 'dropdown', ddID: 'Countries',  valFieldID: 'CountryId', domID: 'Country'},
      {name: 'Region', type: 'dropdown', ddID: 'Regions',  valFieldID: 'RegionId', domID: 'Region'},
      {name: 'Unit', type: 'dropdown',ddID: 'Units',  valFieldID: 'UnitId', domID: 'Unit'},
      {name: 'Commander', type: 'dropdown', ddID: 'Personnel/GetCommanderList',  valFieldID: 'CommanderId', domID: 'Commander'},
      {name: 'Type', type: 'dropdown', ddID: 'TypesEnum',  valFieldID: 'Type', domID: 'TypesEnum'},
      {name: 'Operation/Mission Name', type: 'input',  valFieldID: 'MissionName', domID: 'Opname'},
      {name: 'Effective Area KML', type: 'file',  valFieldID: 'EffectiveAreaKML', domID: 'KML'}
    ];

    const typesEnum =[ 
        {name : 'CCIR'},
        {name : 'PIR'}
      ];
   

    return (
      
        <div>
                <form action="" onSubmit={this.handleSubmit} >

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

            <ModalFormBlock editId={this.props.editId} data={this.handleCcirPirGeneralData} fields={generalFields} typesEnum={typesEnum} initstate={this.props.oneCcirPir}/>
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
            <div className="entry-detail col-md-12">
                <label>Description 1</label>
            </div>
              <div className="entry-detail col-md-12">
                <textarea rows="3" className="description ccir"  name="Description" onChange={this.handleChange.bind(this)} />
              </div>
            
            </div>


            <div className="entry-field">
              <div className="entry-detail col-md-12">
                <label>Description 2</label>
              </div>
              <div className="entry-detail col-md-12">
                <textarea rows="3" className="description ccir" name="Description2" onChange={this.handleChange.bind(this)}/>
              </div>
            </div>

            <div className="entry-field">
              <div className="entry-detail col-md-12">
                <label>Description 3</label>
              </div>
              <div className="entry-detail col-md-12">
                <textarea rows="3" className="description ccir" name="Description3" onChange={this.handleChange.bind(this)}/>
              </div>
            </div>

            <div className="entry-field">
              <div className="entry-detail col-md-12">
                <label>Description 4</label>
              </div>
              <div className="entry-detail col-md-12">
                <textarea rows="3" className="description ccir" name="Description4" onChange={this.handleChange.bind(this)}/>
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
                  <div className="entry-detail col-md-12">
                    <label>Description 1</label>
                  </div>
                  <div className="entry-detail col-md-12">
                   <textarea rows="3" className="description ccir"  name="Description" onChange={this.handleChange.bind(this)}/>
                  </div>
             
                </div>

                <div className="entry-field ">
                  <div className="entry-detail col-md-12">
                    <label>Description 2</label>
                  </div>
                  <div className="entry-detail col-md-12">
                   <textarea rows="3" className="description ccir"  name="Description2" onChange={this.handleChange.bind(this)}/>
                  </div>
             
                </div>

                <div className="entry-field ">
                  <div className="entry-detail col-md-12">
                    <label>Description 3</label>
                  </div>
                  <div className="entry-detail col-md-12">
                   <textarea rows="3" className="description ccir"  name="Description3" onChange={this.handleChange.bind(this)} />
                  </div>
             
                </div>

                <div className="entry-field ">
                  <div className="entry-detail col-md-12">
                    <label>Description 4</label>
                  </div>
                  <div className="entry-detail col-md-12">
                   <textarea rows="3" className="description ccir"  name="Description4" onChange={this.handleChange.bind(this)} />
                  </div>
             
                </div>


              
            </div>
          </div>
          
          </div>
          <div className="col-md-12" style={{textAlign:'center'}}>
            <CustomButton buttonName="save" />
          </div>
          </form>
        </div>
      
    );
  }
}

CcirPirModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  editId: PropTypes.string,

};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneCcirPir: state.ccirpir.oneCcirPir,
  };
};

const mapDispatchToProps = {
  addCcirPir,
  updateCcirPir,
  fetchCcirPirById,
};

export default connect(mapStateToProps, mapDispatchToProps)(CcirPirModal);

//export default CcirPirModal;