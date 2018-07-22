import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { base_url } from '../../config';

class MissionMgtDropDown extends React.Component {

    labelField= "description";
    valueField = 'id';

    constructor(props) {
        super(props);
        this.state = {
            dropdownItems: [],
            selectedDropDownValue : 0
        };

        this.handleChange = this.handleChange.bind(this);
        if(undefined !== props.labelName){
            this.labelField = props.labelName;
        }
        if(undefined !== props.finalValue){
            this.valueField = props.finalValue;
        }
    }


    componentWillMount() {
        let items = [{"label": "--"+this.props.id+"--", "value": 0}];

        let apiUrl = base_url + this.props.dropdownDataUrl
        axios.get(apiUrl)
            .then(response => {
                response.data.map(item => {
                    items.push({"label": item[this.labelField], "value": item[this.valueField]});
                });
                this.setState({
                    dropdownItems: items
                });
            })
            .catch((error) => {
                console.log("Exception comes:" + error);
            });
    }

    changeValue = (label, value) => {
        console.log("Display Lable : "+label+ ", Saved Value :"+value);
    };

    //render dropdown list of lang switcher
    renderItems() {
        return this.state.dropdownItems.map(function(data, key){  return (
            <option key={key} value={data.value}>{data.label}</option> )
        })
    }

    handleChange = (e) => {
     const { name, value } = e.target;
        console.log(name +"----"+value);
        const { selectedDropDownValue } = this.state;
        this.setState({
            selectedDropDownValue: value
        }, () =>{
            this.props.dropdownData(this.state.selectedDropDownValue, name);
        });
    }

    render() {
        let key = this.props.id || 0;
        return (
            <div className="each-select">
                <select className="form-control" name={key} onChange={this.handleChange}>
                    {this.renderItems()}
                </select>
            </div>
        );
    }
}

MissionMgtDropDown.propTypes = {
    children: PropTypes.element,

};

export default MissionMgtDropDown;
