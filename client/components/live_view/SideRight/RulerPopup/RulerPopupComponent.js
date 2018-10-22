import React from 'react';
import PropTypes from 'prop-types';

import RulerPopupAddLineComponent from '../RulerPopupAddLine';
import RulerPopupAddPathComponent from '../RulerPopupAddPath';

import './RulerPopupComponent.scss';

class RulerPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addPopOpens: [
        false, // addLineOpen
        false, // addPathOpen
      ],
    };
  }

  preventEvent = (e) => {
    e.preventDefault();
  }

  onShowAddPanel = (addStateIndex, event) => {
    this.preventEvent(event);
    this.setState({
      addPopOpens: this.state.addPopOpens.map((item, i) => {
        if (i === addStateIndex) {
          return true;
        }
        return false;
      }),
    });
  }

  render() {
    const { addPopOpens } = this.state;
    return (
      <div className={'ruler-popup-block right-popup-block' + (this.props.rulerPopupOpen ? ' opened' : '')}>
        <div className="scroll-pane">
          <div className="title-block">
            Ruler
            <div className="btn-control clearfix">
              <div className="btn-curtail" />
              <div className="btn-expand" />
              <div
                className="btn-close"
                onClick={() => this.props.onPopup(false, 'rulerPopupOpen')}
              />
            </div>
          </div>

          <div className="primary-tools-menu">
            <div className="figures-block primary-list-block clearfix">
              <div className={'line-link' + (addPopOpens[0] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(0, e)}>Line</a>
              </div>
              <div className={'path-link' + (addPopOpens[1] ? ' active' : '')}>
                <a href="#" onClick={(e) => this.onShowAddPanel(1, e)}>Path</a>
              </div>
            </div>
          </div>

          <div>
            <RulerPopupAddLineComponent
              showOpen={addPopOpens[0]}
            />
            <RulerPopupAddPathComponent
              showOpen={addPopOpens[1]}
            />
          </div>
        </div>
      </div>
    );
  }
}

RulerPopupComponent.propTypes = {
  onPopup: PropTypes.func,
  rulerPopupOpen: PropTypes.bool,
};

export default RulerPopupComponent;
