import {connect} from 'react-redux';

import CcirComponent from '../../components/admin/CcirComponent';
import {fetchCcirPirs, deleteCcirPirById} from 'actions/ccirpir';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allCcirPirs: state.ccirpir.allCcirPirs,
    isDeleted: state.ccirpir.isDeleted
  };
};


const mapDispatchToProps = {
  fetchCcirPirs, 
  deleteCcirPirById
};


export default connect(mapStateToProps, mapDispatchToProps)(CcirComponent);
