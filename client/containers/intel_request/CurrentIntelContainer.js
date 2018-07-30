import {connect} from 'react-redux';

import CurrentIntelComponent from '../../components/intel_request/CurrentIntelComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(CurrentIntelComponent);
