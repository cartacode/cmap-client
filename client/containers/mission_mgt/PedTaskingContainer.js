import {connect} from 'react-redux';

import PedTaskingComponent from '../../components/mission_mgt/PedTaskingComponent';
import { fetchPedTasks, fetchCollectionPlans  } from 'actions/mssionmgt';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
  };
};

const mapDispatchToProps = {
  fetchPedTasks,
  fetchCollectionPlans,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedTaskingComponent);
