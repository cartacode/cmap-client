import {connect} from 'react-redux';

import RequestForm from '../../components/intel_request/RequestForm';
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
