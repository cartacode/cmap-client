import {connect} from 'react-redux';

import MissionDetailComponent from '../../components/mission_mgt/MissionDetailComponent';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

export default connect(mapStateToProps)(MissionDetailComponent);
