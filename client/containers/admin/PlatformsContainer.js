import {connect} from 'react-redux';

import PlatformsComponent from '../../components/admin/PlatformsComponent';
import {getTranslations } from '../../actions/actions';
import { addPlatform, fetchPlatforms } from 'actions/platform';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    all_platforms: state.platforms.all_platforms

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addPlatform: (platform) => {
    	dispatch(addPlatform(platform));
    },

    fetchPlatforms: () => {
      dispatch(fetchPlatforms());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsComponent);
