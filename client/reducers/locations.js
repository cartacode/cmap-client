import { LOCATION__FETCH, LOCATION__FETCH_ONE, LOCATION_LIST__FETCH, LOCATION_KML__FETCH, LOCATION_TYPE__FETCH, LOCATION__ADD, LOCATION__KML_ADD, LOCATION__UPDATE, LOCATION__DELETE_ONE, MAP_LAYERS__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';
import { Error } from '../dictionary/constants';

export default function locations(state = initialState.locations, { payload, type, error }) {
  switch (type) {
    case LOCATION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOCATION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allLocations: payload.data,
      };
    case LOCATION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOCATION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneLocation: payload.data,
      };
    case LOCATION_LIST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case LOCATION_LIST__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        locationList: payload.data,
      };
    case LOCATION_KML__FETCH.REQUEST:
      return {
        ...state,
        isKMLFetching: true,
      };
    case LOCATION_KML__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        locationKMLs: payload.data,
      };
    case LOCATION_TYPE__FETCH.REQUEST:
      return {
        ...state,
        isTypesFetching: true,
      };
    case LOCATION_TYPE__FETCH.SUCCESS:
      return {
        ...state,
        isTypesFetching: false,
        locationTypes: payload.data,
      };
    case LOCATION__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case LOCATION__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case LOCATION__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    case LOCATION__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case LOCATION__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case LOCATION__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: Error.ERROR_CODE,
      };
    case LOCATION__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case LOCATION__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case LOCATION__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };
    case LOCATION__KML_ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case LOCATION__KML_ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
        oneLocation: payload.data,
      };
    case LOCATION__KML_ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };
    case MAP_LAYERS__FETCH.REQUEST:
      return {
        ...state,
        isFetchingMapLayers: false,
      };
    case MAP_LAYERS__FETCH.SUCCESS:
      return {
        ...state,
        allLayers:payload.data,
        isFetchingMapLayers: true,
      };
    case MAP_LAYERS__FETCH.FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
