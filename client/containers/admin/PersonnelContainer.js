
import { connect } from 'react-redux';

import PersonnelComponent from '../../components/admin/PersonnelComponent';
import { fetchPersonnels } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPersonnels: state.personnels.allPersonnels,
  };
};

const mapDispatchToProps = {
  fetchPersonnels,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);
