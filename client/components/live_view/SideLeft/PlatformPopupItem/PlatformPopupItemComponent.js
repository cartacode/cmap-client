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
    if (e.target.classList.contains('checkbox-default')) {
      const newVal = !this.state.checked;
      this.setState({
        checked: newVal,
      });

      if(newVal) {
        this.props.addPin(this.props.lat, this.props.long, this.props.pinType, this.props.pinText, this.props.pinColor, this.props.uniqueID);

        if(this.props.kmlSrc) {
          this.props.addKML(this.props.kmlSrc, this.props.uniqueID);
        }
      } else {
        this.props.removePin(this.props.uniqueID);

        if(this.props.kmlSrc) {
          this.props.removeKML(this.props.uniqueID);
        }
      }
    } else {
      e.preventDefault();

      if(this.props.kmlSrc) {
        this.props.addKML(this.props.kmlSrc, this.props.uniqueID);

        this.setState({
          checked: true,
        });
      } else {
        this.props.moveMap(this.props.lat, this.props.long);
      }

      return;
    }
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
  addKML: PropTypes.func,
  addPin: PropTypes.func,
  checked: PropTypes.bool,
  color: PropTypes.string,
  hasColorBall: PropTypes.bool,
  kmlSrc: PropTypes.string,
  lat: PropTypes.number,
  long: PropTypes.number,
  moveMap: PropTypes.func,
  pinColor: PropTypes.string,
  pinText: PropTypes.string,
  pinType: PropTypes.string,
  popupText: PropTypes.string,
  removeKML: PropTypes.func,
  removePin: PropTypes.func,
  textValue: PropTypes.string,
  uniqueID: PropTypes.string,
};

export default PlatformPopupItemComponent;
