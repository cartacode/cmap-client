import { deletePlatformInventoryById, fetchPlatformInventory } from 'actions/platforminventory';
import { connect } from 'react-redux';
import MissionSummaryComponent from '../../components/mission_mgt/MissionSummaryComponent';


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPlatformInventory: state.platforminventory.allPlatformInventory,
    isLoading: state.platforminventory.isFetching,
    isDeleted: state.platforminventory.isDeleted
  };
};

const mapDispatchToProps = {
  fetchPlatformInventory,
  deletePlatformInventoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MissionSummaryComponent);
