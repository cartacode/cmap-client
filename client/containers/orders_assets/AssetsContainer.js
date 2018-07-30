import {connect} from 'react-redux';

import AssetsComponent from '../../components/orders_assets/AssetsComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(AssetsComponent);
