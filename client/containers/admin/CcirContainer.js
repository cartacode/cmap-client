import { connect } from 'react-redux';

import CcirComponent from '../../components/admin/CcirComponent';
import { fetchCcir, deleteCcirById } from 'actions/ccir';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allCcir: state.ccirs.allCcir,
    isLoading: state.ccirs.isFetching,
    isDeleted: state.ccirs.isDeleted,
  };
};

const mapDispatchToProps = {
  fetchCcir,
  deleteCcirById,
};

export default connect(mapStateToProps, mapDispatchToProps)(CcirComponent);
