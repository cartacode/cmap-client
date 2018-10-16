import { connect } from 'react-redux';

import RequestComponent from '../../components/intel_request/RequestComponent';
import { fetchIntelRequests, deleteIntelRequestById, updateIntelRequest } from 'actions/intel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allRequests: state.intelrequest.allRequests,
    isLoading: state.intelrequest.isFetching,
    isDeleted: state.intelrequest.isDeleted
  };
};

const mapDispatchToProps = {
  fetchIntelRequests,
  deleteIntelRequestById,
  updateIntelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestComponent);
