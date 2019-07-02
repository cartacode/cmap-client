import { connect } from 'react-redux';

import EquipmentComponent from '../../components/admin/EquipmentComponent';
import { fetchEquipmentInventory, deleteEquipmentInventoryById } from 'actions/equipmentinventory';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allEquipmentInventory: state.equipmentinventory.allEquipmentInventory,
    isLoading: state.equipmentinventory.isFetching,
    isDeleted: state.equipmentinventory.isDeleted
  };
};

const mapDispatchToProps = {
  fetchEquipmentInventory,
  deleteEquipmentInventoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentComponent);
