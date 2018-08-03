import {connect} from 'react-redux';

import MunitionsComponent from '../../components/admin/MunitionsComponent';
import { addMunition, fetchMunitions } from 'actions/munitionsinventory';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allMunitions: state.munitions.allMunitions,
    fetchingMunitions: state.munitions.isFetching,
  };
};

const mapDispatchToProps = {
  addMunition,
  fetchMunitions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsComponent);
