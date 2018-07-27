import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import IntelRequestContainer from '../containers/intel_request/IntelRequestContainer';
import IntelSummaryContainer from '../containers/intel_request/IntelSummaryContainer';
import OperatingPictureContainer from '../containers/intel_request/OperatingPictureContainer';
import CurrentIntelContainer from '../containers/intel_request/CurrentIntelContainer';
import NatlImageryContainer from '../containers/intel_request/NatlImageryContainer';
import ResourcesContainer from '../containers/intel_request/ResourcesContainer';
import TaskingOrderContainer from '../containers/TaskingOrderContainer';

import {getTranslations} from '../actions/actions';


class IntelRequestComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations: {translations}, match} = this.props;

    const menuItems = [
      {title: 'Summary', url: `${match.url}/summary`},
      {title: translations['request'], url: `${match.url}/request`},
      {title: translations['review'], url: `${match.url}/review`},
      {title: translations['operating picture'], url: `${match.url}/operating-picture`},
      {title: translations['current intel'], url: `${match.url}/current-intel`},
      {title: translations["nat'l imagery"], url: `${match.url}/natl-imagery`},
    ];

    return menuItems.map((item, i) => {
      let image = '/assets/img/menu/button-line-highlight.png';
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
              )
              : null}
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
          <Route path={`${match.url}/summary`} component={IntelSummaryContainer} /> 
          <Route path={`${match.url}/request`} component={IntelRequestContainer} />
          <Route path={`${match.url}/review`} component={ResourcesContainer} />
          <Route path={`${match.url}/operating-picture`} component={OperatingPictureContainer} />
          <Route path={`${match.url}/current-intel`} component={CurrentIntelContainer} />
          <Route path={`${match.url}/natl-imagery`} component={NatlImageryContainer} />
        </Switch>
      </div>
    );
  }
}

IntelRequestComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IntelRequestComponent);

