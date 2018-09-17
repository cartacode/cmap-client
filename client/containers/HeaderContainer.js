import {connect} from 'react-redux';
import  { Redirect } from 'react-router-dom'

import HeaderComponent from '../components/HeaderComponent';
import { updateLocalization } from 'actions/localization';

const mapStateToProps = state => {
  return {
    router: state.router,
    translations: state.localization.staticText
  };
};

const mapDispatchToProps = {
  updateLocalization,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
