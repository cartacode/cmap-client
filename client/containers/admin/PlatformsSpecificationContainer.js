import {connect} from 'react-redux';

import PlatformsSpecificationComponent from '../../components/admin/PlatformsSpecificationComponent';
import { addPlatform, fetchPlatforms, fetchPlatformById } from 'actions/platform';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPlatforms: state.platforms.allPlatforms,
    platform: state.platforms.onePlatform,
  };
};

const mapDispatchToProps = {
  addPlatform,
  fetchPlatforms,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsSpecificationComponent);
