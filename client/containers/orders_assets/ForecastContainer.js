import {connect} from 'react-redux';

import ForecastComponent from '../../components/orders_assets/ForecastComponent';
import {getTranslations} from '../../actions/actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(ForecastComponent);