import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ? props.defaultValue : 0,
      step: props.defaultValue ? props.defaultValue : 0,
      min: props.min ? props.min : 0,
      max: props.max ? props.max : 99999,
    };
  }

  render() {
    return (
      <div className="live-counter d-flex align-items-center">
        <div className="prev action-next" />
        <input type="text" value = {this.state.value} onChange={()=>{}} />
        <div className="next action-prev" />
      </div>
    );
  }
}

Counter.propTypes = {
  defaultValue: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default Counter;
