import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
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
import NavigationComponent from './NavigationComponent';

import { history } from 'store/configureStore';

class App extends React.Component {

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/logout" component={LoginContainer} />
          <Route exact path="/" component={NavigationComponent} />
          <Route exact path="/dashboard" component={NavigationComponent} />
          <Route exact path="/intel-library" component={NavigationComponent} />
          <Route path="/intel-request" component={NavigationComponent} />
          <Route exact path="/liveview" component={NavigationComponent} />
          <Route exact path="/messages" component={NavigationComponent} />
          <Route path="/mission-mgt" component={NavigationComponent} />
          <Route path="/orders-assets" component={NavigationComponent} />
          <Route exact path="/schedules" component={NavigationComponent} />
          <Route exact path="/status" component={NavigationComponent} />
          <Route path="/admin" component={NavigationComponent} />
          <Route path="/search" component={NavigationComponent} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
