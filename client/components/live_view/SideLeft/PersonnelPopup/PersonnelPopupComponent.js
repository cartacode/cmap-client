import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PlatformPopupItemComponent from '../PlatformPopupItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchPersonnels } from 'actions/personnel';
import './PersonnelPopupComponent.scss';

class PersonnelPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAll: true,
    };
  }

  componentDidMount() {
      this.props.fetchPersonnels();
  }

  onChangeShowAll = (state) => {
    console.log(state);
    if(state) {

    } else {
        (this.props.allPersonnels) ? this.props.allPersonnels.forEach(item => {
            console.log(item.ID);
            this.props.removePin(item.ID);
        }) : null;
    }

    this.setState({
      showAll: state,
    });
  }

  render() {
    const { allPersonnels } = this.props;
    return (
      <div className={'personnel-popup-block popup-block scroll-pane' + ((this.props.popupOpen && this.props.menuClicked) ? ' opened' : '')}>
        <div className="title-block">
          PERSONNEL
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
            { allPersonnels && allPersonnels.map((item, index) => {
                this.props.addPin(Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude),
                                  Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude),
                                  'campsite', null, 'yellow', item.ID);
                
                return <PlatformPopupItemComponent
                color={'#FFFF00'}
                textValue={(item.rank !== 'Unknown' ? (item.rank + ' ') : '') + item.firstName + ' ' + item.lastName}
                checked={true}
                hasColorBall={this.props.hasBall}
                popupText={(item.deployedUnit !== null ? 'Deployed Unit: ' + item.deployedUnit : (item.assignedUnit !== null ? 'Assigned Unit: ' + item.assignedUnit : ''))}
                lat={Number(item.latitude) === 0 ? 38.889931 : Number(item.latitude)}
                long={Number(item.longitude) === 0 ? -77.009003 : Number(item.longitude)}
                uniqueID={item.ID}
                pinColor={'yellow'}
                pinType={'campsite'}
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

PersonnelPopupComponent.propTypes = {
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  menuClicked: PropTypes.bool,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        allPersonnels: state.personnels.allPersonnels,
        isLoading: state.personnels.isFetching,
    };
  };
  
  const mapDispatchToProps = {
    fetchPersonnels,
  };

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelPopupComponent);
