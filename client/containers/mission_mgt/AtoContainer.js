import {connect} from 'react-redux';

import AtoComponent from '../../components/mission_mgt/AtoComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(AtoComponent);
