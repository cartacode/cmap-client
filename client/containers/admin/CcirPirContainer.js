import {connect} from 'react-redux';

import CcirPirComponent from '../../components/admin/CcirPirComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(CcirPirComponent);
