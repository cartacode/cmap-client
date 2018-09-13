import {connect} from 'react-redux';

import OrgBuilderComponent from '../../components/admin/OrgBuilderComponent';
import { fetchOrganicOrg, fetchDeployedOrg, fetchUnitById } from 'actions/organicorg';
import { fetchOrganicPersonnel, fetchPersonnelsByFilter } from 'actions/organicpersonnel';
import Accordion from '../../components/reusable/Accordion';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    allOrganicOrgs: state.organicorgs.allOrganicOrgs,
    allDeployedOrgs: state.organicorgs.allDeployedOrgs,
    allOrganicPersonnels: state.organicpersonnels.allOrganicPersonnels,
    listOrganicPersonnels: state.organicpersonnels.listOrganicPersonnels,
    oneUnit: state.organicorgs.oneUnit,
    isLoading: state.organicorgs.isFetching,
  };
};

const mapDispatchToProps = {
  fetchOrganicOrg,
  fetchOrganicPersonnel,
  fetchPersonnelsByFilter,
  fetchDeployedOrg,
  fetchUnitById,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgBuilderComponent);
