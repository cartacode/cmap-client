import {connect} from 'react-redux';

import MissionDetailComponent from '../../components/mission_mgt/MissionDetailComponent';
import {fetchMissionDetailById} from 'actions/mssionmgt';


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMissionDetail: state.mssionmgts.oneMissionDetail
  };
};

const mapDispatchToProps = {
  fetchMissionDetailById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionDetailComponent);
