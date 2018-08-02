import { INTEL_EEI__FETCH, INTEL_REQUEST__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function locations(state = initialState.locations, { payload, type }) {
  switch (type) {
    case INTEL_EEI__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_EEI__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allLocations: payload.data,
      };
    case INTEL_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case INTEL_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        locationList: payload.data,
      };
    default:
      return state;
  }
}
