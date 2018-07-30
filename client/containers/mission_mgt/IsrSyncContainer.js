import {connect} from 'react-redux';

import IsrSyncComponent from '../../components/mission_mgt/IsrSyncComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(IsrSyncComponent);
