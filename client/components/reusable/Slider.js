import React from 'react';
import PropTypes from 'prop-types';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class LvSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderPercent: props.value ? props.value : 50,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        sliderPercent: nextProps.value,
      });
    }
  }

  onChangePercent = (changeUnit) => {
    const max = this.props.max ? this.props.max : 100;
    const min = this.props.min ? this.props.min : 100;
    this.setState({
      sliderPercent: this.state.sliderPercent + changeUnit,
    }, () => {
      if(this.state.sliderPercent > max) {
        this.setState({
          sliderPercent: max,
        });
      }
      if(this.state.sliderPercent < min) {
        this.setState({
          sliderPercent: min,
        });
      }
    });
  }

  onChangePercentByValue = (v) => {
    this.setState({
      sliderPercent: v,
    });
  }

  render() {

    return (
      <div className="slider-range-block">
        {
          (this.props.hideValue !== true) && (
            <p>
              <input type="text" className="amount" readOnly={true}
                value={this.state.sliderPercent + (this.props.suffix ? this.props.suffix : '')}
              />
            </p>
          )
        }
        <div className="slider-range-min fuse_opacity ui-slider-horizontal" id="fuse_capacity">
          <Slider
            value={this.state.sliderPercent}
            onChange={this.onChangePercentByValue}
            min={this.props.min ? this.props.min : 0}
          />
        </div>
        <div className="btn-plus fuse_opacity" onClick={() => this.onChangePercent(1)} />
        <div className="btn-minus fuse_opacity" onClick={() => this.onChangePercent(-1)} />
      </div>
    );
  }
}

LvSlider.propTypes = {
  hideValue: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  suffix: PropTypes.string,
  value: PropTypes.number,
};

export default LvSlider;
