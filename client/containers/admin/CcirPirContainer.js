import {connect} from 'react-redux';

import CcirPirComponent from '../../components/admin/CcirPirComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(CcirPirComponent);
