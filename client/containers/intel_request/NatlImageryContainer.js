import {connect} from 'react-redux';

import NatlImageryComponent from '../../components/intel_request/NatlImageryComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(NatlImageryComponent);
