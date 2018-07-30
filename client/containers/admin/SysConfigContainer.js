import {connect} from 'react-redux';

import SysConfigComponent from '../../components/admin/SysConfigComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(SysConfigComponent);
