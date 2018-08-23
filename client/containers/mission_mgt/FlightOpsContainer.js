import {connect} from 'react-redux';

import FlightOpsComponent from '../../components/mission_mgt/FlightOpsComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(FlightOpsComponent);
