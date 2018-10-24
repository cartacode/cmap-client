import React from 'react';
import PropTypes from 'prop-types';

import SelectBox from '../../../reusable/SelectBox';
import './RulerPopupAddPathComponent.scss';

class RulerPopupAddPathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={'ruler-popup-block-add-path' + (this.props.showOpen ? ' opened' : '')}>
        <div className={'m-2 border-bottom-1'}>Path</div>
        <div className={'p-3'} style={{background: '#022033'}}>
          <div>Measure the distance between multiple points on the ground</div>

          <div className={'d-flex mt-5 align-items-center'}>
            <div className={'w-100px text-right'}>Length:</div>
            <div className={'d-flex flex-1'}>
              <div className={'d-flex flex-1 align-items-center justify-content-end'}>
                1,364.41
              </div>
              <div className={'w-100px ml-4'}>
                <SelectBox
                  options={[
                    { value: '0', label: 'Unit1' },
                    { value: '1', label: 'Unit2' },
                    { value: '2', label: 'Unit3' },
                    { value: '3', label: 'Unit4' }
                  ]}
                />
              </div>
            </div>
          </div>

          <div className={'d-flex mt-5'}>
            <div className={'w-100px text-right'} />
            <div>
              <input type="checkbox" id={'checkbox-show-elevation'} name={'checkbox-show-elevation'}/>
              <label htmlFor={'checkbox-show-elevation'}><span /></label>
            </div>
            <div>
              Show Elevation Profile
            </div>
          </div>
          <div className="buttons-control buttons-block mt-5 d-flex justify-content-around align-items-center">
            <div className={'d-flex'}>
              <div>
                <input type="checkbox" id={'checkbox-mouse-navigatoin-2'} name={'checkbox-navigatoin-2'}/>
                <label htmlFor={'checkbox-mouse-navigatoin-2'}><span /></label>
              </div>
              <div>
                Mouse Navigation
              </div>
            </div>

            <div className={'d-flex'}>
              <button className="btn-save">Save</button>
              <button className="btn-clear">Clear</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RulerPopupAddPathComponent.propTypes = {
  showOpen: PropTypes.bool,
};

export default RulerPopupAddPathComponent;
