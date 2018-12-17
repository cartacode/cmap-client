import React from 'react';
import PropTypes from 'prop-types';

import SelectBox from '../../../reusable/SelectBox';
import './RulerPopupAddLineComponent.scss';

class RulerPopupAddLineComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={'ruler-popup-block-add-line' + (this.props.showOpen ? ' opened' : '')}>
        <div className={'m-2 border-bottom-1'}>Line</div>
        <div className={'p-3'} style={{background: '#022033'}}>
          <div>Measure the distance between two points on the ground</div>

          <div className={'d-flex mt-5 align-items-center'}>
            <div className={'w-100px text-right'}>Map Length:</div>
            <div className={'d-flex flex-1'}>
              <div className={'d-flex flex-1 align-items-center justify-content-end'}>
                1,364.41
              </div>
              <div className={'w-100px ml-4'}>
                <SelectBox
                  options={[
                    { value: '0', label: 'm' },
                    { value: '1', label: 'km' },
                    { value: '2', label: 'yd' },
                    { value: '3', label: 'mi' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-100px text-right'}>Ground Length:</div>
            <div className={'d-flex flex-1 align-items-center'}>
              <div className={'d-flex flex-1 justify-content-end'}>
                1,364.41
              </div>
              <div className={'w-100px ml-4'} />
            </div>
          </div>

          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-100px text-right'}>Heading:</div>
            <div className={'d-flex flex-1'}>
              <div className={'d-flex flex-1 align-items-center justify-content-center'}>
                79.60 degrees
              </div>
            </div>
          </div>

          <div className="buttons-control buttons-block mt-5 d-flex justify-content-around align-items-center">
            <div className={'d-flex'}>
              <div>
                <input type="checkbox" id={'checkbox-mouse-navigatoin'} name={'checkbox-navigatoin'}/>
                <label htmlFor={'checkbox-mouse-navigatoin'}><span /></label>
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

RulerPopupAddLineComponent.propTypes = {
  showOpen: PropTypes.bool,
};

export default RulerPopupAddLineComponent;
