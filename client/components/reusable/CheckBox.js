import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultValue ? props.defaultValue : false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.defaultValue,
    })

  }

  handleChange = () => {
    this.setState({
      selected: !this.state.selected,
    }, ()=>{
      if (this.props.onChangeState) {
        // this.props.onChangeState(this.state.selected);
      }
    });
  }

  render() {
    const { selected } = this.state;

    return (
      <div
        className={`checkbox-default ${selected ? 'checkbox-selected' : ''}`}
        onClick={() => this.handleChange()}
      />
    );
  }
}

CheckBox.propTypes = {
  defaultValue: PropTypes.bool,
  onChangeState: PropTypes.func,
};

export default CheckBox;
