import {connect} from 'react-redux';

import PlatformsComponent from '../../components/admin/PlatformsComponent';
import { addPlatform, fetchPlatforms } from 'actions/platform';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    allPlatforms: state.platforms.allPlatforms,
  };
};

const mapDispatchToProps = {
  addPlatform,
  fetchPlatforms,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsComponent);
