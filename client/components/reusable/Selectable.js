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
    height: '26px',
  }),
  // control: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   //width: 200,
  //   border: '1px solid #ccc',
  //   backgroundColor: '#0f2b3d',
  //   lineHeight: '2px',
  //   fontSize: '12px',
  //   height: 25,
  //   // width: 10,
  // }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // },
  singleValue: (styles, { data }) => ({ ...styles, color: '#84a1e0' }),
  input: styles => ({ ...styles, color: '#84a1e0' }),
};

class Selectable extends React.Component {

  constructor(props) {
    super(props);
    // setting defaults in state
    this.state = {
      isLoading: false,
      selectOptions: [],
      value: { id: '', description: 'Select Item' },
      id: '',
    };
  }

  // Updating initial state value of component
  componentDidUpdate = () => {
    let { initValue } = this.props;
    const { id } = this.state;
    
    if (typeof initValue === 'string') {
      initValue = initValue.trim();
    }
    if (initValue && id == '' && initValue !== id) {
      const option = this.getOptionByValue(initValue)[0];
      this.setState({
        value: option,
        id: initValue,
      });
    }

  }

  // searching among options
  filterOptions = (inputValue) => {
    return this.state.selectOptions.filter(i =>
      // i.description.toLowerCase().startsWith(inputValue.toLowerCase())
      i.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // get option object by id field
  getOptionByValue = (inputValue) => {
    return this.state.selectOptions.filter(i =>
      i.id.toString() === inputValue.toString()
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

  // update value of option on select in new component
  handleChange = (newValue, actionMeta) => {
    if(actionMeta.action === 'select-option') {
      this.props.dropdownData(newValue.id, this.props.id);
      this.setState({
        id: newValue.id,
        value: newValue,
      });
    }
  }

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
      this.setState({
        isLoading: false,
        selectOptions: [...this.state.selectOptions, newOption],
        value: newOption,
        id: newOption.id,
      });
      // updating parent coponent satae value 
      this.props.dropdownData(newOption.id, this.props.id);
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
       isSearchable={true}
       value={this.state.value}
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

Selectable.propTypes = {
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

export default Selectable;
