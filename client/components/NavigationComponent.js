/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import HeaderContainer from '../containers/HeaderContainer';
import AdminComponent from '../components/AdminComponent';
import DashboardContainer from '../containers/DashboardContainer';
import IntelLibraryContainer from '../containers/IntelLibraryContainer';
import IntelRequestComponent from '../components/IntelRequestComponent';
import LiveViewContainer from '../containers/LiveViewContainer';
import LoginContainer from '../containers/LoginContainer';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import MessagesContainer from '../containers/MessagesContainer';
import MissionMGTComponent from '../components/MissionMGTComponent';
import OrdersAssetsComponent from '../components/OrdersAssetsComponent';
import SchedulesContainer from '../containers/SchedulesContainer';
import StatusContainer from '../containers/StatusContainer';
import SearchContainer from '../containers/SearchContainer';


class NavigationComponent extends React.Component {

  componentWillMount () {
    

  }

  componentDidUpdate () {
    console.log("LoggedUpdate");
    let expired = sessionStorage.getItem('expires');
    let exp = new Date(expired).toISOString();
    console.log(exp);
    console.log(new Date().toISOString());
    let current = new Date().toISOString();
    if (exp < current)           
    { sessionStorage.removeItem('jwtToken');
     console.log("Logged Out");
    }
  }

  render() {

    return (
      <div>
      <Route path="/" render={(route) =>{

            return route.location.pathname==='/login' ? null : <HeaderContainer/>;
        }} />
        <Switch>
          <PrivateRoute exact path="/" component={DashboardContainer} />
          <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
          <PrivateRoute exact path="/intel-library" component={IntelLibraryContainer} />
          <PrivateRoute path="/intel-request" component={IntelRequestComponent} />
          <PrivateRoute exact path="/liveview" component={LiveViewContainer} />
          <PrivateRoute exact path="/messages" component={MessagesContainer} />
          <PrivateRoute path="/mission-mgt" component={MissionMGTComponent} />
          <PrivateRoute path="/orders-assets" component={OrdersAssetsComponent} />
          <PrivateRoute exact path="/schedules" component={SchedulesContainer} />
          <PrivateRoute exact path="/status" component={StatusContainer} />
          <PrivateRoute path="/admin" component={AdminComponent} />
          <PrivateRoute path="/search" component={SearchContainer} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute path="/change-password" component={ChangePasswordContainer} />
        </Switch>
      </div>
    );
  }
}

NavigationComponent.propTypes = {
  children: PropTypes.element
};

export default NavigationComponent;
