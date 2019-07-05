import React from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

class Selectable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <CreatableSelect
        isSearchable={true}
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        onCreateOption={this.handleCreateOption}
      />
    );
  }
}

Selectable.propTypes = {
  disabled: PropTypes.bool,
  dropdownData: PropTypes.func,
  id: PropTypes.string,
  initValue: PropTypes.any,
  multiSelect: PropTypes.string,
  required: PropTypes.bool,
};

export default Selectable;
