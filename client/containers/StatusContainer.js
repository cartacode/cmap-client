import {connect} from 'react-redux';

import StatusComponent from '../components/StatusComponent';
import { fetchPlatformsStatus, fetchPayloadsStatus, fetchPersonnelsStatus, fetchMunitionsStatus, fetchUnitLogo, fetchUnitStatus } from 'actions/status';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    statusplatform:state.status.platforms,
    statuspayload:state.status.payloads,
    statuspersonnel:state.status.personnels,
    statusmunition:state.status.munitions,
    comment:state.status.comment,
    logo:state.status.logo,
    isLoading: state.status.isFetching, 
  };
};

const mapDispatchToProps = {
  fetchPlatformsStatus,
  fetchPayloadsStatus,
  fetchPersonnelsStatus,
  fetchMunitionsStatus,
  fetchUnitLogo,
  fetchUnitStatus
};

export default connect(mapStateToProps,mapDispatchToProps)(StatusComponent);
