import React from 'react';
import PropTypes from 'prop-types';

import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';

import './PlatformPopupComponent.scss';

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
            color={'#008000'}
            textValue={'Reaper (**YNO 3X33)'}
            checked={true}
            hasColorBall={this.props.hasBall}
            popupText={'Location: LRE-99 Tail #:**YNO 3X33 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Gray Eagle (**YNO 3X6)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: Ft Drum Tail #:**YNO 3X6 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Guardrail (**YNO 3X11)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: Ft Bliss Tail #:**YNO 3X11 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Reaper (**YNO 3X30)'}
            checked={true}
            hasColorBall={this.props.hasBall}
            popupText={'Location: LRE-99 Tail #:**YNO 3X30 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Reaper (**YNO 3X24)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: LRE-99 Tail #:**YNO 3X24 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Reaper (**YNO 3X27)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: LRE-99 Tail #:**YNO 3X27 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Gray Eagle (**YNO 3X3)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Con Tail #:**YNO 3X3 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Gray Eagle (**YNO 3X7)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: Ft Drum Tail #:**YNO 3X7 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'EMARSS-M (**YNO 3X12)'}
            checked={true}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Eagle Tail #:**YNO 3X12 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'DHC-8 (**YNO 3X23)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Eagle Tail #:**YNO 3X23 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'EMARSS-M (**YNO 3X13)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Eagle Tail #:**YNO 3X13 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Raven (**YNO 3X36)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Axe Tail #:**YNO 3X36 Status: PMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Raven (**YNO 3X34)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF Axe Tail #:**YNO 3X34 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'EMARSS-M (**YNO 3X14)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: Ft Hood Tail #:**YNO 3X14 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Reaper (**YNO 3X26)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: LRE-99 Tail #:**YNO 3X26 Status: FMC'}
          />
          <PlatformPopupItemComponent
            color={'#008000'}
            textValue={'Gray Eagle (**YNO 3X19)'}
            checked={false}
            hasColorBall={this.props.hasBall}
            popupText={'Location: FOB TF-Eagle Tail #:**YNO 3X19 Status: FMC'}
          />
        </div>
      </div>
    );
  }
}

PlatformPopupComponent.propTypes = {
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
};

export default PlatformPopupComponent;
