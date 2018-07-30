import {connect} from 'react-redux';

import AtoComponent from '../../components/mission_mgt/AtoComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(AtoComponent);
