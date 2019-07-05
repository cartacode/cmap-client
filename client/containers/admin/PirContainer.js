import { connect } from 'react-redux';

import PirComponent from '../../components/admin/PirComponent';
import { fetchPir, deletePirById } from 'actions/pir';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPir: state.pirs.allPir,
    isLoading: state.pirs.isFetching,
    isDeleted: state.pirs.isDeleted,
  };
};

const mapDispatchToProps = {
  fetchPir,
  deletePirById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PirComponent);
