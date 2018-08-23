import {connect} from 'react-redux';

import OrgBuilderComponent from '../../components/admin/OrgBuilderComponent';
import { fetchOrganicOrg } from 'actions/organicorg';
import { fetchOrganicPersonnel } from 'actions/organicpersonnel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    allOrganicOrgs: state.organicorgs.allOrganicOrgs,
    allOrganicPersonnels: state.organicpersonnels.allOrganicPersonnels,
    isLoading: state.organicorgs.isFetching,
  };
};

const mapDispatchToProps = {
  fetchOrganicOrg,
  fetchOrganicPersonnel,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgBuilderComponent);
