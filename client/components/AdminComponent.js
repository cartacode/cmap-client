import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import PersonnelContainer from '../containers/admin/PersonnelContainer';
import PlatformsContainer from '../containers/admin/PlatformsContainer';
import PayloadsContainer from '../containers/admin/PayloadsContainer';
import MunitionsContainer from '../containers/admin/MunitionsContainer';
import AdminStatusContainer from '../containers/admin/AdminStatusContainer';
import LocationContainer from '../containers/admin/LocationContainer';
import CcirPirContainer from '../containers/admin/CcirPirContainer';
import OrgBuilderContainer from '../containers/admin/OrgBuilderContainer';
import ComNetContainer from '../containers/admin/ComNetContainer';
import SysHealthContainer from '../containers/admin/SysHealthContainer';
import SysConfigContainer from '../containers/admin/SysConfigContainer';

class AdminComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations: {translations}, match} = this.props;

    const menuItems = [
      {title: translations['personnel'], url: `${match.url}/personnel`},
      {title: translations['platforms'], url: `${match.url}/platforms`},
      {title: translations['payloads'], url: `${match.url}/payloads`},
      {title: translations['Munitions'], url: `${match.url}/munitions`},
      {title: translations['status'], url: `${match.url}/admin-status`},
      {title: translations['Location'], url: `${match.url}/location`},
      {title: translations['Ccir/Pir'], url: `${match.url}/ccir-pir`},
      {title: translations['Org builder'], url: `${match.url}/org-builder`},
      {title: translations['Com/Net'], url: `${match.url}/com-net/satcom`},
      {title: translations['Sys. Health'], url: `${match.url}/sys-health`},
      {title: translations['Sys. Config'], url: `${match.url}/sys-config`},
    ];

    return menuItems.map((item, i) => {
      let image = '/assets/img/menu/button-line-highlight.png';
      let matchForLink = false;

      if (item.url.indexOf('/', 8) !== -1) {
        matchForLink = (this.props.routing.location.pathname.indexOf(item.url.substr(0, item.url.indexOf('/', 8))) !== -1);
      } else {
        matchForLink = (this.props.routing.location.pathname.indexOf(item.url) !== -1);
      }

      return (
        <div className="submenu-button" key={i}>
          <NavLink to={item.url} className={`${matchForLink ? 'active-submenu-item' : ''} submenu`}>
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
          <Route path={`${match.url}/personnel`} component={PersonnelContainer} />
          <Route path={`${match.url}/platforms`} component={PlatformsContainer} />
          <Route path={`${match.url}/payloads`} component={PayloadsContainer} />
          <Route path={`${match.url}/munitions`} component={MunitionsContainer} />
          <Route path={`${match.url}/admin-status`} component={AdminStatusContainer} />
          <Route path={`${match.url}/location`} component={LocationContainer} />
          <Route path={`${match.url}/ccir-pir`} component={CcirPirContainer} />
          <Route path={`${match.url}/org-builder`} component={OrgBuilderContainer} />
          <Route path={`${match.url}/com-net`} component={ComNetContainer} />
          <Route path={`${match.url}/sys-health`} component={SysHealthContainer} />
          <Route path={`${match.url}/sys-config`} component={SysConfigContainer} />
        </Switch>
      </div>
    );
  }
}

AdminComponent.propTypes = {
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

export default connect(mapStateToProps)(AdminComponent);
