import { connect } from 'react-redux';

import PlatformsComponent from '../../components/admin/PlatformsComponent';
import { fetchPlatformInventory, deletePlatformInventoryById } from 'actions/platforminventory';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPlatformInventory: state.platforminventory.allPlatformInventory,
  };
};

const mapDispatchToProps = {
  fetchPlatformInventory,
  deletePlatformInventoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsComponent);
