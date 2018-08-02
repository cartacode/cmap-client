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
    //    this.state.content = this.props.initstate ;
    this.setState({
      content: this.props.initstate,
    });
  }


//   componentWillReceiveProps(nextProps) {
//     // You don't have to do this check first, but it can help prevent an unneeded render
//     console.log('abc ');
//     if (nextProps.initstate !== this.state.content) {
//       this.setState({
//         content: this.props.initstate,
//       });
//     }
//   }

    handleChange = (e) =>{
        const { name, value } = e.target;
        // console.log('value==== > '+value);
        // const { content } = this.state;
        // this.setState({
        //     content: {
        //         ...content,
        //         [name]: value
        //     }
        // }, () =>{
            
        //     this.props.data(this.state.content);
        // });
        this.props.initstate[name] = value;
        const { initstate } = this.props;
        this.props.data(initstate);
    }

    handleChangeNumber = (e) =>{
       const { name, value } = e.target;
       console.log(", Value: "+e.target.value);
       console.log(", name: "+e.target.name);
    //    const { content } = this.state;
    //    this.setState({
    //         content: {
    //             ...content,
    //             [name]: Number(value),
    //         }
    //     }, () =>{
           
    //        this.props.data(this.state.content);
    //    });
       this.props.initstate[name] = Number(value);
       const { initstate } = this.props;
       this.props.data(initstate);
    }

    handleChangeCheck = (e) =>{
       const { name, value } = e.target;
       
       let parameterValue = '';
       if (e.target.value  == 'on') {
          parameterValue = true;
       }
       else {
          parameterValue = false;
       }

    //    const { content } = this.state;
    //    this.setState({
    //         content: {
    //             ...content,
    //             [name]: parameterValue,
    //         }
    //     }, () =>{
    //         this.props.data(this.state.content);
    //     });
        this.props.initstate[name] = parameterValue;
        const { initstate } = this.props;
        this.props.data(initstate);
    }


    handleDropdownSelectedData = (dropdownData, name) => {
        
        // const { content } = this.state;
        
        // this.setState({
        //     content: {
        //         ...content,
        //         [name]: dropdownData.trim(),
        //     }
        // }, () =>{
        //     this.props.data(this.state.content);
        // });

        this.props.initstate[name] = dropdownData.trim();
        const { initstate } = this.props;
        this.props.data(initstate);
    }

    handleChangeDate = (changeDate, name) => {
        // debugger;
        // const { content } = this.state;
        // console.log("actual date: "+changeDate+", Name : "+name);
        // this.setState({
        //     content: {
        //         ...content,
        //         [name]: changeDate._d
        //     }
        // }, () =>{
        //     this.props.data(this.state.content);
        // });

        this.props.initstate[name] = changeDate._d;
        const { initstate } = this.props;
        this.props.data(initstate);
    }

    renderFields() {
    //   this.setState({
    //     content: this.props.initstate,
    //   });
      return this.props.fields.map((item, i) => {
        let input; 
        let value = '';
        
        if(item.valFieldID !== undefined && this.props.initstate[item.valFieldID] !== undefined && this.props.initstate[item.valFieldID] !== null){
          value = this.props.initstate[item.valFieldID];
        }

        // if(item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null){
        //     value = this.state.content[item.valFieldID];
        // }
        console.log('value of ' +item.valFieldID+ ' is => ' + this.props.initstate[item.valFieldID]+' final  '+ value);
        // if(value === null || value === 'undefined') {
        //     value = 'NA';
        // }

        switch (item.type) {
          case 'input':
            if(item.required) {
              input = ( <input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} required/> );
            }
            else {
              input = (<input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange}/>)
            }
            break;

        case 'email':
            input = (<input type="email" className="form-control" name={item.valFieldID} onChange={this.handleChange} />);
            break;    

        case 'number':
        let minValue=0;
            if(item.minValue){
                minValue = item.minValue
            }
            input = (<input type="number" min={minValue} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
            break;

        case 'dropdown':
            let req=false;
            if(item.required){
                req = true;
            }
            input = (
                <Dropdown id={item.valFieldID} dropdownDataUrl={item.ddID} nums={this.props.platform} labelName={item.label} finalValue={item.value} dropdownData={this.handleDropdownSelectedData} required={req}/>
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

        <div className="col-md-12 form-fields-gap" key={'elem' + i}>
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
