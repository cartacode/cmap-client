import {connect} from 'react-redux';

import FlightOpsComponent from '../../components/mission_mgt/FlightOpsComponent';
import { fetchFlightOps, fetchPedTasks  } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

const mapDispatchToProps = {
  fetchFlightOps,
  fetchPedTasks,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsComponent);
