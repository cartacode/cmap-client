import { combineReducers } from 'redux';

const munitions = (
  state = {
    isFetching: false,
    isReady: false,
    all_munitions: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_MUNITION:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_MUNITION:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        all_munitions: action.munitions
      };
    default:
      return state;
  }
};

const locations = (
  state = {
    isFetching: false,
    isReady: false,
    location_list: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        location_list: action.location_list
      };
    default:
      return state;
  }
};

const locationTypes = (
  state = {
    isFetching: false,
    isReady: false,
    location_types: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOCATION_TYPES:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_LOCATION_TYPES:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        location_types: action.location_types
      };
    default:
      return state;
  }
};

const locationData = (
  state = {
    isFetching: false,
    isReady: false,
    location_data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOCATION_DATA:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_LOCATION_DATA:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        location_data: action.location_data
      };
    default:
      return state;
  }
};

const cocoms = (
  state = {
    isFetching: false,
    isReady: false,
    cocom_list: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_COCOM:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_COCOM:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        cocom_list: action.cocom_list
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
	personnels,
	platforms,
	payloads,
  payloadTypes,
  payloadData,
	munitions,
	locations,
  locationTypes,
  locationData,
  cocoms,
  translationsReducer,
  routing: routerReducer
});

export default rootReducer;
