import {connect} from 'react-redux';

import FlightOpsComponent from '../../components/mission_mgt/FlightOpsComponent';
import { fetchFlightOps, flightOpsATOGenerations, moveToFlightOPSFromATOGeneration, moveToATOGenerationFromFlightOPS } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    flightOps: state.mssionmgts.flightOps,
    opsAtoGenerations: state.mssionmgts.flightOpsAtoGenerations,
    atoGenerations: state.mssionmgts.atoGenerations,
    router: state.router,
  };
};

const mapDispatchToProps = {
  fetchFlightOps,
  flightOpsATOGenerations,
  moveToFlightOPSFromATOGeneration,
  moveToATOGenerationFromFlightOPS, 

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsComponent);