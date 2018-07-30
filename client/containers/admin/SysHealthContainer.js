import {connect} from 'react-redux';

import SysHealthComponent from '../../components/admin/SysHealthComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(SysHealthComponent);
