import { connect } from 'react-redux';
import { fetchCollectionManager } from 'actions/collection';
import CollectionManagerComponent from '../../components/intel_request/CollectionManagerComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allCollections: state.collections.allCollections,
    isLoading: state.collections.isFetching,
  };
};

const mapDispatchToProps = {
  fetchCollectionManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionManagerComponent);
