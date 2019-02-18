import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.setChangedData(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.props.options}
        />
      </div>
    );
  }
}

SelectBox.propTypes = {
  options: PropTypes.array,
  setChangedData: PropTypes.func,
};

export default SelectBox;
