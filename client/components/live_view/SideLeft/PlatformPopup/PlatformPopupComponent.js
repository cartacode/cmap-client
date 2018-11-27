import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchPlatformInventory } from 'actions/platforminventory';
import './PlatformPopupComponent.scss';

class PlatformPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: true,
    };
  }

  componentDidMount() {
    this.props.fetchPlatformInventory();
  }

  onChangeShowAll = (state) => {
    this.setState({
      showAll: state,
    });
  }

  render() {
    const { allPlatformInventory } = this.props;

    return (
      <div className={'platforms-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
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
          { allPlatformInventory && allPlatformInventory.map((item, index) => {
             this.props.addPin(Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude),
                               Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude),
                               'airport', 'green', item.id);

             return <PlatformPopupItemComponent
              color={'#008000'}
              textValue={item.name}
              checked={true}
              hasColorBall={this.props.hasBall}
              popupText={'Location: ' + item.location + ' Tail #: ' + item.tailNbr + ' Status: ' + item.StatusAbbrev}
              lat={Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude)}
              long={Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude)}
              uniqueID={item.id}
              pinColor={'green'}
              pinType={'airport'}
              moveMap={this.props.moveMap}
              addPin={this.props.addPin}
              removePin={this.props.removePin}
              key={index}
            />;
          }) }
        </div>
      </div>
    );
  }
}

PlatformPopupComponent.propTypes = {
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  menuClicked: PropTypes.bool,
  moveMap: PropTypes.func,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    allPlatformInventory: state.platforminventory.allPlatformInventory,
    isLoading: state.platforminventory.isFetching,
  };
};

const mapDispatchToProps = {
  fetchPlatformInventory,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformPopupComponent);
