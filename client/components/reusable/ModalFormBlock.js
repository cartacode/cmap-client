import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';

class ModalFormBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
       this.state.content = this.props.initstate ;
    }

    handleChange = (e) =>{
       const { name, value } = e.target;
       console.log(", Value: "+e.target.value);
       console.log(", name: "+e.target.name);
       const { content } = this.state;
       this.setState({
            content: {
                ...content,
                [name]: value
            }
        }, () =>{
           
           this.props.data(this.state.content);
       });
        
    }
    /**
     * This method is uses to handle file handle events.
     */
    handleUploadFile(event){
        event.preventDefault();
        const {location} = this.state;
  
        let parametername = event.target.id;
  
        this.setState({
            location: {
                ...location,
                [parametername] : event.target.files[0].name
            }
        }, () => {
            console.log("New state in ASYNC callback:", this.state.location);
        });
  
        const data = new FormData();
  
        data.append('file', event.target.files[0]);
        data.append('name', event.target.files[0].name);
  
      //  this.props.uploadFile(data);
    }

    handleChangeNumber = (e) =>{
       const { name, value } = e.target;
       console.log(", Value: "+e.target.value);
       console.log(", name: "+e.target.name);
       const { content } = this.state;
       this.setState({
            content: {
                ...content,
                [name]: Number(value)
            }
        }, () =>{
           
           this.props.data(this.state.content);
       });
        
    }

    handleChangeCheck = (e) =>{
       const { name, value } = e.target;
       console.log(", Value: "+e.target.value);
       console.log(", name: "+e.target.name);
       let parameterValue = '';
       if (e.target.value  == 'on') {
          parameterValue = true;
       }
       else {
          parameterValue = false;
       }

       const { content } = this.state;
       this.setState({
            content: {
                ...content,
                [name]: parameterValue
            }
        }, () =>{
            this.props.data(this.state.content);
        });
        
    }


    handleDropdownSelectedData = (dropdownData, name) => {
        debugger;
        const { content } = this.state;
        console.log("Dropdown actual data: "+dropdownData+", Name : "+name);
        this.setState({
            content: {
                ...content,
                [name]: dropdownData.trim()
            }
        }, () =>{
            this.props.data(this.state.content);
        });
    }

    handleChangeDate = (changeDate, name) => {
        debugger;
        const { content } = this.state;
        console.log("actual date: "+changeDate+", Name : "+name);
        this.setState({
            content: {
                ...content,
                [name]: changeDate._d
            }
        }, () =>{
            this.props.data(this.state.content);
        });
    }

    renderFields() {
      return this.props.fields.map((item, i) => {
        let input;
        switch (item.type) {
          case 'input':
            input = (<input type="text" className="form-control" name={item.valFieldID} onChange={this.handleChange} value={item.valField}/>);
            break;

          case 'number':
            input = (<input type="number" className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
            break;

        case 'file':
            input = (<input type="file" className="form-control" name={item.valFieldID} onChange={this.handleUploadFile.bind(this)} value={item.valField}/>);
            break;  

          case 'dropdown':
            input = (
                <Dropdown id={item.valFieldID} dropdownDataUrl={item.ddID} labelName={item.label} finalValue={item.value} dropdownData={this.handleDropdownSelectedData}/>
            );
            break;

          case 'date':
            input = (
                <div>
                    <CustomDatePicker name={item.valFieldID} changeDate={this.handleChangeDate}/>
                </div>
            );
            break;
          case 'checkbox':
            input = (
                <div>
                    <input type="checkbox" id={`checkbox${i}`} name={item.valFieldID} onChange={this.handleChangeCheck}/>
                    <label htmlFor={`checkbox${i}`}><span/></label>
                </div>
            );
            break;

        }

        return (

          <div className="col-md-12 form-fields-gap">
            <div className="col-md-12 label-title" style={{padding:0}}>{item.name}</div>
            <div className="col-md-12 pull-right" style={{padding:0}}>{input}</div>
          </div>
        )
      });
    }


    render() {

      return (
        <div className="col-md-12 info-block">
          <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content`}>
              {this.renderFields()}
          </div>
        </div>
      );
    }
}

ModalFormBlock.propTypes = {
  children: PropTypes.element,

};

export default ModalFormBlock;
