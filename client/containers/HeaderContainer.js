import {connect} from 'react-redux';

import HeaderComponent from '../components/HeaderComponent';
import { updateLocalization } from 'actions/localization';

const mapStateToProps = state => {
  return {
    routing: state.routing,
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = {
  updateLocalization,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
