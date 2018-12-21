import { fetchCollectionPlans, fetchApprovedIntelRequests, moveToCollectionPlan, moveToIntelRequest,
  updateIntelStatus, routeCollectionIntelRequest, changeIntelPriority  } from 'actions/collection';
// import { fetchIntelRequestById, updateIntelRequest } from 'actions/intel';
import { fetchIntelRequests } from 'actions/intel';
import { connect } from 'react-redux';
import CollectionManagerComponent from '../../components/intel_request/CollectionManagerComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allApprovedIntelRequests: state.collections.allApprovedIntelRequests,
    allCollectionsPlan: state.collections.allCollectionsPlan,
    allRequests: state.intelrequest.allRequests,
    isLoading: state.collections.isFetching,
    isDeleted: state.collections.isDeleted,
  };
};

const mapDispatchToProps = {
  fetchCollectionPlans,
  fetchApprovedIntelRequests,
  updateIntelStatus,
  moveToCollectionPlan,
  moveToIntelRequest,
  fetchIntelRequests,
  // fetchIntelRequestById,
  // updateIntelRequest,
  routeCollectionIntelRequest,
  changeIntelPriority,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionManagerComponent);