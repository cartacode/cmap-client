import { LOCATION__FETCH, LOCATION_LIST__FETCH, LOCATION_TYPE__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function locations(state = initialState.locations, { payload, type }) {
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
    default:
      return state;
  }
}