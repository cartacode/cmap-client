import {connect} from 'react-redux';

import IntelRequestIntelRequestComponent from '../../components/intel_request/IntelRequestIntelRequestComponent';
import { addIntelEei, addIntelRequest } from 'actions/intel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

const mapDispatchToProps = {
  addIntelEei,
  addIntelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelRequestIntelRequestComponent);
