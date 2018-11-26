import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import CheckBox from '../../../reusable/CheckBox';

import './PlatformPopupItemComponent.scss';

class PlatformPopupItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChangeState = (e) => {
    console.log(e.target);
    if (!e.target.classList.contains('checkbox-default')) {
      e.preventDefault();
      return;
    }
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    const { color, popupText, textValue, hasColorBall } = this.props;
    return (
      <div className="popup-item" onClick={(e)=>this.onChangeState(e)}>
        {
          hasColorBall && <i style={{ background: color }} />
        }
        {textValue}
        <span className="info-icon" data-tip={popupText} />
        <CheckBox
          defaultValue={this.state.checked}
          onChangeState={this.onChangeState}
        />
        <ReactTooltip className={'popup-toggle'} />
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
  popupText: PropTypes.string,
  textValue: PropTypes.string,
};

export default PlatformPopupItemComponent;
