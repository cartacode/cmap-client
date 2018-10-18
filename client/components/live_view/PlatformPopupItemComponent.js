import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../reusable/CheckBox';

class PlatformPopupItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChangeState = (e) => {
    if (e.target.tagName.toUpperCase() === 'SPAN') {
      e.preventDefault();
      return;
    }
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    const { color, textValue, hasColorBall } = this.props;
    return (
      <div className="popup-item" onClick={(e)=>this.onChangeState(e)}>
        {
          hasColorBall && <i style={{ background: color }} />
        }
        {textValue}
        <span className="info-icon" />
        <CheckBox
          defaultValue={this.state.checked}
          onChangeState={this.onChangeState}
        />
      </div>
    );
  }
}

PlatformPopupItemComponent.defaultProps = {
  hasColorBall: true,
};

PlatformPopupItemComponent.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  hasColorBall: PropTypes.bool,
  textValue: PropTypes.string,
};

export default PlatformPopupItemComponent;
