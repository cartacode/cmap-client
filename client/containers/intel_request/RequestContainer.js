import { connect } from 'react-redux';

import RequestComponent from '../../components/intel_request/RequestComponent';
import { fetchIntelRequests } from 'actions/intel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allRequests: state.intelrequest.allRequests,
  };
};

const mapDispatchToProps = {
  fetchIntelRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestComponent);
