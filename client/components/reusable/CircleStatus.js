import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {getTranslations} from '../../actions/actions';
import {connect} from 'react-redux';

class CircleStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {
    let background;
    const {translations: {translations}} = this.props;

      switch(this.props.statusHeader) {
        case translations['platform']:
          background= 'url(/images/status/platform_status.png) no-repeat center';
          break;

        case translations['payload']:
          background= 'url(/images/status/payload_status.png) no-repeat center';
          break;

        case translations['flight crew']:
          background= 'url(/images/status/fcrew_status.png) no-repeat center';
          break;

        case translations['line crew']:
          background= 'url(/images/status/lcrew_status.png) no-repeat center';
          break;

        case translations['ped crew']:
          background= 'url(/images/status/pcrew_status.png) no-repeat center';
          break;
      }

    return (
      <div className="each-status">
        <div className="status-header" style={{fontSize:28}}>{this.props.statusHeader}</div>
        <div className="status-image status-percent" style={{background}}>{this.props.statusPercent}</div>
        <div className="status-number">{this.props.statusNumber}</div>
      </div>
    );
  }
}

CircleStatus.propTypes = {
  children: PropTypes.element,

};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CircleStatus);

