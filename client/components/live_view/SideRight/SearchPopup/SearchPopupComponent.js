import React from 'react';
import PropTypes from 'prop-types';
import { MapTypes } from 'dictionary/constants';
import LvSlider from '../../../reusable/Slider';

import './SearchPopupComponent.scss';

class SearchPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flyToSelect: false, // used to select b/w local(true)-internet(false) geocoder
    };
  }

  onClickFlyTo = (flyto, e) => {
    e.preventDefault();
    if (flyto === MapTypes.LOCAL)
      this.setState({ flyToSelect: true });
    else if (flyto === MapTypes.INTERNET)
      this.setState({ flyToSelect: false });
  }

  componentDidMount() {
    this.props.setContainer('default-fly-to');
  };

  render() {
    const { flyToSelect } = this.state;
    return (
      <div className={'search-popup-block right-popup-block' + (this.props.searchPopupOpen ? ' opened' : '')}>
        <div className="title-block">
          Search
          <div className="btn-control clearfix">
            <div className="btn-curtail" />
            <div className="btn-expand" />
            <div
              className="btn-close"
              onClick={() => this.props.onPopup(false, 'searchPopupOpen')}
            />
          </div>
        </div>

        <div className='show-fly-to clearfix'>
          <ul>
            <li><a href="#" className={(flyToSelect ? 'active' : '')} onClick={(e) => this.onClickFlyTo(MapTypes.LOCAL, e)}>LOCAL</a></li>
            <li><a href="#" className={(flyToSelect ? '' : 'active')} onClick={(e) => this.onClickFlyTo(MapTypes.INTERNET, e)}>INTERNET</a></li>
          </ul>
        </div>
        <hr />

        <div className="fly-to-link">
          <p>Fly To...</p>
          <div className={(flyToSelect ? 'open' : '')}>TODO: geoserver geocoder</div>
          <div className={(flyToSelect ? '' : 'open')} id="default-fly-to">
            {/*<input id="search_address" type="text" placeholder="Search" />
            <button />*/}
          </div>
        </div>
      </div>
    );
  }
}

SearchPopupComponent.propTypes = {
  onPopup: PropTypes.func,
  searchPopupOpen: PropTypes.bool,
};

export default SearchPopupComponent;
