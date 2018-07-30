import {connect} from 'react-redux';

import IntelSummaryComponent from '../../components/intel_request/IntelSummaryComponent';
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

export default connect(mapStateToProps, mapDispatchToProps)(IntelSummaryComponent);
