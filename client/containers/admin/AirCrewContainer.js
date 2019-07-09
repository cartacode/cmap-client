import { connect } from 'react-redux';

import AirCrewComponent from '../../components/admin/AirCrewComponent';
import { fetchFlightPersonnels } from 'actions/personnel';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPersonnels: state.personnels.allPersonnels,
    isLoading: state.personnels.isFetching,
  };
};

const mapDispatchToProps = {
  fetchFlightPersonnels,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirCrewComponent);
