import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import IsrSyncContainer from '../containers/mission_mgt/IsrSyncContainer';
import AtoContainer from '../containers/mission_mgt/AtoContainer';
import PedTaskingContainer from '../containers/mission_mgt/PedTaskingContainer';
import MissionDetailContainer from '../containers/mission_mgt/MissionDetailContainer';

import {getTranslations} from '../actions/actions';

class MissionMGTComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations: {translations}, match} = this.props;

    const menuItems = [
      {title: translations['isr sync'], url: `${match.url}/isr-sync`},
      {title: translations['ato'], url: `${match.url}/ato`},
      {title: translations['ped tasking'], url: `${match.url}/ped-tasking`},
      {title: translations['mission detail'], url: `${match.url}/mission-detail`},
    ];

    return menuItems.map((item, i) => {
      let image = '/images/menu/button-line-highlight.png';
      let matchForLink = (this.props.routing.location.pathname.indexOf(item.url) !== -1);

      return (
        <div className="submenu-button" key={i}>
          <NavLink to={item.url} className="submenu" activeClassName="active-submenu-item">
            {item.title}
            {matchForLink ?
              (
                <div className="under-button-line">
                  <img src={image} className="under-button-image pull-right" alt=""/>
                </div>
              ):
              null}
          </NavLink>
        </div>
      );
    });
  }

  render() {
    const {translations: {translations}, match} = this.props;

    return (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/isr-sync`} component={IsrSyncContainer} />
          <Route path={`${match.url}/ato`} component={AtoContainer} />
          <Route path={`${match.url}/ped-tasking`} component={PedTaskingContainer} />
          <Route path={`${match.url}/mission-detail`} component={MissionDetailContainer} />
        </Switch>
      </div>
    );
  }
}

MissionMGTComponent.propTypes = {
  children: PropTypes.element,
  routing: PropTypes.object,
  translations: PropTypes.object
};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionMGTComponent);