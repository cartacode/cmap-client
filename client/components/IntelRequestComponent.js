import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import IntelRequestContainer from '../containers/intel_request/IntelRequestContainer';
import IntelSummaryContainer from '../containers/intel_request/IntelSummaryContainer';

import NatlImageryContainer from '../containers/intel_request/NatlImageryContainer';
import ResourcesContainer from '../containers/intel_request/ResourcesContainer';
import TaskingOrderContainer from '../containers/TaskingOrderContainer';


class IntelRequestComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations, match} = this.props;

    const menuItems = [
      {title: 'Request', url: `${match.url}/summary`},
     /*  {title: translations['request'], url: `${match.url}/request`}, */
      {title: translations['review'], url: `${match.url}/review`},
      {title: translations["nat'l imagery"], url: `${match.url}/natl-imagery`},
    ];

    return menuItems.map((item, i) => {
        let matchForLink = false;
        let image = '/assets/img/menu/button-line-highlight.png';
        matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);

        //When clicking on New Request. the REQUEST tab should remain highlighted
        if(this.props.router.location.pathname === '/intel-request/request/request' && item.title === 'Request' ){
          matchForLink = true;
        }

      return (
        <div className="submenu-button" key={i}>
          <NavLink to={item.url} className="submenu" activeClassName="active-submenu-item">
            {item.title}
            {matchForLink ?
              (
                <div className="under-button-line">
                  <img src={image} className="under-button-image pull-right" alt=""/>
                </div>
              )
              : null}
          </NavLink>
        </div>
      );
    });
  }

  render() {
    const {translations, match} = this.props;

    return (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/summary`} component={IntelSummaryContainer} />
          <Route path={`${match.url}/request`} component={IntelRequestContainer} />
          <Route path={`${match.url}/review`} component={ResourcesContainer} />
          <Route path={`${match.url}/natl-imagery`} component={NatlImageryContainer} />
        </Switch>
      </div>
    );
  }
}

IntelRequestComponent.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  translations: PropTypes.object
};
const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(IntelRequestComponent);

