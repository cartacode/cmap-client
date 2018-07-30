import {connect} from 'react-redux';

import AdminStatusComponent from '../../components/admin/AdminStatusComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(AdminStatusComponent);
