import { INTEL_EEI__FETCH, INTEL_REQUEST__FETCH, INTEL_REQUEST__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function intel(state = initialState.intelrequest, { payload, type }) {
  switch (type) {
    case INTEL_EEI__FETCH.REQUEST:
      return {
        ...state,
        isFetchingEEI: true,
      };
    case INTEL_EEI__FETCH.SUCCESS:
      return {
        ...state,
        isFetchingEEI: false,
        eeis: payload.data,
      };
    case INTEL_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allRequests: payload.data,
      };
    case INTEL_REQUEST__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case INTEL_REQUEST__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneIntelRequest: payload.data,
      };
    default:
      return state;
  }
}
