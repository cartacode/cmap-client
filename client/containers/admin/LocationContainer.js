import {connect} from 'react-redux';

import LocationComponent from '../../components/admin/LocationComponent';
import { addLocation, fetchLocations } from 'actions/location';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    allLocations: state.locations.allLocations,
    fetchingLocations: state.locations.isFetching,
  };
};

const mapDispatchToProps = {
  addLocation,
  fetchLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);
