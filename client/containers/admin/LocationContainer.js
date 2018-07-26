import {connect} from 'react-redux';

import LocationComponent from '../../components/admin/LocationComponent';
import {getTranslations, addLocation, fetchLocationData} from '../../actions/actions';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    location_data: state.locationData.location_data,
    fetchingLocations: state.locations.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addLocation: (location) => {
    	dispatch(addLocation(location));
    },

    fetchLocationData: () => {
    	dispatch(fetchLocationData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);