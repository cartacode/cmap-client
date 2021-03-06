import { connect } from 'react-redux';

import PedTaskingComponent from '../../components/mission_mgt/PedTaskingComponent';
import { fetchPedTasks, fetchPedTasksATO, 
  moveToPedTaskFromATOGeneration, moveToATOGenerationFromPedTask, moveToFlightOPSFromATO, moveToATOFromFlightOPS, assignTeams } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    pedTasksAtoGenerations: state.mssionmgts.pedTasksAtoGenerations,
    pedTasks: state.mssionmgts.pedTasks,
    isLoading: state.mssionmgts.isFetching,
    isBooked: state.mssionmgts.isBooked,
    error: state.mssionmgts.error,
  };
};

const mapDispatchToProps = {
  fetchPedTasks,
  fetchPedTasksATO,
  moveToPedTaskFromATOGeneration,
  moveToATOGenerationFromPedTask,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,
  assignTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedTaskingComponent);