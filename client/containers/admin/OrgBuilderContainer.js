import {connect} from 'react-redux';

import OrgBuilderComponent from '../../components/admin/OrgBuilderComponent';
import { fetchOrganicOrg } from 'actions/organicorg';
import { fetchOrganicPersonnel, fetchPersonnelsByFilter } from 'actions/organicpersonnel';
import Accordion from '../../components/reusable/Accordion';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    allOrganicOrgs: state.organicorgs.allOrganicOrgs,
    allOrganicPersonnels: state.organicpersonnels.allOrganicPersonnels,
    listOrganicPersonnels: state.organicpersonnels.listOrganicPersonnels,
    isLoading: state.organicorgs.isFetching,
  };
};

const mapDispatchToProps = {
  fetchOrganicOrg,
  fetchOrganicPersonnel,
  fetchPersonnelsByFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgBuilderComponent);
