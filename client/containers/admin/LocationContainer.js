import {connect} from 'react-redux';

import LocationComponent from '../../components/admin/LocationComponent';
import { addLocation, fetchLocations } from 'actions/location';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    location_data: state.locationData.location_data,
    fetchingLocations: state.locations.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: (location) => {
    	dispatch(addLocation(location));
    },

    fetchLocations: () => {
    	dispatch(fetchLocations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);
