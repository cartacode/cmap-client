import {connect} from 'react-redux';

import ReportsComponent from '../../components/admin/ReportsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(ReportsComponent);
