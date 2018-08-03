import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl } from 'dictionary/network';

class Table extends React.Component {

    labelField= "description";
    valueField = 'id';

    constructor(props) {
        super(props);
        this.state = {
            dropdownItems: [],
            selectedDropDownValue : 0
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
        let items = [{'label': '--Select Item--', 'value': 0}];

        if (this.props.dropdownDataUrl === 'CrewReq') {
			this.props.nums.map(item => {
				items.push({'label': item['name'], 'value': item['name']});
			});
			this.setState({
				dropdownItems: items
			});
        }
        else {
        const apiUrl = `${baseUrl}/${this.props.dropdownDataUrl}`;
        axios.get(apiUrl)
          .then(response => {
            response.data.map(item => {
              items.push({'label': item[this.labelField], 'value': item[this.valueField]});
            });
            this.setState({
              dropdownItems: items
            });
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });
      }
    }

    componentDidUpdate = () => {
      const { initValue } = this.props;
      const { selectedDropDownValue } = this.state;
      if(initValue !== selectedDropDownValue) {
        this.setState({
          selectedDropDownValue: initValue,
        });
      }
    }


    // changeValue = (label, value) => {
    //     console.log('Display Lable : '+label+ ', Saved Value :'+value);
    // };

    // render dropdown list of lang switcher
    renderItems = () => {
    //   const req = this.props.required;
      return this.state.dropdownItems.map((data, key) => {
        if(key === 0)
        { data.value = ''; } 
           return (
            <option key={key} value={data.value}>{ data.label }</option>
        )
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      // const { selectedDropDownValue } = this.state;
      this.setState({
        selectedDropDownValue: value,
      }, () =>{
        this.props.dropdownData(value, name);
      });
    }

    render() {
      const key = this.props.id || 0;
      return (
        <div>
          {this.props.required ? 
            <select className="form-control" name={key} onChange={this.handleChange} required>
              {this.renderItems()}
            </select>
            :
            <select className="form-control" name={key} onChange={this.handleChange} >
              {this.renderItems()}
            </select>}
            
        </div>
      );
    }
}

Table.propTypes = {     
  children: PropTypes.element,
  dropdownData: PropTypes.func,
  initValue: PropTypes.any,
};

export default Table;
