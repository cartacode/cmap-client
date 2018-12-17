import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLocationTypes } from '../../../../actions/location';
import SelectBox from '../../../reusable/SelectBox';
import './KmlPopupAddKmlComponent.scss';

class KmlPopupAddKmlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchLocationTypes();
  }

  getFilterOptions = (data) => {
    if(data) {
      const arrItems = data.map((item) => {
        return { value: item.id, label: item.description };
      });

      arrItems.push({ value: -1, label: 'Map Drawings' });
      return arrItems;
    } else {
      return [];
    }
  }

  render() {
    const { locationTypes } = this.props;

    return (
      <div className={'kml-popup-block-add-kml'}>
        <div className={'p-3'} style={{background: '#022033'}}>
          <div className={'d-flex align-items-center'}>
            <div className={'w-75px'}>Name:</div>
            <div className={'flex-fill mr-1'}>
              <input className={'w-100'} type={'text'} />
            </div>
          </div>
          <div className={'d-flex align-items-center mt-2'}>
            <div className={'w-75px'}>Category:</div>
            <div className="selectmenu-block flex-fill mr-1 mt-0 w-100 pr-0 pl-3">
              {
                <SelectBox
                  options={ this.getFilterOptions(locationTypes) }
                />
              }
            </div>
          </div>
          <div className={'d-flex flex-column mt-0'}>
            <div>Description:</div>
            <div className={'mt-2'}>
              <textarea className={'form-control'} rows={3} />
            </div>
          </div>

          <div className={'d-flex mt-5'}>
            <div className={'w-75 mr-3 flex-column'}>
              <a className="live-highlighted-button btn w-75px" onClick={()=>{}}>
                {'Add KML'}
              </a>
            </div>
            <div className={'d-flex flex-column flex-1 justify-content-between align-items-center'}>
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

const mapStateToProps = state => {
  return {
    locationTypes: state.locations.locationTypes,
    isTypesFetching: state.locations.isTypesFetching,
  };
};

const mapDispatchToProps = {
  fetchLocationTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(KmlPopupAddKmlComponent);
