import {combineReducers} from 'redux';
import translationsReducer from './translationsReducer';


import {routerReducer} from 'react-router-redux';


import {

        GET_TRANSLATIONS_FULFILLED,

        REQUEST_ADD_PERSONNEL,
        RECEIVE_ADD_PERSONNEL,

        REQUEST_PERSONNELS,
        RECEIVE_PERSONNELS,

        REQUEST_ADD_PLATFORM,
        RECEIVE_ADD_PLATFORM,

        REQUEST_PLATFORMS,
        RECEIVE_PLATFORMS,

        REQUEST_ADD_PAYLOAD,
        RECEIVE_ADD_PAYLOAD,

        REQUEST_PAYLOAD,
        RECEIVE_PAYLOAD,

        REQUEST_PAYLOAD_TYPES,
        RECEIVE_PAYLOAD_TYPES,

        REQUEST_PAYLOAD_DATA,
        RECEIVE_PAYLOAD_DATA,

        REQUEST_ADD_MUNITION,
        RECEIVE_ADD_MUNITION,

        REQUEST_MUNITION,
        RECEIVE_MUNITION,

        REQUEST_ADD_LOCATION,
        RECEIVE_ADD_LOCATION,

        REQUEST_LOCATIONS,
        RECEIVE_LOCATIONS,

        REQUEST_LOCATION_DATA,
        RECEIVE_LOCATION_DATA,

        REQUEST_LOCATION_TYPES,
        RECEIVE_LOCATION_TYPES,

        REQUEST_COCOM,
        RECEIVE_COCOM,


} from '../constants/actionTypes';

const personnels = (
  state = {
    isFetching: false,
    isReady: false,
    all_personnels: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PERSONNELS:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_PERSONNELS:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        all_personnels: action.personnels
      };
    default:
      return state;
  }
};

const platforms = (
  state = {
    isFetching: false,
    isReady: false,
    all_platforms: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PLATFORMS:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_PLATFORMS:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        all_platforms: action.platforms
      };
    default:
      return state;
  }
};

const payloads = (
  state = {
    isFetching: false,
    isReady: false,
    payload_list: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PAYLOAD:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_PAYLOAD:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        payload_list: action.payloads
      };
    default:
      return state;
  }
};

const payloadTypes = (
  state = {
    isFetching: false,
    isReady: false,
    payload_types: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PAYLOAD_TYPES:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_PAYLOAD_TYPES:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        payload_types: action.payload_types
      };
    default:
      return state;
  }
};

const payloadData = (
  state = {
    isFetching: false,
    isReady: false,
    payload_data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PAYLOAD_DATA:
      return {
        ...state,
        isFetching: true,
        isReady: false
      };
    case RECEIVE_PAYLOAD_DATA:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        payload_data: action.payload_data
      };
    default:
      return state;
  }
};

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
