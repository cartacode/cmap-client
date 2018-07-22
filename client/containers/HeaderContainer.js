import {connect} from 'react-redux';

import HeaderComponent from '../components/HeaderComponent';
import {getTranslations} from '../actions/actions';

const mapStateToProps = state => {
  return {
    routing: state.routing,
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);