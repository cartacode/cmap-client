import {connect} from 'react-redux';

import LiveViewComponent from '../components/LiveViewComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(LiveViewComponent);
