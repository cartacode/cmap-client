import { connect } from 'react-redux';

import PlatformsComponent from '../../components/admin/PlatformsComponent';
import { addPlatform, fetchPlatforms, fetchPlatformById } from 'actions/platforminventory';

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
  fetchPlatformById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsComponent);
