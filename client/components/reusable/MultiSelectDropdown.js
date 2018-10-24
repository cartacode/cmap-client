import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';

class MultiSelectDropdown extends React.Component {

    labelField= 'description';
    valueField = 'id';

    constructor(props) {
      super(props);
      this.state = {
        dropdownItems: [],
        selectedDropDownValue: 0,
        selectedMultipleDropDownValue: [],
      };

      this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
      if(undefined !== props.labelName) {
        this.labelField = props.labelName;
      }

      if(undefined !== props.finalValue) {
        this.valueField = props.finalValue;
      }
    }

    componentWillMount() {
      const items = [{ 'label': '--Select Item--', 'value': 0 }];

      if(this.props.dropdownDataUrl !== undefined && this.props.dropdownDataUrl !== null && this.props.dropdownDataUrl !== '') {

        const apiUrl = `${baseUrl}/${this.props.dropdownDataUrl}`;
        axios.get(apiUrl, { headers: requestHeaders })
          .then(response => {
            if(response.data) {
              response.data.map(item => {
                let val = item[this.valueField];
                if(typeof val === 'string') {
                  val = val.trim();
                }
                items.push({ 'label': item[this.labelField], 'value': val });
              });
              this.setState({
                dropdownItems: items,
              });
            }
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });

      }

      if(this.props.options) {
        this.setState({
          dropdownItems: this.props.options,
        });
      }

    }

    componentDidUpdate = () => {
      let { initValue } = this.props;
      const { selectedMultipleDropDownValue } = this.state;
      if(typeof initValue === 'string') {
        initValue = initValue.trim();
      }
      if(initValue !== selectedMultipleDropDownValue) {
        this.setState({
          selectedMultipleDropDownValue: initValue,
        });
      }
    }

    // Generates optins array
    renderItems = () => {

      return this.state.dropdownItems.map((data, key) => {
        if(key === 0) { data.value = ''; }
        return (
          <option key={key} value={data.value}>{ data.label }</option>
        );
      });
    }

    handleMultiSelectChange = (e) => {
      let { name, value } = e.target;
      let options = e.target.options;
      let values = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      this.setState({
        selectedMultipleDropDownValue: values,
      }, () =>{
        this.props.dropdownData(values, name);
      });
    }

    render() {
      const key = this.props.id || 0;
      return (
        <div>
          {this.props.required?
            <select className="form-control multiple-select" name={key} onChange={this.handleMultiSelectChange} value={this.state.selectedMultipleDropDownValue} multiple required>
              {this.renderItems()}
            </select>
            :<select className="form-control multiple-select" name={key} onChange={this.handleMultiSelectChange} value={this.state.selectedMultipleDropDownValue} multiple>
            {this.renderItems()}
          </select>}
        </div>
      );
    }
}

MultiSelectDropdown.propTypes = {
  children: PropTypes.element,
  dropdownData: PropTypes.func,
  id: PropTypes.string,
  initValue: PropTypes.any,
  required: PropTypes.bool,
};

export default MultiSelectDropdown;
