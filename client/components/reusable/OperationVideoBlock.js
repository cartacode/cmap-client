import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {getTranslations} from '../../actions/actions';
import {connect} from 'react-redux';


class OperationVideoBlock extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const {translations: {translations}} = this.props;

    let borderBottom, progressbar, width, video;

      switch(this.props.blockHeader) {
        case translations['blue devil']:
          borderBottom = '2px solid #09a3c3';
          width = this.props.percent;
          progressbar = '/assets/img/dashboard/blue_progressbar.png';
          video = '/assets/img/dashboard/video1.png';
          break;

        case translations['valient angel']:
          borderBottom = '2px solid #ff00ff';
          width = this.props.percent;
          progressbar = "/assets/img/dashboard/pink_progressbar.png";
          video = '/assets/img/dashboard/video2.png';
          break;

        case translations['rolling thunder']:
          borderBottom = '2px solid #ff0000';
          width = this.props.percent;
          progressbar = '/assets/img/dashboard/red_progressbar.png';
          video = "/assets/img/dashboard/video3.png";
          break;

        case translations['she devil']:
          borderBottom = '2px solid #00a651';
          width = this.props.percent;
          progressbar = "/assets/img/dashboard/green_progressbar.png";
          video = "/assets/img/dashboard/video3.png";
          break;
      }

    return (
      <div className="col-md-3 map-block">
        <div className="map-image">
          <div className="select-bar col-md-12">
            <div className="col-md-10 label-text">
              <span style={{borderBottom}}>{this.props.blockHeader}</span>
            </div>
            <div className="col-md-2">
              <img src="/assets/img/dashboard/minimize_button.png" className="button-img" alt="" />
              <img src="/assets/img/dashboard/expand_button.png" className="button-img" alt="" />
            </div>
          </div>
          <div className="col-md-12 time-bar">
            <div className="col-md-8">
              {translations["mission progress"]} 
            </div>
            <div className="col-md-4">
              RTB {this.props.remainTime}
            </div>
          </div>
          <div className="col-md-12">
            <div className="progress-bar">
              <img src={progressbar} alt="" style={{width}} />
            </div>
          </div>
          <img src={video} className="video" alt=""/>  
        </div>
      </div>
    );
  }
}

OperationVideoBlock.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OperationVideoBlock);
