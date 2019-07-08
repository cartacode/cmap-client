import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import PersonnelContainer from '../containers/admin/PersonnelContainer';
import PlatformsContainer from '../containers/admin/PlatformsContainer';
import PlatformsSpecificationContainer from '../containers/admin/PlatformsSpecificationContainer';
import PayloadsContainer from '../containers/admin/PayloadsContainer';
import PayloadsSpecificationContainer from '../containers/admin/PayloadsSpecificationContainer';
import MunitionsContainer from '../containers/admin/MunitionsContainer';
import MunitionsSpecificationContainer from '../containers/admin/MunitionsSpecificationContainer';
import AdminStatusContainer from '../containers/admin/AdminStatusContainer';
import ReportsContainer from '../containers/admin/ReportsContainer';
import LocationContainer from '../containers/admin/LocationContainer';
import CcirPirContainer from '../containers/admin/CcirPirContainer';
import OrgBuilderContainer from '../containers/admin/OrgBuilderContainer';
import ComNetContainer from '../containers/admin/ComNetContainer';
import SysHealthContainer from '../containers/admin/SysHealthContainer';
import SysConfigContainer from '../containers/admin/SysConfigContainer';
import ReferenceDocsContainer from '../containers/admin/ReferenceDocsContainer';
import SubMenu from './reusable/SubMenu';
import { adminUser, sysDocsUser, adminTabUser, intelCustomer } from '../dictionary/auth';
import CcirContainer from '../containers/admin/CcirContainer';
import PedTeamContainer from '../containers/admin/PedTeamContainer';
import OpordContainer from '../containers/admin/OpordContainer';
import AirCrewContainer from '../containers/admin/AirCrewContainer';
import EquipmentContainer from '../containers/admin/EquipmentContainer';
import OperationsContainer from '../containers/admin/OperationsContainer';
import PirContainer from '../containers/admin/PirContainer';


class AdminComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      key:-1
    };
  }

  handleHover = (i) => {
    this.setState({ key: i});
  };

  handleLeave = () => {
    this.setState({ key:-1 });
  };

  renderMenuItems() {

    const {translations, match} = this.props;

    const subMenuNames = [translations['inventory'],translations['Specifications']];

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let sysDocsAccess = roles2.some(v => sysDocsUser.includes(v));
    let locationAccess = roles2.some(v => intelCustomer.includes(v));


    // const menuItems = [
    //   {title: translations['personnel'], url: `${match.url}/personnel` },
    //   {title: translations['platforms'], url: `${match.url}/platforms`,submenu:true, },
    //   {title: translations['payloads'], url: `${match.url}/payloads`,submenu:true},
    //   {title: translations['Munitions'], url: `${match.url}/munitions`,submenu:true},
    //   {title: translations['Location'], url: `${match.url}/location`},
    //   {title: translations['status'], url: `${match.url}/admin-status`},
    //   {title: translations['Ccir/Pir'], url: `${match.url}/ccir-pir`},
    //   {title: translations['Org builder'], url: `${match.url}/org-builder`},
    //   // {title: translations['Com/Net'], url: `${match.url}/com-net/satcom`},
    //   // {title: translations['Sys. Health'], url: `${match.url}/sys-health`},
    //   // {title: 'Reference Docs', url: `${match.url}/sys-config`},
    // ];

    let menuItems = [];

    if(sysDocsAccess) {
      menuItems.push({title: 'Reference Docs', url: `${match.url}/sys-config`});
    }
    if(locationAccess) {
      menuItems.push({title: translations['Location'], url: `${match.url}/location`});
    }

    else {
      menuItems = [
      {title: translations['ccir'], url: `${match.url}/ccir`},
      {title: translations['OPORD'], url: `${match.url}/opord`},

      {title: translations['personnel'], url: `${match.url}/personnel` },
      {title: translations['platforms'], url: `${match.url}/platforms`,submenu:true, },
      {title: translations['payloads'], url: `${match.url}/payloads`,submenu:true},
      {title: translations['Munitions'], url: `${match.url}/munitions`,submenu:true},
      {title: translations['Location'], url: `${match.url}/location`},
      {title: translations['PedTeam'], url: `${match.url}/pedteam`},
      {title: translations['AirCrew'], url: `${match.url}/aircrew`},
      {title: translations['equip'], url: `${match.url}/equipment`},
      {title: translations['Ops'], url: `${match.url}/operations`},
      {title: translations['pir'], url: `${match.url}/pir`},

      //{title: translations['status'], url: `${match.url}/admin-status`},
      {title: translations['reports'], url: `${match.url}/reports`},
      //{title: translations['Ccir/Pir'], url: `${match.url}/ccir-pir`},
      //{title: translations['Chain of Command'], url: `${match.url}/org-builder`},
      // {title: translations['Com/Net'], url: `${match.url}/com-net/satcom`},
      // {title: translations['Sys. Health'], url: `${match.url}/sys-health`},
    ];

    }

    return menuItems.map((item, i) => {
      let image = '/assets/img/menu/button-line-highlight.png';
      let matchForLink = false;

      if (item.url.indexOf('/', 8) !== -1) {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url.substr(0, item.url.indexOf('/', 8))) !== -1);
      } else {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);
      }

      return (
        <div className="submenu-button " key={i} onMouseEnter={this.handleHover.bind(this,i)} onMouseLeave={this.handleLeave.bind(this)}>
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
          {this.state.key==i && item.submenu ? <SubMenu link={item.url} names={subMenuNames}/> : null }
        </div>
      );
    });
  }

  render() {
    const {translations, match} = this.props;
    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => adminTabUser.includes(v) );
    let access2 = roles2.some(v => sysDocsUser.includes(v));
    
    return ( access ? (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/personnel`} component={PersonnelContainer} />
          <Route path={`${match.url}/platforms`} component={PlatformsContainer} />
          <Route path={`${match.url}/platformsspec`} component={PlatformsSpecificationContainer} />
          <Route path={`${match.url}/payloads`} component={PayloadsContainer} />
          <Route path={`${match.url}/payloadsspec`} component={PayloadsSpecificationContainer} />
          <Route path={`${match.url}/munitions`} component={MunitionsContainer} />
          <Route path={`${match.url}/munitionsspec`} component={MunitionsSpecificationContainer} />
          <Route path={`${match.url}/location`} component={LocationContainer} />
          <Route path={`${match.url}/admin-status`} component={AdminStatusContainer} />
          <Route path={`${match.url}/reports`} component={ReportsContainer} />
          <Route path={`${match.url}/ccir-pir`} component={CcirPirContainer} />
          {/* <Route path={`${match.url}/org-builder`} component={OrgBuilderContainer} /> */}
          <Route path={`${match.url}/com-net`} component={ComNetContainer} />
          <Route path={`${match.url}/sys-health`} component={SysHealthContainer} />
          <Route path={`${match.url}/sys-config`} component={ReferenceDocsContainer} />

           <Route path={`${match.url}/ccir`} component={CcirContainer} />
         <Route path={`${match.url}/opord`} component={OpordContainer} />
          <Route path={`${match.url}/pedteam`} component={PedTeamContainer} />
          <Route path={`${match.url}/aircrew`} component={AirCrewContainer} />
          <Route path={`${match.url}/equipment`} component={EquipmentContainer} />
          <Route path={`${match.url}/operations`} component={OperationsContainer} />
          <Route path={`${match.url}/pir`} component={PirContainer} /> 






        </Switch>
      </div>) : null
    );
  }
}

AdminComponent.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  translations: PropTypes.object
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    roles: state.auth.userRoles
  };
};

export default connect(mapStateToProps)(AdminComponent);
