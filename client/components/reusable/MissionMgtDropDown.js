import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl } from 'dictionary/network';

class MissionMgtDropDown extends React.Component {

    labelField= 'description';
    valueField = 'id';

    constructor(props) {
      super(props);
      this.state = {
        dropdownItems: [],
        selectedDropDownValue: this.props.defaultResource,
        selectedDropDownType: 1,
      };

      this.handleChange = this.handleChange.bind(this);
      if(undefined !== props.labelName) {
        this.labelField = props.labelName;
      }
      if(undefined !== props.finalValue) {
        this.valueField = props.finalValue;
      }
    }

    componentWillMount() {
      const { dropdownDataUrl } = this.props;
      const { options } = this.props;
      if(dropdownDataUrl) {
        //const items = [{ 'label': '--' + this.props.id + '--', 'value': 0 }];
        const items = [{ 'label': '--' + 'select' + '--', 'value': 0 }];
        axios.get(`${baseUrl}/${this.props.dropdownDataUrl}`)
          .then(response => {
            response.data.map(item => {
              items.push({ 'label': item[this.labelField], 'value': item[this.valueField] });
            });
            this.setState({
              dropdownItems: items,
            });
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });
      }else if(options) {
        const items = [{ 'label': '--' + 'select' + '--', 'value': 0 }];
        options.map(item => {
          items.push({ 'label': item[this.labelField], 'value': item[this.valueField] });
        });
        this.setState({
          dropdownItems: items,
        });
      }
    }

    componentDidUpdate() {
     
    }


    changeValue = (label, value) => {
      console.log('Display Lable : ' + label + ', Saved Value :' + value);
    };

    // render dropdown list of lang switcher
    renderItems() {
      const { defaultResource } = this.props;
      return this.state.dropdownItems.map(function(data, key) {
        return (
          <option key={key} value={data.value}>{data.label}</option>
        );
        
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name + '----' + value);
      this.setState({
        selectedDropDownType: name,
        selectedDropDownValue: value,
      }, () =>{
        this.props.data(this.state.selectedDropDownType , this.state.selectedDropDownValue);
      });
    }

    render() {
      const key = this.props.id || 0;
      const label = this.props.label;
      return (
        <div className="each-select">
          <label>{label}</label>
          <select className="form-control" name={key} onChange={this.handleChange} value = {this.state.selectedDropDownValue}>
            {this.renderItems()}
          </select>
        </div>
      );
    }
}

MissionMgtDropDown.propTypes = {
  children: PropTypes.element,
  data: PropTypes.func,

};

export default MissionMgtDropDown;
