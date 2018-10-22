import React from 'react';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

import LvSlider from '../../../reusable/Slider';
import SelectBox from '../../../reusable/SelectBox';
import Counter from '../../../reusable/Counter';
import './DrawingPopupAddMarkerComponent.scss';

class DrawingPopupAddMarkerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fusePopupOpen: false,
      sliderPercent: 50,
    };
  }

  render() {
    return (
      <div className={'drawing-popup-block-add-marker' + (this.props.showOpen ? ' opened' : '')}>
        <div className={'m-2 border-bottom-1'}>Add Marker</div>
        <div className={'p-3'} style={{background: '#022033'}}>

          <div className={'d-flex align-items-center'}>
            <div className={'w-75px'}>Name:</div>
            <div className={'flex-fill mr-1'}>
              <input className={'w-100'} type={'text'} />
            </div>
            <div>P</div>
          </div>

          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-75px'}>Lat:</div>
            <div className={'flex-1 mr-3'}>
              <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                {'Populate on click'}
              </a>
            </div>

            <div className={'w-75px'}>MGRS:</div>
            <div className={'flex-1'}>
              <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                {'Populate on click'}
              </a>
            </div>
          </div>

          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-75px'}>Lat:</div>
            <div className={'flex-1 mr-3'}>
              <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                {'Populate on click'}
              </a>
            </div>

            <div className={'w-75px'}>MGRS:</div>
            <div className={'d-flex flex-1'}>
              <a className="live-highlighted-button btn fs-11" onClick={()=>{}}>
                {'Pop on click'}
              </a>

              <div className={'flex-1 ml-1 fs-11'}>
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

          <div className={'d-flex flex-column mt-2'}>
            <div>Description:</div>
            <div className={'mt-2'}>
              <textarea className={'form-control'} rows={3} />
            </div>
          </div>

          <div className={'d-flex mt-5'}>
            <div className={'w-75 mr-3 flex-column'}>
              <div>
                <div className={'fs-13 border-bottom-1'}>Label</div>
                <div className={'d-flex mt-3'}>
                  <div className={'mr-2'}>Color:</div>
                  <div className={'mr-3'}><ColorPicker color={'#F10'} /></div>
                  <div className={'mr-2'}>Scale:</div>
                  <div className={'mr-3'}><Counter defaultValue={5}/></div>
                  <div className={'mr-4 pr-2'}>Opacity:</div>
                  <div>
                    <LvSlider
                      value={this.state.sliderPercent}
                      min={1}
                      max={100}
                      suffix={'%'}
                    />
                  </div>
                </div>
              </div>

              <div className={'mt-4'}>
                <div className={'fs-13 border-bottom-1'}>Icon</div>
                <div className={'d-flex mt-3'}>
                  <div className={'mr-2'}>Color:</div>
                  <div className={'mr-3'}><ColorPicker color={'#F10'} /></div>
                  <div className={'mr-2'}>Scale:</div>
                  <div className={'mr-3'}><Counter defaultValue={5}/></div>
                  <div className={'mr-4 pr-2'}>Opacity:</div>
                  <div>
                    <LvSlider
                      value={this.state.sliderPercent}
                      min={1}
                      max={100}
                      suffix={'%'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'d-flex flex-column flex-1 justify-content-between align-items-center mt-4 pt-2'}>
              <div className={'mb-2 w-75'}>
                <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                  {'Add Image'}
                </a>
              </div>
              <div className={'mb-2 w-75'}>
                <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                  {'Add Doc'}
                </a>
              </div>
              <div className={'mb-2 w-75'}>
                <a className="live-highlighted-button btn w-100" onClick={()=>{}}>
                  {'Add Link'}
                </a>
              </div>
            </div>
          </div>

          <div className="buttons-control buttons-block mt-5 text-right">
            <button className="btn-save">Ok</button>
            <button className="btn-clear">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

DrawingPopupAddMarkerComponent.propTypes = {
  showOpen: PropTypes.bool,
  onPopup: PropTypes.func,
};

export default DrawingPopupAddMarkerComponent;
