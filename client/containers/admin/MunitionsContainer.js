import {connect} from 'react-redux';

import MunitionsComponent from '../../components/admin/MunitionsComponent';
import {getTranslations, addMunition, fetchMunitions } from '../../actions/actions';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    all_munitions: state.munitions.all_munitions,
    fetchingMunitions: state.munitions.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addMunition: (munition) => {
    	dispatch(addMunition(munition));
    },

    fetchMunitions: () => {
    	dispatch(fetchMunitions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsComponent);