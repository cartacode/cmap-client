import { deleteCollectionPlanById, fetchCollectionPlans, fetchIntelRequests, moveToCollectionPlan, moveToIntelRequest } from 'actions/collection';
import { fetchIntelRequestById, updateIntelRequest } from 'actions/intel';
import { connect } from 'react-redux';
import CollectionManagerComponent from '../../components/intel_request/CollectionManagerComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allCollections: state.collections.allCollections,
    isLoading: state.collections.isFetching,
  };
};

const mapDispatchToProps = {
  fetchCollectionPlans,
  fetchIntelRequests,
  moveToCollectionPlan,
  moveToIntelRequest,
  deleteCollectionPlanById,
  fetchIntelRequestById,
  updateIntelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionManagerComponent);