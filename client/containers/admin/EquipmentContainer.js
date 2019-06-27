import {connect} from 'react-redux';

import EquipmentComponent from '../../components/admin/EquipmentComponent';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
   
  };
};

const mapDispatchToProps = {
 
};



export default connect(mapStateToProps, mapDispatchToProps)(EquipmentComponent);
