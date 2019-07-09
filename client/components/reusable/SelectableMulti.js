import React from 'react';
import AsyncCreatSelect from 'react-select/async-creatable';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    color: state.isFocused ? '#FFF' : '#84a1e0',
    backgroundColor: state.isFocused ? '#1E90FF' : '#0f2b3d',
    lineHeight: '2px',
    fontSize: '12px',
    height: '26px',
    // backgroundColor: state.isFocused ? 'blue' : 'red',
  }),
  control: styles => ({ ...styles,
    backgroundColor: '#0f2b3d',
    fontSize: '12px',
    borderRadius: '0px',
    border: '1px solid #ccc',
    color: '#FFF',
  }),
  multiValue: (styles, { data }) => ({ ...styles, color: '#fffccc', backgroundColor: '#1E90FF' }),
  multiValueRemove: (styles, { data }) => ({ ...styles, color: '#fffccc', backgroundColor: 'orange' }),
  multiValueLabel: (styles, { data }) => ({ ...styles, color: '#fffccc', backgroundColor: '#337ab7' }),
  input: styles => ({ ...styles, color: '#84a1e0' }),
  indicatorSeparator: styles => ({ ...styles, display: 'none' }),
  menu: styles => ({ ...styles, backgroundColor: '#0f2b3d' }),
};

class SelectableMulti extends React.Component {

  constructor(props) {
    super(props);
    // setting defaults in state
    this.state = {
      isLoading: false,
      selectOptions: [],
      // values: [{ id: '', description: 'Select Item' }],
      values: [],
      ids: [],
    };
  }

  // Updating initial state values of component
  // componentDidUpdate = () => {
  //   let { initValue } = this.props;
  //   const { ids } = this.state;
    
  //   if (typeof initValue === 'string') {
  //     initValue = initValue.trim();
  //   }
  //   // if (initValue && id == '' && initValue !== id) {
  //   if (initValue && ids.length === 0) {
  //     const options = this.getOptionsByValue(initValue);
  //     // const newIds = newValues.map(option => option.id);
  //     this.setState({
  //       values: options,
  //       ids: initValue,
  //     });
  //   }
  // }

  // searching among options
  filterOptions = (inputValue) => {
    return this.state.selectOptions.filter(i =>
      // i.description.toLowerCase().startsWith(inputValue.toLowerCase())
      i.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // get option object by id field
  getOptionsByValue = (inputValues) => {
    return this.state.selectOptions.filter(i =>
      // i.id.toString() === inputValue.toString()
      inputValues.includes(i.id)
    );
  }

  // Getting options from server api.
  getOptions = (inputValue) => {
    if (inputValue) {
      // return Promise.resolve(this.filterOptions(inputValue));
      // return callback([]);
      return this.filterOptions(inputValue);
    }
    this.setState({ isLoading: true });
    const apiUrl = `${baseUrl}/${this.props.dropdownDataUrl}`;
    return axios.get(apiUrl, { headers: requestHeaders }).then(response => {
      this.selectOptions = response.data;
      this.setState({
        isLoading: false,
        selectOptions: response.data,
      });
      return response.data;
    });
  }

  // reurnin options as promise
  promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(this.getOptions(inputValue));
    });

  // update values of option on select in new component
  handleChange = (newValues, actionMeta) => {
    console.log(actionMeta.action);
    if(actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' || actionMeta.action === 'clear') {
      let newIds = [];
      if(newValues) {
        newIds = newValues.map(option => option.id);
      }
      this.props.dropdownData(newIds, this.props.id);
      this.setState({
        ids: newIds,
        values: newValues,
      });
    }
  }

  // handleInputChange = (newValues, actionMeta) => {
  //   if(actionMeta.action === 'select-option') {
  //     const newIds = newValues.map(option => option.id);
  //     console.log(newIds);
  //     this.props.dropdownData(newIds, this.props.id);
  //     this.setState({
  //       ids: newIds,
  //       values: newValues,
  //     });
  //   }
  // }
  // handleMultiSelectChange = (e) => {
   
  //   let options = e.target.options;
  //   let values = [];
  //   for (let i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       values.push(options[i].value);
  //     }
  //   }
  //   this.setState({
  //     selectedMultipleDropDownValue: values,
  //   }, () =>{
  //     this.props.dropdownData(values, name);
  //   });
  // }

  // Creatng an option which is not present in dropdonw
  handleCreateOption = (inputValue) => {
    this.setState({ isLoading: true });
    const apiUrl = `${baseUrl}/${this.props.createUrl}`;
    const fieldName = this.props.createName;

    const data = {};
    data[fieldName] = inputValue;

    axios.post(apiUrl, JSON.stringify(data), { headers: requestHeaders }).then(response => {
      // this.selectOptions = response.data;
      const newOption = { id: response.data.id, description: response.data[fieldName] };
      this.setState(prevState => ({
        isLoading: false,
        selectOptions: [...this.state.selectOptions, newOption],
        values: [...prevState.values, newOption],
        ids: [...prevState.ids, newOption.id],
      }), () => {
        const { ids } = this.state;
        // updating parent coponent state values
        this.props.dropdownData(ids, this.props.id);
      });
    });
  }

  // Label format for Add New option
  createLabelFormat = inputValue => {
    return 'Create " ' + inputValue + ' "';
  }

  // Struture for new option data.
 newOptionData = (inputValue, optionLabel) => {
   return {
     id: inputValue,
     description: optionLabel,
   };
 }
 
 render() {
   return (
     <AsyncCreatSelect
       isClearable={true}
       isMulti={true}
       value={this.state.values}
       onChange={this.handleChange}       
       onCreateOption={this.handleCreateOption}
       loadOptions={this.promiseOptions}
       getOptionLabel={opt=> opt.description}
       getOptionValue={opt => opt.id}
       formatCreateLabel={this.createLabelFormat}
       getNewOptionData={this.newOptionData}
       styles={customStyles}
       isLoading={this.isLoading}
       defaultOptions
     />
   );
 }
}

SelectableMulti.propTypes = {
  children: PropTypes.element,
  createName: PropTypes.string,
  createUrl: PropTypes.string,
  disabled: PropTypes.bool,
  dropdownData: PropTypes.func,
  dropdownDataUrl: PropTypes.string,
  id: PropTypes.string,
  initValue: PropTypes.any,
  multiSelect: PropTypes.string,
  required: PropTypes.bool,
};

export default SelectableMulti;
