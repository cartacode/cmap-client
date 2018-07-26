import {connect} from 'react-redux';

import IntelRequestIntelRequestComponent from '../../components/intel_request/IntelRequestIntelRequestComponent';
import {getTranslations, addIntelEEI, addIntelReq} from '../../actions/actions';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },
    addIntelEEI: (intelEEI) => {
    	dispatch(addIntelEEI(intelEEI));
    },
    addIntelReq: (intelReq) => {
    	dispatch(addIntelReq(intelReq));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelRequestIntelRequestComponent);