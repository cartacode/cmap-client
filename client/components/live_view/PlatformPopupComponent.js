import React from 'react';
import PropTypes from 'prop-types';

import SelectBox from '../reusable/SelectBox';
import PlatformPopupItemComponent from './PlatformPopupItemComponent';
import CheckBox from '../reusable/CheckBox';

class PlatformPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  onChangeShowAll = (state) => {
    this.setState({
      showAll: state,
    })
  }

  render() {
    return (
      <div className={'platforms-popup-block popup-block scroll-pane' + (this.props.popupOpen ? ' opened' : '')}>
        <div className="title-block">
          PLATFORMS
          <div
            className="btn-close"
            onClick={() => this.props.onPopup(false)}
          />
        </div>

        <div className="selectmenu-block">
          {/*
          <SelectBox
            options={[
              { value: 'by Mission', label: 'by Mission' },
              { value: 'by Type', label: 'by Type' },
              { value: 'by Payload', label: 'by Payload' },
              { value: 'by AD', label: 'by AD' }
            ]}
          />
          */}
          {
            this.props.hasToggle &&
              <div className="d-flex justify-content-center">
                <span className="mr-4">Show All</span>
                <CheckBox
                  defaultValue={this.state.showAll}
                  onChangeState={this.onChangeShowAll}
                />
              </div>
          }
        </div>

        <div className="checklist-block">

          <PlatformPopupItemComponent
            color={'#FFAC00'}
            textValue={'Vehicles'}
            checked={true}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#16DCFF'}
            textValue={'Satellite'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#D100FF'}
            textValue={'Fighter'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#A78BFF'}
            textValue={'Ships'}
            checked={true}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#C65D92'}
            textValue={'Vehicles'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#C7FF00'}
            textValue={'Aircraft'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#0091FF'}
            textValue={'Ships'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#00FFE3'}
            textValue={'Submarines'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#FFFEBE'}
            textValue={'Rockets'}
            checked={true}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#FFFFFF'}
            textValue={'Aircraft'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#FFC598'}
            textValue={'Fighter'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#95BDD9'}
            textValue={'Ships'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#4A8C5C'}
            textValue={'Satellite'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#A77168'}
            textValue={'Aircraft'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#962D1B'}
            textValue={'Rockets'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
          <PlatformPopupItemComponent
            color={'#4C63AA'}
            textValue={'Submarines'}
            checked={false}
            hasColorBall={this.props.hasBall}
          />
        </div>
      </div>
    );
  }
}

PlatformPopupComponent.propTypes = {
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.hasToggle,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
};

export default PlatformPopupComponent;
