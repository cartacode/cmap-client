import {connect} from 'react-redux';

import MunitionsComponent from '../../components/admin/MunitionsComponent';
import { fetchMunitionInventory } from 'actions/munitionsinventory';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,    
    allMunitionInventory: state.munitionsinventory.allMunitionInventory,
    isFetching: state.munitionsinventory.isFetching,
  };
};

const mapDispatchToProps = {
  fetchMunitionInventory,
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsComponent);
