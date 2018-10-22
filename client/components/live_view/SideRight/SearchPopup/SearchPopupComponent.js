import React from 'react';
import PropTypes from 'prop-types';

import LvSlider from '../../../reusable/Slider';

import './SearchPopupComponent.scss';

class SearchPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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

        <div className="fly-to-link">
          <p>Fly To...</p>
          <div className="search">
            <input id="search_address" type="text" placeholder="Search" />
            <button />
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
