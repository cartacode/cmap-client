import {connect} from 'react-redux';

import AtoComponent from '../../components/mission_mgt/AtoComponent';
import { fetchATOGeneration, fetchFlightOps  } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

const mapDispatchToProps = {
  fetchATOGeneration,
  fetchFlightOps,

};
export default connect(mapStateToProps, mapDispatchToProps)(AtoComponent);
