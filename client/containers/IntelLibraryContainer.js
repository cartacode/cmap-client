import { connect } from 'react-redux';
import { fetchIntelLibraryRequests  } from 'actions/intellibrary';
import IntelLibraryComponent from '../components/IntelLibraryComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allIntelLibraries: state.intellibraries.allIntelLibraries,
    isLoading: state.intellibraries.isFetching,
  };
};
const mapDispatchToProps = {
  fetchIntelLibraryRequests,
};
export default connect(mapStateToProps, mapDispatchToProps)(IntelLibraryComponent);