import {connect} from 'react-redux';

import PedTaskingComponent from '../../components/mission_mgt/PedTaskingComponent';
import { fetchPedTasks, fetchCollectionPlans, fetchATOGenerations, flightOpsATOGenerations , fetchPedTasksATOGenerations } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    pedTasksAtoGenerations: state.mssionmgts.pedTasksAtoGenerations,
    pedTasks: state.mssionmgts.pedTasks
  };
};

const mapDispatchToProps = {
  fetchPedTasks,
  fetchPedTasksATOGenerations,
  fetchCollectionPlans,
  fetchATOGenerations,
  flightOpsATOGenerations
};

export default connect(mapStateToProps, mapDispatchToProps)(PedTaskingComponent);
