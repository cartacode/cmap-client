
import { connect } from 'react-redux';

import PersonnelComponent from '../../components/admin/PersonnelComponent';
import { fetchPersonnelById, fetchPersonnels } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPersonnels: state.personnels.allPersonnels,
    personnel: state.personnels.onePersonnel,
  };
};

const mapDispatchToProps = {
  fetchPersonnels,
  fetchPersonnelById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);
