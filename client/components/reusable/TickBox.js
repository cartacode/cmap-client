import React from 'react';
import PropTypes from 'prop-types';

class TickBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.isChecked ? props.isChecked : false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     selected: nextProps.isChecked,
  //   });
  // }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      selected: !this.state.selected,
    }, ()=>{
      // called  when state of checkbox is changed
      if (typeof this.props.onStateChange === 'function') {
        this.props.onStateChange(this.state.selected, e.target.value);
      }
      // called  when checkbox is checked
      if (this.state.selected && typeof this.props.onChecked === 'function') {
        this.props.onChecked(value);
      }
      // called  when checkbox is unchecked
      if (!this.state.selected && typeof this.props.onUnchecked === 'function') {
        this.props.onUnchecked(value);
      }
    });
  }

  render() {
    const { selected } = this.state;

    return (
      <div>
        <input type="checkbox" id={this.props.id} name={this.props.name} onChange={this.handleChange} value={this.props.value} checked={selected}/>
        <label htmlFor={this.props.id}><span /></label>
      </div>
    );
  }
}

TickBox.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.any,
  name: PropTypes.string,
  onChecked: PropTypes.func,
  onStateChange: PropTypes.func,
  onUnchecked: PropTypes.func,
  value: PropTypes.any,
};

export default TickBox;
