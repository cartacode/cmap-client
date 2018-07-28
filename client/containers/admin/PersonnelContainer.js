
import {connect} from 'react-redux';

import PersonnelComponent from '../../components/admin/PersonnelComponent';
import {getTranslations} from '../../actions/actions';
import { fetchPersonnels } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    all_personnels: state.personnels.all_personnels,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    fetchPersonnels: () => {
      dispatch(fetchPersonnels());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);
