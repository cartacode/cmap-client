import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';


class ContentBlock extends React.Component {

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
                    input = (<input type="text" className="form-control" name={item.valFieldID} onChange={this.handleChange} />);
                    break;

                case 'number':
                    input = (<input type="number" className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
                    break;

                case 'dropdown':
                    input = (
                        <Dropdown id={item.valFieldID} dropdownDataUrl={item.ddID} nums={this.props.platform} labelName={item.label} finalValue={item.value} dropdownData={this.handleDropdownSelectedData}/>
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
                    <div className="col-md-12 label-title">{item.name}</div>
                    <div className="col-md-12 pull-right">{input}</div>
                </div>
                /* <div className="info-line" key={i}>
                     <div>
                         {item.name}
                     </div>
                     <div >
                         {input}
                     </div>
                 </div>*/
            )
        });
    }


    render() {

        return (
            <div className="col-md-4 info-block">
                <div className="info-header">
                    <img src={this.props.headerLine} alt=""/>
                    <div className="header-text">
                        {this.props.title}
                    </div>
                    <img className="mirrored-X-image" src={this.props.headerLine} alt=""/>
                </div>
                <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content`}>
                    {this.renderFields()}
                </div>
            </div>
        );
    }
}

ContentBlock.propTypes = {
    children: PropTypes.element,

};

export default ContentBlock;
