
import {connect} from 'react-redux';

import PersonnelComponent from '../../components/admin/PersonnelComponent';
import { fetchPersonnels } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    all_personnels: state.personnels.all_personnels,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPersonnels: () => {
      dispatch(fetchPersonnels());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);
