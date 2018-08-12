import {connect} from 'react-redux';

import AdminStatusComponent from '../../components/admin/AdminStatusComponent';
import { fetchPlatformsStatus, fetchPayloadsStatus, fetchPersonnelsStatus } from 'actions/status';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    statusplatform:state.status.platforms,
    statuspayload:state.status.payloads,
    statuspersonnel:state.status.personnels,
    isLoading: state.status.isFetching,    
  };
};

const mapDispatchToProps = {
  fetchPlatformsStatus,
  fetchPayloadsStatus,
  fetchPersonnelsStatus
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminStatusComponent);
