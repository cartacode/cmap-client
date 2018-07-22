/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import AdminComponent from '../components/AdminComponent';
import DashboardContainer from '../containers/DashboardContainer';
import IntelLibraryContainer from '../containers/IntelLibraryContainer';
import IntelRequestComponent from '../components/IntelRequestComponent';
import LiveViewContainer from '../containers/LiveViewContainer';
import LoginContainer from '../containers/LoginContainer';
import MessagesContainer from '../containers/MessagesContainer';
import MissionMGTComponent from '../components/MissionMGTComponent';
import OrdersAssetsComponent from '../components/OrdersAssetsComponent';
import SchedulesContainer from '../containers/SchedulesContainer';
import StatusContainer from '../containers/StatusContainer';
import SearchContainer from '../containers/SearchContainer';


class NavigationComponent extends React.Component {

  render() {
    return (
      <div>
      <Route path="/" render={(route) =>{

            return route.location.pathname==='/main' ? null : <HeaderContainer/>;
        }} />
        <Switch>
          <Route exact path="/" component={DashboardContainer} />
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/intel-library" component={IntelLibraryContainer} />
          <Route path="/intel-request" component={IntelRequestComponent} />
          <Route exact path="/liveview" component={LiveViewContainer} />
          <Route exact path="/messages" component={MessagesContainer} />
          <Route path="/mission-mgt" component={MissionMGTComponent} />
          <Route path="/orders-assets" component={OrdersAssetsComponent} />
          <Route exact path="/schedules" component={SchedulesContainer} />
          <Route exact path="/status" component={StatusContainer} />
          <Route path="/admin" component={AdminComponent} />
          <Route path="/search" component={SearchContainer} />
        </Switch>
      </div>
    );
  }
}

NavigationComponent.propTypes = {
  children: PropTypes.element
};

export default NavigationComponent;
