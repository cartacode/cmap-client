import {connect} from 'react-redux';

import PlatformsComponent from '../../components/admin/PlatformsComponent';
import { addPlatform, fetchPlatforms } from 'actions/platform';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    all_platforms: state.platforms.all_platforms

  };
};

const mapDispatchToProps = {
  addPlatform,
  fetchPlatforms,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsComponent);
