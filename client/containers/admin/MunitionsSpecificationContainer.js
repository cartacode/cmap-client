import {connect} from 'react-redux';

import MunitionsSpecificationComponent from '../../components/admin/MunitionsSpecificationComponent';
import { addMunition, fetchMunitions } from 'actions/munition';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allMunitions: state.munitions.allMunitions,
    fetchingMunitions: state.munitions.isFetching,
    munition: state.munitions.oneMunition

  };
};

const mapDispatchToProps = {
  addMunition,
  fetchMunitions
};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionsSpecificationComponent);
