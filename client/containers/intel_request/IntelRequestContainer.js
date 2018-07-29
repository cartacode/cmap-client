import {connect} from 'react-redux';

import IntelRequestIntelRequestComponent from '../../components/intel_request/IntelRequestIntelRequestComponent';
import {getTranslations} from '../../actions/actions';
import { addIntelEei, addIntelRequest } from 'actions/intel';

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
    addIntelEei: (intelEEI) => {
    	dispatch(addIntelEei(intelEEI));
    },
    addIntelRequest: (intelReq) => {
    	dispatch(addIntelRequest(intelReq));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelRequestIntelRequestComponent);
