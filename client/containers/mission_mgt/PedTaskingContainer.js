import {connect} from 'react-redux';

import PedTaskingComponent from '../../components/mission_mgt/PedTaskingComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(PedTaskingComponent);
