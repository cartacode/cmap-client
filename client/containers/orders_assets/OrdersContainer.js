import {connect} from 'react-redux';

import OrdersComponent from '../../components/orders_assets/OrdersComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(OrdersComponent);
