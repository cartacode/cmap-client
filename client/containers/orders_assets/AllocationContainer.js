import {connect} from 'react-redux';

import AllocationComponent from '../../components/orders_assets/AllocationComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(AllocationComponent);
