import {connect} from 'react-redux';

import ForecastComponent from '../../components/orders_assets/ForecastComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(ForecastComponent);
