import React from 'react';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

import LvSlider from '../../../reusable/Slider';
import SelectBox from '../../../reusable/SelectBox';
import Counter from '../../../reusable/Counter';
import './DrawingPopupAddPathComponent.scss';

class DrawingPopupAddPathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fusePopupOpen: false,
      sliderPercent: 50,
    };
  }

  render() {
    return (
      <div className={'drawing-popup-block-add-path' + (this.props.showOpen ? ' opened' : '')}>
        <div className={'m-2 border-bottom-1'}>Add Path</div>
        <div className={'p-3'} style={{background: '#022033'}}>

          <div className={'d-flex align-items-center'}>
            <div className={'w-75px'}>Name:</div>
            <div className={'flex-fill mr-1'}>
              <input className={'w-100'} type={'text'} />
            </div>
          </div>

          <div className={'d-flex mt-2'}>
            <div className={'d-flex flex-column'}>

              <div className={'d-flex align-items-center'}>
                <div className={'w-75px'}>Perim:</div>
                <div className={'d-flex flex-1'}>
                  <a className="live-highlighted-button btn fs-11" onClick={()=>{}}>
                    {'Pop on click'}
                  </a>

                  <div className={'w-75px ml-1 fs-11'}>
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
              <div className={'d-flex align-items-center mt-2'}>
                <div className={'w-75px'}>Area:</div>
                <div className={'d-flex flex-1'}>
                  <a className="live-highlighted-button btn fs-11" onClick={()=>{}}>
                    {'Pop on click'}
                  </a>

                  <div className={'w-75px ml-1 fs-11'}>
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

            </div>

            <div className={'ml-2'}>
              <div className={'d-flex align-items-center'}>
                <div className={'w-75px'}>Altitude:</div>
                <div className={'d-flex flex-1 mr-2'}><input type="text" className={'w-100'} /></div>
                <div className={'w-75px'}>
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

              <div className={'d-flex align-items-center mt-2'}>
                <div className={'w-50px'} />
                <div className={'fs-11 mr-4'}>Ground</div>
                <div>
                  <LvSlider
                    value={this.state.sliderPercent}
                    min={1}
                    max={100}
                    suffix={'%'}
                    hideValue={true}
                  />
                </div>
                <div className={'fs-11 ml-4'}>Space</div>
              </div>

              <div className={'d-flex align-items-center mt-3'}>
                <div className={'w-50px'} />
                <div>
                  <input type="checkbox" id={'checkbox-extends-ground'} name={'checkbox-extends-ground'}/>
                  <label htmlFor={'checkbox-extends-ground'}><span /></label>
                </div>
                <div className={'check-label fs-13'}>
                  Extend sides to ground
                </div>
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
                <div className={'fs-13 border-bottom-1'}>Lines</div>
                <div className={'d-flex mt-3'}>
                  <div className={'mr-2'}>Color:</div>
                  <div className={'mr-3'}><ColorPicker color={'#F10'} /></div>
                  <div className={'mr-2'}>Width:</div>
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

DrawingPopupAddPathComponent.propTypes = {
  showOpen: PropTypes.bool,
  onPopup: PropTypes.func,
};

export default DrawingPopupAddPathComponent;
