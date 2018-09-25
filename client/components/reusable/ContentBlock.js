import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../reusable/Dropdown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import { InputAttributes } from '../../dictionary/constants';
import moment from 'moment';

class ContentBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //    this.state.content = this.props.initstate ;
    this.setState({
      content: this.props.initstate,
    });
  }

  componentDidUpdate() {

    const { initstate, editFetched } = this.props;
    // const { editFetched } = this.props;

    // if(Object.keys(content).length === 0 && content.constructor === Object && editId !== undefined && editId !== '0') {
    //   // if(editId !== undefined && editId !== '0') {
    //     console.log("Is it called?");
    //   this.setState({
    //     content: initstate,
    //   });
    //   this.props.data(this.state.content);
    // }

    if (editFetched) {
      this.props.stopupd();
     // console.log('inint state '+ JSON.stringify(initstate));
      this.setState({ content: initstate }, () => { this.props.data(this.state.content); });

    }

    const { clearit } = this.props;
    if (clearit) {
      this.setState({ content: [] });
      this.props.stopset();
    }
  }

  handleChange = (e) => {
    
    let { name, value, id } = e.target;
    
    let regex = e.target.getAttribute('data-regex');
    let regexType = e.target.getAttribute('data-regex-type')
    let bool = true;
    
    if(regex !== undefined && regex !== '' && regex !== null){
      // Regular expression for field
      let regexValue = new RegExp(regex);
      
      bool = regexValue.test(value);
      if(!bool){
        document.getElementById(id).value = '';
        document.getElementById(id).placeholder = 'Please Select Only '+regexType+' Value';
        value = '';
      }
    }
    
    this.updateContent(name, value);

  }

  handleChangeNumber = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, Number(value));
  }

  handleChangeCheck = (e) => {
    const { name, checked } = e.target;
    // let parameterValue = '';
    // if (value === 'on') {
    //   parameterValue = true;
    // } else {
    //   parameterValue = false;
    // }
    // this.updateContent(name, parameterValue);
    this.updateContent(name, checked);
    
  }

  handleDropdownSelectedData = (dropdownData, name) => {
    this.updateContent(name, dropdownData.trim());
  }

  handleChangeDate = (changeDate, name) => {
    
    if(changeDate !== null)
      this.updateContent(name, changeDate);
  }

  /**
     * This method is use for handle the selected file by browse.
     */
    handleSelectedFile = (event) => {
      const name = event.target.name;
      const id = event.target.id;
      const file = event.target.files[0];
      const extension = event.target.getAttribute('data-extension');
      let fileSize = 5242880;   // 5Mb

      // check for extension of file if extension mentioned
      if(extension !== undefined && extension !== '' && extension !== null) {
        if(file.name.split('.').pop() !== extension){
            alert('Select a valid '+ extension+ ' File ');
            document.getElementById(id).value= null;
            return;
        }else{
          if(extension === 'kml')
            {
              // Set Size 2Mb
              fileSize = 2097152;
            }

        }
    }


      if(file.size > fileSize) {
        alert('File size should be less than '+ fileSize +' MB.');
        document.getElementById(id).value = null;
        this.updateContent(name, new File([''], ''));
      }else {
        this.updateContent(name, file);
      }
    }

    updateContent(name, value) {
      const { content } = this.state;
      this.setState({
        content: {
          ...content,
          [name]: value,
        },
      }, () => {
        this.props.data(this.state.content);
      });
    // this.props.initstate[name] = value;
    // const { initstate } = this.props;
    // this.props.data(initstate);
    }

    renderFields() {

      return this.props.fields.map((item, i) => {
        let input;
        let value = '';

        // if(item.valFieldID !== undefined && this.props.initstate[item.valFieldID] !== undefined && this.props.initstate[item.valFieldID] !== null){
        //   value = this.props.initstate[item.valFieldID];
        // }

        if (item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null) {
          value = this.state.content[item.valFieldID];
        }
        // console.log('value of ' +item.valFieldID+ ' is => ' + this.props.initstate[item.valFieldID]+' final  ' + value);
        //  console.log('value of ' +item.valFieldID+ ' is => ' + this.state.content[item.valFieldID]+' final  '+ value);
        // if(value === null || value === 'undefined') {
        //     value = 'NA';
        // }

        switch (item.type) {
          case 'input':
            let maxlength = InputAttributes.MAX_LENGTH;
           
            if(item.maxlength) {
              maxlength = item.maxlength;
            }
            if (item.required) {
              if (item.validationIcon) {
                input = (<div className="input-group"><input type="text" className="form-control" value={value} data-regex={item.regex} data-regex-type={item.regexType} id={item.domID} name={item.valFieldID} onChange={this.handleChange} required maxLength={maxlength}/><span className="input-group-addon-validation-icon"> <img id="validationIcon" src="" /></span> </div>);
              } else {
                input = (<input type="text" className="form-control" value={value} name={item.valFieldID} data-regex={item.regex} data-regex-type={item.regexType}  id={item.domID} onChange={this.handleChange} maxLength={maxlength} required />);
              }
            } else {
              input = (<input type="text" className="form-control" value={value} name={item.valFieldID} data-regex={item.regex} data-regex-type={item.regexType}  id={item.domID} onChange={this.handleChange} maxLength={maxlength} />);
            }
           
            break;

          case 'textarea':
            let maxlen = InputAttributes.TEXTAREA_LEN;
            if(item.maxlength) {
              maxlen = item.maxlength;
            }
            if (item.required) {
              input = (<textarea rows="3" className="instruction" value={value} name={item.valFieldID} maxLength={maxlen} onChange={this.handleChange} required/>);
            } else {
              input = (<textarea rows="3" className="instruction" value={value} name={item.valFieldID} maxLength={maxlen} onChange={this.handleChange} />);
            }
            break;

          case 'email':
            if (item.required) {
              input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} required />);
            } else {
              input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} />);
            }
            break;

          case 'password':
            if (item.required) {
              input = (<input type="password" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} required />);
            } else {
              input = (<input type="password" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} />);
            }
            break;  

          case 'number':
            let minValue = 0;
            if (item.minValue) {
              minValue = item.minValue;
            }
            if (item.required) {
              if(item.isDecimal) {
                input = (<input type="number" step="any" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} required />);
              }else {
                input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} required />);
              }
            } else if(item.isDecimal) {
              input = (<input type="number" step="any" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
            } else {
              input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
            }
            break;

          case 'dropdown':
            let req = false;
            if (item.required) {
              req = true;
            }
            // if(value === '') {
            //   value = 11;
            // }
            input = (
              <Dropdown id={item.valFieldID} initValue={value} dropdownDataUrl={item.ddID} labelName={item.label} finalValue={item.value} options={item.options} dropdownData={this.handleDropdownSelectedData} required={req} />

            );
            break;

          case 'date':
            if (value === '') {
              value = new Date();
            } else {
              value = moment(value);
            }
            // console.log('value date '+ moment(value));
            input = (
              <div>
                <CustomDatePicker name={item.valFieldID} defaultValue={value} changeDate={this.handleChangeDate} />
              </div>
            );
            break;
          case 'checkbox':
          let checkBoxValue = value;
          // value of checkBoxes comes as String for few checkBox Variables AND Boolean for some checkBox variables
          if(value !== undefined && value !== '' && value !== null && (value === "True" || value === "true" || value === true)){
            checkBoxValue = true;
          }
          else{
            checkBoxValue = false;
          }
            input = (      
              <div>
                <input type="checkbox" id={`checkbox${i}`} name={item.valFieldID} onChange={this.handleChangeCheck}   checked={checkBoxValue}/>
                <label htmlFor={`checkbox${i}`}><span /></label>
              </div>
            );
            break;
          case 'file':
          if(item.required)
          {
            input = (<input type="file" id={`uploadFile${i}`} className="hidden_input" name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} data-extension={item.extension} required/>);
          }else
            input = (<input type="file" id={`uploadFile${i}`} className="hidden_input" name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} data-extension={item.extension} />);
            break;

        }

        return (
          <div className="col-md-12 form-fields-gap" key={'elem' + i}>
            <div className="col-md-12 label-title">{item.name}</div>
            <div className="col-md-12 ">{input}</div>
          </div>
        /* <div className="info-line" key={i}>
                <div>
                    {item.name}
                </div>
                <div >
                    {input}
                </div>
            </div>*/
        );
      });
    }

    render() {

      return (
        <div className="col-md-4 info-block">
          <div className="info-header">
            <img src={this.props.headerLine} alt="" />
            <div className="header-text">
              {this.props.title}
            </div>
            <img className="mirrored-X-image" src={this.props.headerLine} alt="" />
          </div>
          <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content col-md-12`}>
            {this.renderFields()}
          </div>
        </div>
      );
    }
}

ContentBlock.propTypes = {
  children: PropTypes.element,
  data: PropTypes.func,
  editFetched: PropTypes.bool,
};

export default ContentBlock;
