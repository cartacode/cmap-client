import { connect } from 'react-redux';

import AtoComponent from '../../components/mission_mgt/AtoComponent';
import { fetchATOGenerations, fetchATOCollectionPlans, routeATOGeneration, moveToATOGenerationFromCollectionPlan } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    atoCollectionPlans: state.mssionmgts.atoCollectionPlans,
    atoGenerations: state.mssionmgts.atoGenerations,
    isLoading: state.mssionmgts.isFetching,
    router: state.router,
  };
};

const mapDispatchToProps = {
  fetchATOCollectionPlans,
  fetchATOGenerations,
  routeATOGeneration,
  moveToATOGenerationFromCollectionPlan,

};
export default connect(mapStateToProps, mapDispatchToProps)(AtoComponent);
